
import { Injectable, NgZone } from '@angular/core';
import { environment } from '../environments/environments'; 

import { BehaviorSubject } from 'rxjs';

export const AUTH_TOKEN_DEFINITION = 'auth_token_api_google_calendar';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
   
  private authTokenSub$ = new BehaviorSubject<string | null>(null);
  public authTokenChanges$ = this.authTokenSub$.asObservable();

 

  constructor(private ngZone: NgZone) {  
   }

  public getAuthToken(): string | null {
    return localStorage.getItem(AUTH_TOKEN_DEFINITION);
  }

    public setAuthToken(accessToken: string): void {
    localStorage.setItem(AUTH_TOKEN_DEFINITION, accessToken);
    this.authTokenSub$.next(accessToken);
  }

    public resetAuthToken(): void {
    localStorage.removeItem(AUTH_TOKEN_DEFINITION);
    this.authTokenSub$.next(null);
  }


   
}