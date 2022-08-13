import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {AuthService} from "../../pages/auth";

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  url = environment.apiUrl + '/reservations';
  auth:any;
  headers:any;

  constructor(private http: HttpClient,
              private authService: AuthService) {
    this.auth = this.authService.getAuthFromLocalStorage();
    this.headers = new HttpHeaders({
      'x-token': this.auth.authToken,
    });
  }

  getReservations(user: string){
    return this.http.get<any>(`${this.url}/${user}`, {headers: this.headers});
  }

  postReservation(params: any){
    return this.http.post<any>(`${this.url}`, params, {headers: this.headers});
  }

}
