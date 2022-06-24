import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';
import {CaptchaModule} from "primeng/captcha";
import {FormsModule} from "@angular/forms";
import {ToastModule} from "primeng/toast";


@NgModule({
  declarations: [
    ContactComponent
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    CaptchaModule,
    FormsModule,
    ToastModule
  ]
})
export class ContactModule { }
