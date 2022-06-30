import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { GalleriaModule } from "primeng/galleria";
import {PipesModule} from "../../../pipes/pipes.module";
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";


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
        RippleModule
    ]
})
export class MainModule { }
