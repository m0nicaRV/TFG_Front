import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private issuer ={
    login: environment.url_host+'api/login',
    register: environment.url_host+'api/register'
    };

  constructor() { }
  
  handleData(token:any){
    localStorage.setItem('auth_token', token);
  }

  getToken(){
    return localStorage.getItem('auth_token');
  }

  isValidToken(){

    const token = this.getToken();
    if(token){
      const payload = this.payload(token);
      if(payload){
        return Object.values(this.issuer).indexOf(payload.iss) > -1 ? true : false;
      }
    }
    return false;
  }

  payload(token:any){
    const jwtPayload = token.split('.')[1];
    return JSON.parse(atob(jwtPayload));
  }

  isLoggedIn(){
    return this.isValidToken();
  }

  removeToken(){
    localStorage.removeItem('auth_token');
    
  }
  getUser(){
    if(this.isValidToken()){
      return this.payload(this.getToken());
    }
    return null;
  }
}
