import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  constructor( private http: HttpClient) { }

  create(cita: FormData): Observable<any> {
    const headers= new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    return this.http.post(environment.url_host+'api/citas/store', cita,( {headers: headers}));
  }

  index(): Observable<any> {
    return this.http.get(environment.url_host+'api/citas/index');
  }

  googleCalendar(): Observable<any> {
    return this.http.get(environment.url_host+'api/calendar');
  }
}
