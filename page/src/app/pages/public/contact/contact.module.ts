import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';
import { CaptchaModule } from "primeng/captcha";
import { FormsModule } from "@angular/forms";
import { RecaptchaModule } from "ng-recaptcha";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {InputNumberModule} from "primeng/inputnumber";


@NgModule({
  declarations: [
    ContactComponent
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    CaptchaModule,
    FormsModule,
    RecaptchaModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule
  ]
})
export class ContactModule { }
