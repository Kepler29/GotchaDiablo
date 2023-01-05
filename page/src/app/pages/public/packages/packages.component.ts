import { Component, OnInit } from '@angular/core';
import { Package } from 'src/app/interfaces/package';
import { PackagesService } from 'src/app/services/public/packages.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.sass'],
  providers: [MessageService]
})
export class PackagesComponent implements OnInit {

  packages:Package[]=[];


  constructor(private servicePackages: PackagesService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.getPackages();
  }

  getPackages(){
    this.servicePackages.getPackages().subscribe(response => {
      this.packages = response.packages;
    }, error => {
      console.log(error);
      this.showError();
    });
  }

  showError() {
    this.messageService.add({severity:'error', summary: 'Error', detail: 'No se pudo descargar el contenido'});
  }

}
