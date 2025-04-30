import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TokenService } from '../../shared/token.service';
import { AuthStateService } from '../../shared/auth-state.service';
import { AuthService } from '../../shared/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-header',
  imports: [CommonModule],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export class AdminHeaderComponent {
  isMenuOpen: boolean = false;
  constructor(private auth: AuthStateService, private router: Router, private token: TokenService, private authService:AuthService) { }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;

  }

  signOut(){
    console.log('signOut');
    this.token.removeToken();
    this.auth.setAuthState(false);
    this.router.navigate(['/']);
  }

}
