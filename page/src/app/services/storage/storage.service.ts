import { Injectable } from '@angular/core';
import { User } from "../../interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  token: string = '';
  user:User=<User>{};

  constructor() {

  }

  setToken(token: string){
    this.token = token;
    localStorage.setItem('token', token);
  }

  getToken(): string{
    if(!localStorage.getItem('token')){
      if (this.token == ''){
        return '';
      } else {
        return this.token;
      }
    } else {
      return <string>localStorage.getItem('token');
    }
  }

  setUser(user: User){
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): User{
    if (Object.keys(this.user).length === 0){
      return JSON.parse(<string>localStorage.getItem('user'));
    } else {
      return this.user;
    }

  }

  signOut(){
    this.token = '';
    localStorage.clear();
  }
}
