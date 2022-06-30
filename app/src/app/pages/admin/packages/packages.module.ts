import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PackagesRoutingModule } from './packages-routing.module';
import { PackagesComponent } from './packages.component';
import { WidgetsModule } from "../../../_metronic/partials";
import {InlineSVGModule} from "ng-inline-svg";
import {TableModule} from "primeng/table";
import {DropdownModule} from "primeng/dropdown";
import {SliderModule} from "primeng/slider";
import {PaginatorModule} from "primeng/paginator";
import {ProgressBarModule} from "primeng/progressbar";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {InputTextareaModule} from "primeng/inputtextarea";
import {DialogModule} from "primeng/dialog";
import {RippleModule} from "primeng/ripple";
import {SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";
import {PipesModule} from "../../../pipes/pipes.module";
import {EditorModule} from "primeng/editor";


@NgModule({
  declarations: [
    PackagesComponent
  ],
    imports: [
        CommonModule,
        PackagesRoutingModule,
        WidgetsModule,
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
        PipesModule,
        EditorModule
    ]
})
export class PackagesModule { }
