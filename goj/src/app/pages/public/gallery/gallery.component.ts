import { Component, OnInit } from '@angular/core';
import { GalleryService } from 'src/app/services/public/gallery.service';
import { Image } from "../../../interfaces/image";
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.sass']
})
export class GalleryComponent implements OnInit {

  images:Image[]=[];


  constructor(private serviceGallery: GalleryService) { }

  ngOnInit() {
    this.getPackages();
  }

  getPackages(){
    this.serviceGallery.getGallery().subscribe(response => {
      this.images = response.images;
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
