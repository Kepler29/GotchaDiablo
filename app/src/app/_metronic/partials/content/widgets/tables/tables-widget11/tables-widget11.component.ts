import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
import {PackagesService} from "../../../../../../services/admin/packages.service";
import {Package} from "../../../../../../interfaces/package";

@Component({
  selector: 'app-tables-widget11',
  templateUrl: './tables-widget11.component.html',
})
export class TablesWidget11Component implements OnInit {

  packages:Package[]=[];

  constructor(private service: PackagesService,) {
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.service.getPackages().subscribe(response => {
      this.packages = response.packages;
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

}
