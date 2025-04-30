import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./layout/header/header.component";
import { FooterComponent } from "./layout/footer/footer.component";
import { CommonModule } from '@angular/common';
import { AuthService } from './shared/auth.service';
import { AdminHeaderComponent } from './layout/admin-header/admin-header.component';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CommonModule,AdminHeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'TFG_Front';
  isAdmin! : boolean
  user!: User;
  constructor(private authService: AuthService) {}


  ngOnInit(): void {
    this.authService.profileUser().subscribe(
      (response: User) => {
        console.log('User profile:', response);
        this.user= response;
        this.isAdmin = this.user.role_id == 1 ? true : false;

      },
      (error) => {
        console.error('Error fetching user profile:', error);
      }
    );

  }

}


