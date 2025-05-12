import { Injectable } from "@angular/core";
import { HttpErrorResponse,HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from "@angular/common/http";
import { Observable,catchError, throwError } from "rxjs";
import { CalendarService } from "./calendar.service";
import { Router } from "@angular/router";

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
}