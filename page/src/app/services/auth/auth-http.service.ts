import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { UserModel } from "./models/user.model";

const API_URL = `${environment.apiUrl}`;
const API_PAGE_URL = `${environment.pageUrl}`;

@Injectable({
  providedIn: 'root',
})
export class AuthHTTPService {


  constructor(private http: HttpClient) {}

  // public methods
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${API_URL}/auth/login`, {
      email,
      password,
    });
  }

  // CREATE =>  POST: add a new user to the server
  createUser(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(API_URL, user);
  }

  // Your server should check email => If email exists send link to the user and return true | If email doesn't exist return false
  forgotPassword(email: string): Observable<any> {
    return this.http.post<any>(`${API_URL}/password/find/user`, {
      email,
      url: `${API_PAGE_URL}`
    });
  }

  changePassword(params: any, token: string): Observable<any> {
    const httpHeaders = new HttpHeaders({
      'x-token': token,
    });
    return this.http.post<any>(`${API_URL}/password/token`, params, {
      headers: httpHeaders,
    });
  }

  findToken(token: string): Observable<any> {
    return this.http.post<any>(`${API_URL}/password/find/token`, {
      token
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
