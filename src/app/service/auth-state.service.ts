import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs'; 
import { TokenService } from './token.service'
import { AuthService } from './auth.service'
import { Router } from '@angular/router';
import { is } from 'date-fns/locale';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  Admin: boolean = false;
  private userState: BehaviorSubject<boolean>;
  public userAuthState: Observable<boolean>; 


  constructor(
    public authService: AuthService,
    public router: Router,
    public token: TokenService
  ) {
    
    this.userState = new BehaviorSubject<boolean>(this.token.isLoggedIn());
    this.userAuthState = this.userState.asObservable(); 
  }

  setAuthState(value:boolean){
    this.userState.next(value);
  }


  get isUserLoggedIn(): boolean {
      return this.userState.value; 
  }

  isLoggedIn(): void {
      if (this.userState.value) {
        this.router.navigate(['/login']);
      }
    
  }

  setAdmin(value: boolean): void {
    this.Admin = value;
  }

  getisAdmin(): boolean {
    return this.Admin;
   
  }



 
}