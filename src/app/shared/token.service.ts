import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private issuer ={
    login: 'http://127.0.0.1:8000/api/login',
    register: 'http://127.0.0.1:8000/api/register'
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
