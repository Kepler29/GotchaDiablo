import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {AuthService} from "../../modules/auth";

@Injectable({
  providedIn: 'root'
})
export class PackagesService {

  url = environment.apiUrl + '/packages';
  auth:any;
  headers:any;

  constructor(private http: HttpClient,
              private authService: AuthService) {
    this.auth = this.authService.getAuthFromLocalStorage();
    this.headers = new HttpHeaders({
      'x-token': this.auth.authToken,
    });
  }

  getPackages(){
    return this.http.get<any>(this.url, {headers: this.headers});
  }

  getPackage(id: string){
    return this.http.get<any>(`${this.url}/${id}`, {headers: this.headers});
  }

  activePackage(params:any){
    return this.http.post<any>(`${this.url}/active`, params, {headers: this.headers});
  }

  postPackage(params: any){
    return this.http.post<any>(`${this.url}`, params, {headers: this.headers});
  }

  putPackage(id: any, params: any){
    return this.http.put<any>(`${this.url}/${id}`, params, {headers: this.headers});
  }

  deletePackage(id: string){
    return this.http.delete<any>(`${this.url}/${id}`, {headers: this.headers});
  }

}
