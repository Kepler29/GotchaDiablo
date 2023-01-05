import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GalleryRoutingModule } from './gallery-routing.module';
import { GalleryComponent } from './gallery.component';
import { GalleriaModule } from 'primeng/galleria';
import { PipesModule } from '../../../pipes/pipes.module';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    GalleryComponent
  ],
  imports: [
    CommonModule,
    GalleryRoutingModule,
    GalleriaModule,
    PipesModule,
    ToastModule
  ]
})
export class GalleryModule { }
