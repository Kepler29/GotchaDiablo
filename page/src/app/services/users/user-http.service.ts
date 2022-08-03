import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { UserModel } from "../../pages/auth";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";


const API_URL = `${environment.apiUrl}`;
const PAGE_URL = environment.pageUrl;

@Injectable({
  providedIn: 'root'
})
export class UserHttpService {

  constructor(private http: HttpClient) {}

  updateUser(user: UserModel, token: string): Observable<UserModel> {
    const httpHeaders = new HttpHeaders({
      'x-token': token,
    });
    return this.http.post<UserModel>(`${API_URL}/users/details`, user, {
      headers: httpHeaders,
    });
  }


  changeEmail(params: any, token: string): Observable<any> {
    const httpHeaders = new HttpHeaders({
      'x-token': token,
    });
    return this.http.post<any>(`${API_URL}/users/email`, params, {
      headers: httpHeaders,
    });
  }

  changePassword(params: any, token: string): Observable<any> {
    const httpHeaders = new HttpHeaders({
      'x-token': token,
    });
    return this.http.post<any>(`${API_URL}/users/password`, params, {
      headers: httpHeaders,
    });
  }

  deactivateAccount(id: string, token: string): Observable<any> {
    const httpHeaders = new HttpHeaders({
      'x-token': token,
    });
    return this.http.delete<any>(`${API_URL}/users/${id}`, {
      headers: httpHeaders,
    });
  }

  getUserByToken(token: string): Observable<UserModel> {
    const httpHeaders = new HttpHeaders({
      'x-token': token,
    });
    return this.http.get<UserModel>(`${API_URL}/auth/me`, {
      headers: httpHeaders,
    });
  }
}
