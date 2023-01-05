import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  url = environment.apiUrl + '/gallery';
  token = '';
  headers:any;

  constructor(private http: HttpClient) {
  }

  getGallery(){
    return this.http.get<any>(`${this.url}/public`);
  }
}
