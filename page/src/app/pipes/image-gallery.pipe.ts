import { Pipe, PipeTransform } from '@angular/core';
import { environment } from "../../environments/environment";

const URL = environment.apiUrl + '/uploads';

@Pipe({
  name: 'imageGallery'
})
export class ImageGalleryPipe implements PipeTransform {

  transform(img: string, id: string, collection:string): string {
    return `${ URL }/${ collection }/${ id }/${ img }`;
  }

}
