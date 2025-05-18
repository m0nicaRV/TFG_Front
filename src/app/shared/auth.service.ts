import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { HttpContextToken } from '@angular/common/http';
import { environment } from '../environments/environments';





@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(user: User): Observable<any> {
    return this.http.post(environment.url_host+'api/register', user);
  }

  login(user: User): Observable<any> {
   
    return this.http.post<any>(environment.url_host+'api/login', user);
  }

  profileUser(): Observable<any> {
    return this.http.get(environment.url_host+'api/me');
  }

  logout(): Observable<any> {
    return this.http.post(environment.url_host+'api/logout', null);
  }

  

}
