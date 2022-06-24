import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { GalleriaModule } from "primeng/galleria";
import {PipesModule} from "../../../pipes/pipes.module";


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    GalleriaModule,
    PipesModule
  ]
})
export class MainModule { }
