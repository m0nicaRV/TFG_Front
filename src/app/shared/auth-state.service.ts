import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs'; 
import { TokenService } from './token.service';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {

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

  isAdmin(): boolean {
    if (this.isUserLoggedIn) {
      let isAdmin = false;
      this.authService.profileUser().subscribe((data: any) => {
        if (data.role_id === 1) {
          isAdmin = true;
        }
      });
      return isAdmin;
    }
    return false;
  }



 
}