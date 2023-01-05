import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationsRoutingModule } from './reservations-routing.module';
import { ReservationsComponent } from './reservations.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InlineSVGModule } from 'ng-inline-svg-2';
import { PublicComponentsModule } from "../../../components/public/public.module";
import { ButtonModule } from "primeng/button";
import { RippleModule } from "primeng/ripple";
import { DialogModule } from "primeng/dialog";
import { InputTextModule } from "primeng/inputtext";
import { CalendarModule } from "primeng/calendar";


@NgModule({
  declarations: [
    ReservationsComponent
  ],
  imports: [
    CommonModule,
    ReservationsRoutingModule,
    ReactiveFormsModule,
    InlineSVGModule,
    PublicComponentsModule,
    ButtonModule,
    RippleModule,
    DialogModule,
    InputTextModule,
    FormsModule,
    CalendarModule
  ]
})
export class ReservationsModule { }
