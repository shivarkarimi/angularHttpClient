import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        catchError(err => this.handleAuthError(err))
      );
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    if (err.status === 401 || err.status === 403) {
      this.router.navigateByUrl(`/login`);
      console.log('%c MESSAGE 401', 'background:#271cbb; color: #dc52fa', err.message)
      return of(err.message);
    }

    if (err.status === 304) {
      this.router.navigateByUrl(`/login`);
      console.log('%c MESSAGE 304', 'background:#271cbb; color: #dc52fa', err.message)
      return of(err.message);
    }

    if (err.status === 500) {
      this.router.navigateByUrl(`/`);
      console.log('%c MESSAGE 500', 'background:#271cbb; color: #dc52fa', err.message)
      return of(err.message);
    }

    return throwError(err);
  }
}
