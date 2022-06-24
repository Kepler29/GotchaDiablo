import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  baseUrl = environment.backUrl + '/api/password';

  constructor(private http: HttpClient) {

  }

  createPassword(params: any){
    return this.http.post<any>(this.baseUrl + '/create', params);
  }

  tokenFind(token: string){
    return this.http.get<any>(this.baseUrl + '/find/'+ token);
  }

  resetPassword(params: any){
    return this.http.post<any>(this.baseUrl + '/reset', params);
  }
}
