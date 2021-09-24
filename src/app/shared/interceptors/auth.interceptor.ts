import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService,
              private router: Router) {}

  /**
   * Intercept an accessToken or an refreshToken on each request to check if user is authenticated
   * @param request HttpRequest
   * @param next HttpHandler
   * @returns Observable
   */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const accessToken: string = this.getAccessToken();

    if (accessToken) {
      request = this.getClonedRequest(accessToken, request);
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401 && err.error === 'Token expired') {
          this.handleRefreshToken(request, next);
        }
        this.authService.logout();
        return throwError(err);
      }));
  }

  /**
   * Call the endpoint for refreshing an token if it is expired
   * @param request HttpRequest
   * @param next HttpHandler
   * @returns Observable
   */
  handleRefreshToken(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const refreshToken: string = this.getRefreshToken();
    this.authService.refreshToken(refreshToken).then((res: any) => {
      this.saveNewAccessToken(res);
    });

    const newAccessToken: string = this.getAccessToken();
    if (newAccessToken) {
      request = this.getClonedRequest(newAccessToken, request);
    }

    return next.handle(request).pipe(
      catchError((finalErr: HttpErrorResponse) => {
        this.authService.logout();
        return throwError(finalErr);
    }));
  }

  /**
   * Clone an request with the accessToken or refreshToken
   * @param accessToken string
   * @param request HttpRequest
   * @returns clonedRequest
   */
  getClonedRequest(accessToken: string, request: HttpRequest<unknown>): any {
    return request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + accessToken)
    });
  }

  /**
   * Return the accessToken from LocalStorage
   * @returns accessToken
   */
  getAccessToken(): string {
    return localStorage.getItem('accessToken') || '';
  }

  /**
   * Return the refreshToken from LocalStorage
   * @returns refreshToken
   */
  getRefreshToken(): string {
    return localStorage.getItem('refreshToken') || '';
  }

  /**
   * Save a new accessToken in LocalStorage
   * @param res response
   */
  saveNewAccessToken(res: any): void {
    localStorage.removeItem('accessToken');
    localStorage.setItem('accessToken', res.accessToken);
  }
}


