import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../../modules/auth";

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  url = environment.apiUrl + '/companies';
  auth:any;
  headers:any;

  constructor(private http: HttpClient,
              private authService: AuthService) {
    this.auth = this.authService.getAuthFromLocalStorage();
    this.headers = new HttpHeaders({
      'x-token': this.auth.authToken,
    });
  }


  getCompanies(){
    return this.http.get<any>(this.url, {headers: this.headers});
  }

  showCompany(id: string){
    return this.http.get<any>(`${this.url}/${id}`, {headers: this.headers});
  }


  activeCompany(params: any){
    return this.http.post<any>(`${this.url}/active`, params, {headers: this.headers});
  }

  postCompany(params: any){
    return this.http.post<any>(this.url, params, {headers: this.headers});
  }

  putCompany(id: string, params: any){
    return this.http.put<any>(`${this.url}/${id}`, params, {headers: this.headers});
  }

  deleteCompany(id: string){
    return this.http.delete<any>(`${this.url}/${id}`, {headers: this.headers});
  }
}
