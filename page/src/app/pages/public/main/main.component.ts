import { Component, OnInit } from '@angular/core';
import { Package } from "../../../interfaces/package";
import { Image } from "../../../interfaces/image";
import { PackagesService } from "../../../services/public/packages.service";
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass'],
  providers: [MessageService]
})
export class MainComponent implements OnInit {

  images:Image[]=[];
  packages:Package[]=[];


  constructor(private serivcePackages: PackagesService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.getPackages();
  }

  getPackages(){
    this.serivcePackages.getPackages().subscribe(response => {
      this.packages = response.packages;
    }, error => {
      console.log(error);
      this.showError();
    });
  }

  showError() {
    this.messageService.add({severity:'error', summary: 'Error', detail: 'No se pudo cargar el contenido de los paquetes'});
  }

}
