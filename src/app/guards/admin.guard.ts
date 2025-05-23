import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthStateService } from '../service/auth-state.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthStateService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    if(this.authService.isUserLoggedIn) {
        if(this.authService.getisAdmin()) {
          return true;
        }
    }
    return this.router.createUrlTree(['/']);;
  }
}
