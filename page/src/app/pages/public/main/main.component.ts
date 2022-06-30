import { Component, OnInit } from '@angular/core';
import { Package } from "../../../interfaces/package";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Image } from "../../../interfaces/image";
import { PackagesService } from "../../../services/public/packages.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {

  images:Image[]=[];
  packages:Package[]=[];


  constructor(private serivcePackages: PackagesService) { }

  ngOnInit() {
    this.getPackages();
  }

  getPackages(){
    this.serivcePackages.getPackages().subscribe(response => {
      console.log(response);
      this.packages = response.packages;
    }, error => {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: error.error.msg,
        timer: 2000
      });
    });
  }

}
