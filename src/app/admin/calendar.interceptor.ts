import { Injectable } from "@angular/core";
import { HttpErrorResponse,HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from "@angular/common/http";
import { Observable,catchError, throwError } from "rxjs";
import { CalendarService } from "./calendar.service";
import { Router } from "@angular/router";
import { HttpContextToken } from '@angular/common/http';
import { IGNORE_AUTH_INTERCEPTOR } from "../environments/environments";


@Injectable()

export class CalendarInterceptor implements HttpInterceptor {
constructor(private authService: CalendarService, private router: Router) {}

  private handleUnAuthRequestError(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
      return next.handle(request).pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 401) {
            this.authService.resetAuthToken();
            this.router.navigate(['logout']);
          }
          return throwError(() => err);
        })
      );

  }  

  public intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log(request.context.get(IGNORE_AUTH_INTERCEPTOR));

    if(request.context.get(IGNORE_AUTH_INTERCEPTOR)) {
       const token = this.authService.getAuthToken();
    if (token) {
      request = request.clone({
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      });
    }
    return this.handleUnAuthRequestError(request, next);
    }
    return next.handle(request)
   
  }
}