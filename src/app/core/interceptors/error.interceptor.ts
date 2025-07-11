import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';

        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = `Client Error: ${error.error.message}`;
        } else {
          // Server-side error
          errorMessage = `Server Error: ${error.status} - ${error.message}`;

          // Handle specific HTTP status codes
          switch (error.status) {
            case 401:
              // Unauthorized - redirect to login
              this.handleUnauthorizedError();
              break;
            case 403:
              // Forbidden - show access denied message
              this.handleForbiddenError();
              break;
            case 404:
              // Not Found
              console.error('Resource not found:', error.url);
              break;
            case 500:
              // Internal Server Error
              console.error('Internal server error occurred');
              break;
            default:
              console.error('HTTP Error:', error);
          }
        }

        console.error('HTTP Error occurred:', errorMessage);
        return throwError(() => error);
      })
    );
  }

  private handleUnauthorizedError(): void {
    // Clear auth data and redirect to login
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  private handleForbiddenError(): void {
    // TODO: Show access denied message or redirect to appropriate page
    console.error('Access denied - insufficient permissions');
  }
}
