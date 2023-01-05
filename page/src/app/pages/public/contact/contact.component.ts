import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { EmailsService } from "../../../services/public/emails.service";
import { NgForm } from "@angular/forms";
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
      this.showErrorCaptcha();
    } else {
      this.isLoading = true;
      console.log(form.value);
      let params = new FormData();
      params.append('Content-Type', 'multipart/form-data');
      params.append('name', form.value.name);
      params.append('email', form.value.email);
      params.append('telephone', form.value.telephone);
      params.append('message', form.value.message);
      console.log(params);
      this.service.sendContact(params).subscribe(response => {
        console.log(response);
        this.showSuccess();
        this.isLoading = false;
      }, error => {
        console.log(error);
        this.showError();
        this.isLoading = false;
      });
    }
  }

  btnValid(option: any){
    if(!option && !this.isLoading){
      return false;
    }
    return true;
  }

  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Success', detail: 'El mensaje se envio con exito'});
  }

  showError() {
    this.messageService.add({severity:'error', summary: 'Error', detail: 'No se enviar el mensaje, intentelo mas tarde'});
  }

  showErrorCaptcha() {
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Debe selecionar el recaptcha'});
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
    if(captchaResponse != null){
      this.recaptcha = true;
    } else {
      this.recaptcha = false;
    }
  }

}
