import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PackagesService {

  url = environment.apiUrl + '/packages';
  token = '';
  headers:any;

  constructor(private http: HttpClient) {
  }

  getPackages(){
    return this.http.get<any>(`${this.url}/public`);
  }
}
