import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  constructor( private http: HttpClient) { }

  create(cita: FormData): Observable<any> {
    console.log(cita);
    const headers= new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    return this.http.post('http://127.0.0.1:8000/api/citas/store', cita,( {headers: headers}));
  }

  index(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/citas/index');
  }

  googleCalendar(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/calendar');
  }
}
