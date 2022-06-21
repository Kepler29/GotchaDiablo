import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {AuthService} from "../../modules/auth";

@Injectable({
  providedIn: 'root'
})
export class UploadsService {

  url = environment.apiUrl + '/uploads';
  auth:any;
  headers:any;

  constructor(private http: HttpClient,
              private authService: AuthService) {
    this.auth = this.authService.getAuthFromLocalStorage();
    this.headers = new HttpHeaders({
      'x-token': this.auth.authToken,
    });
  }

  getUpload(collection: string, id: string){
    return this.http.get<any>(this.url + '/' + collection + '/' + id, {headers: this.headers});
  }

  postUpload(params: any){
    return this.http.post<any>(this.url, params, {headers: this.headers});
  }

  postUploadGallery(id:string, collection: string, params: any){
    return this.http.post<any>(`${this.url}/${collection}/${id}`, params, {headers: this.headers});
  }

  putUpload(collection: string, id:string, params: any){
    return this.http.put<any>(this.url + '/' + collection + '/' + id, params, {headers: this.headers});
  }

  deleteUploadGallery(collection: string, id: string, img: string){
    return this.http.delete<any>(this.url + '/gallery/' + collection + '/' + id + '/' + img, {headers: this.headers});
  }

  deleteUpload(collection: string, id: string, img: string){
    return this.http.delete<any>(this.url + '/' + collection + '/' + id + '/' + img, {headers: this.headers});
  }
}
