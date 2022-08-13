import { Component, OnInit } from '@angular/core';
import { Package } from 'src/app/interfaces/package';
import { PackagesService } from 'src/app/services/public/packages.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.sass']
})
export class PackagesComponent implements OnInit {

  packages:Package[]=[];


  constructor(private servicePackages: PackagesService) { }

  ngOnInit() {
    this.getPackages();
  }

  getPackages(){
    this.servicePackages.getPackages().subscribe(response => {
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
