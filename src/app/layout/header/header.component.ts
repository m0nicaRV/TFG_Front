import { Component } from '@angular/core';
import  {CommonModule} from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isMenuOpen = false;
  isLoggedIn:boolean = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    console.log('menu is open', this.isMenuOpen);
  }

}
