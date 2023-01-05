import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { GalleriaModule } from "primeng/galleria";
import { PipesModule } from "../../../pipes/pipes.module";
import { CardModule } from "primeng/card";
import { ButtonModule } from "primeng/button";
import { RippleModule } from "primeng/ripple";
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    MainComponent
  ],
    imports: [
        CommonModule,
        MainRoutingModule,
        GalleriaModule,
        PipesModule,
        CardModule,
        ButtonModule,
        ToastModule,
        RippleModule
    ]
})
export class MainModule { }
