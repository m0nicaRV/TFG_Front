import { Component } from '@angular/core';
import  {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import { TokenService } from '../../shared/token.service';
import { AuthStateService } from '../../shared/auth-state.service';
import { AuthService } from '../../shared/auth.service';

export class User{
    name!:String;
    email!:String;
  } 


@Component({
  standalone: true,
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {
  isMenuOpen = false;
  isLoggedIn!:boolean;
  isAdmin:boolean = false;
  isLoading:boolean = true;
  user: User = new User();
  constructor(private auth: AuthStateService, private router: Router, private token: TokenService, private authService:AuthService){ }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;

  }


  ngOnInit(): void {
    this.auth.userAuthState.subscribe((val) => {
      this.isLoggedIn = val;
      if(this.isLoggedIn){
        this.authService.profileUser().subscribe((data:any)=>{
        this.user=data;
        });
    }
    console.log('isLoggedIn:', this.isLoggedIn);
      this.isLoading = false;
  });
  }

  signOut(){
    console.log('signOut');
    this.token.removeToken();
    this.auth.setAuthState(false);
    this.router.navigate(['/']);
  }

}
