import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): Observable<boolean> {
    // Check if user is authenticated using AuthService
    if (this.authService.isAuthenticated()) {
      return of(true);
    }

    // User is not authenticated, redirect to login
    this.router.navigate(['/login']);
    return of(false);
  }
}
