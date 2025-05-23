import { Component } from '@angular/core';
import  {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import { TokenService } from '../../service/token.service';
import { AuthStateService } from '../../service/auth-state.service';
import { AuthService } from '../../service/auth.service';
import { User } from '../../models/user';
import { RouterModule } from '@angular/router';



@Component({
  standalone: true,
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {
  isMenuOpen = false;
  isLoggedIn!:boolean;
  isAdmin:boolean = false;
  isLoading:boolean = true;
  user!: User ;
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
        this.auth.setAdmin(data.role_id == 1);
        this.isAdmin = this.user.role_id == 1 ? true : false;
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
