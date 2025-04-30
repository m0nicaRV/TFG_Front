import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { TokenService } from './token.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const accessToken = this.tokenService.getToken();
    req= req.clone({
      setHeaders:{
        Authorization: `Bearer ${accessToken}`
      }
    });
    return next.handle(req);
  }
}
