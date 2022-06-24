import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagePipe } from './image.pipe';
import { DomSanitizerPipe } from './dom-sanitizer.pipe';
import { ImageGalleryPipe } from "./image-gallery.pipe";
import { TruncatePipe } from './truncate.pipe';



@NgModule({
  declarations: [
    DomSanitizerPipe,
    ImagePipe,
    ImageGalleryPipe,
    TruncatePipe
  ],
  exports: [
    DomSanitizerPipe,
    ImagePipe,
    ImageGalleryPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
