
import { Injectable} from '@angular/core';
import { HttpClient, HttpParams, HttpContext } from '@angular/common/http';
import { HttpContextToken } from '@angular/common/http';
import { IGNORE_AUTH_INTERCEPTOR, environment } from '../environments/environments';


import { BehaviorSubject } from 'rxjs';

export const AUTH_TOKEN_DEFINITION = 'auth_token_api_google_calendar';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  googleApi:any;
   
  private authTokenSub$ = new BehaviorSubject<string | null>(null);
  public authTokenChanges$ = this.authTokenSub$.asObservable();

 

  constructor( private http: HttpClient) {
    this.authTokenSub$.next(localStorage.getItem(AUTH_TOKEN_DEFINITION));
   }

   public init(): void {
    if(this.getAuthToken()){
      console.log('Token:', this.getAuthToken());
    }else{
      this.googleApi = google.accounts.oauth2.initTokenClient({
        client_id: environment.googleCalendar.CLIENT_ID,
        scope: environment.googleCalendar.SCOPES,
        callback: (response: any) => {
          this.setAuthToken(response.access_token);
          this.handleAuthResult(response);
        }
      });
      this.googleApi.requestAccessToken();
   }

  }

  public handleAuthResult(response: any) {
    console.log('Auth Response:', response);
    if (response && response.access_token) {
      console.log('Access Token:', response.access_token);
    } else {
      console.error('Authentication failed:', response.error);
    }
  }

  
  public getAuthToken(): string | null {
    return localStorage.getItem(AUTH_TOKEN_DEFINITION);
  }

    public setAuthToken(accessToken: string): void {
    localStorage.setItem(AUTH_TOKEN_DEFINITION, accessToken);
    this.authTokenSub$.next(accessToken);
  }

    public resetAuthToken(): void {
    localStorage.removeItem('auth_token_api_google_calendar');
    this.authTokenSub$.next(null);
  }

  public events(){
    const params = new HttpParams()
    .set('timeMin', '2023-10-01T00:00:00Z')
    .set('timeMax', '2026-10-31T23:59:59Z')
    .set('singleEvents', 'true')
    .set('orderBy', 'startTime')
    .set('timezone', 'UTC');
    const context = new HttpContext().set(IGNORE_AUTH_INTERCEPTOR,true );
    console.log('Token:', this.getAuthToken());
    return this.http.get<any>('https://www.googleapis.com/calendar/v3/calendars/primary/events', { params, context });
  }

  calcularSemana(dia: Date) {
    const semana: Date[] = []
    for (let i = 0; i < 7; i++) {
      const fecha = new Date(dia);
      fecha.setDate(dia.getDate() + i);
      semana.push(fecha );
    }
    return semana;

  }




   
}