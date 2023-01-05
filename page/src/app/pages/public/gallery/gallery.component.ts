import { Component, OnInit } from '@angular/core';
import { GalleryService } from 'src/app/services/public/gallery.service';
import { Image } from "../../../interfaces/image";
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.sass'],
  providers: [MessageService]
})
export class GalleryComponent implements OnInit {

  images:Image[]=[];


  constructor(private serviceGallery: GalleryService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.getPackages();
  }

  getPackages(){
    this.serviceGallery.getGallery().subscribe(response => {
      this.images = response.images;
    }, error => {
      console.log(error);
      this.showError();
    });
  }

  showError() {
    this.messageService.add({severity:'error', summary: 'Error', detail: 'No se pudo descargar el contenido'});
  }
}
