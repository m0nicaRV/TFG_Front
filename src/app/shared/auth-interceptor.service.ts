import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { TokenService } from './token.service';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import {IGNORE_AUTH_INTERCEPTOR} from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService, private router:Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const accessToken = this.tokenService.getToken();
    if(accessToken){
      req= req.clone({
        setHeaders:{
          Authorization: `Bearer ${accessToken}`
        }
      });
    }
    if(req.context.get(IGNORE_AUTH_INTERCEPTOR)){
      return next.handle(req);
    }
    return this.handleUnAuthRequestError(req, next);
  }


  private handleUnAuthRequestError(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> { 
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.tokenService.removeToken();
          this.router.navigate(['/login']);
          console.log('Token expired, redirecting to login');
        }
        return throwError(() => err);
      })
    );
  }
}
