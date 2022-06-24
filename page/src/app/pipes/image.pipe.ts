import { Pipe, PipeTransform } from '@angular/core';
import { environment } from "../../environments/environment";

const URL = environment.apiUrl + '/uploads';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(id: string, collection:string): string {
    return `${ URL }/${ collection }/${ id }`;
  }

}
