import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { EmailsService } from "../../../services/public/emails.service";
import { NgForm } from "@angular/forms";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { MessageService } from "primeng/api";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.sass'],
  providers: [MessageService]
})
export class ContactComponent implements OnInit {

  recaptcha: boolean = false;
  isLoading: boolean = false;

  constructor(private titleService: Title,
              private messageService: MessageService,
              private service: EmailsService,) {
    this.titleService.setTitle('Contacto');
  }

  ngOnInit(): void {
  }

  submit(form: NgForm){
    if(!this.recaptcha){
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Debe comprobar que no es robot',
        timer: 2000
      });
    } else {
      this.isLoading = true;
      let params = new FormData();
      params.append('Content-Type', 'multipart/form-data');
      params.append('name', form.value.name);
      params.append('email', form.value.email);
      params.append('telephone', form.value.telephone);
      params.append('message', form.value.message);
      this.service.sendContact(params).subscribe(response => {
        console.log(response);
        Swal.fire({
          icon: 'success',
          title: '¡Exito!',
          text: 'El Mensaje se envio con exito',
          timer: 2000
        });
        this.isLoading = false;
      }, error => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: 'Se encontro un error al enviar el mensaje',
          timer: 2000
        });
        this.isLoading = false;
      });
    }
  }

  showResponse(event: any) {
    this.messageService.add({severity:'info', summary:'Succees', detail: 'User Responded', sticky: true});
  }

}
