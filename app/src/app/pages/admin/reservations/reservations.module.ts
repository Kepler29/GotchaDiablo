import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationsRoutingModule } from './reservations-routing.module';
import { ReservationsComponent } from './reservations.component';
import { InlineSVGModule } from "ng-inline-svg";
import { TableModule } from 'primeng/table';
import { DropdownModule } from "primeng/dropdown";
import { SliderModule } from "primeng/slider";
import { PaginatorModule } from "primeng/paginator";
import { ProgressBarModule } from "primeng/progressbar";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { InputTextareaModule } from "primeng/inputtextarea";
import { DialogModule } from "primeng/dialog";
import { RippleModule } from "primeng/ripple";
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import {CalendarModule} from "primeng/calendar";


@NgModule({
  declarations: [
    ReservationsComponent
  ],
    imports: [
        CommonModule,
        ReservationsRoutingModule,
        InlineSVGModule,
        TableModule,
        DropdownModule,
        SliderModule,
        PaginatorModule,
        ProgressBarModule,
        ButtonModule,
        InputTextModule,
        ConfirmDialogModule,
        InputTextareaModule,
        DialogModule,
        RippleModule,
        SweetAlert2Module,
        CalendarModule
    ]
})
export class ReservationsModule { }