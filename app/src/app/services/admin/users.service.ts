import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {AuthService} from "../../modules/auth";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  url = environment.apiUrl + '/users';
  auth:any;
  headers:any;

  constructor(private http: HttpClient,
              private authService: AuthService) {
    this.auth = this.authService.getAuthFromLocalStorage();
    this.headers = new HttpHeaders({
      'x-token': this.auth.authToken,
    });
  }

  getUsers(){
    return this.http.get<any>(this.url, {headers: this.headers});
  }

  showUser(id: string){
    return this.http.get<any>(this.url + '/' + id, {headers: this.headers});
  }

  activeUser(params:any){
    return this.http.post<any>(`${this.url}/active`, params, {headers: this.headers});
  }

  postUser(params: any){
    return this.http.post<any>(this.url, params, {headers: this.headers});
  }

  putUser(id: string, params: any){
    return this.http.put<any>(this.url + '/' + id, params, {headers: this.headers});
  }

  deleteUser(id: string){
    return this.http.delete<any>(this.url + '/' + id, {headers: this.headers});
  }
}
