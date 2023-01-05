import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EmailsService {

  url = environment.apiUrl + '/emails';
  token = '';
  headers:any;

  constructor(private http: HttpClient) {
  }

  sendContact(params: any){
    return this.http.post<any>(`${this.url}/send/contact`, params);
  }
}
