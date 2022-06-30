import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../../modules/auth";

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  url = environment.apiUrl + '/gallery';
  auth:any;
  headers:any;

  constructor(private http: HttpClient,
              private authService: AuthService) {
    this.auth = this.authService.getAuthFromLocalStorage();
    this.headers = new HttpHeaders({
      'x-token': this.auth.authToken,
    });
  }

  getImages(){
    return this.http.get<any>(this.url, {headers: this.headers});
  }

  getImage(id: string){
    return this.http.get<any>(`${this.url}/${id}`, {headers: this.headers});
  }

  activeImage(params:any){
    return this.http.post<any>(`${this.url}/active`, params, {headers: this.headers});
  }

  postImage(params: any){
    return this.http.post<any>(`${this.url}`, params, {headers: this.headers});
  }

  putImage(id: any, params: any){
    return this.http.put<any>(`${this.url}/${id}`, params, {headers: this.headers});
  }

  deleteImage(id: string){
    return this.http.delete<any>(`${this.url}/${id}`, {headers: this.headers});
  }
}
