import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user'; // Adjust the import path as necessary
import { HttpContextToken } from '@angular/common/http';





@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(user: User): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/register', user);
  }

  login(user: User): Observable<any> {
   
    return this.http.post<any>('http://127.0.0.1:8000/api/login', user);
  }

  profileUser(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/me');
  }

  logout(): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/logout', null);
  }

  

}
