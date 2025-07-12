import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    // Check if user is authenticated first
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return of(false);
    }

    const expectedRole = route.data['expectedRole'];
    const userRole = this.authService.getCurrentUserRole();

    if (userRole === expectedRole) {
      return of(true);
    }

    // Redirect based on user role
    this.redirectToAppropriatePage(userRole);
    return of(false);
  }

  private redirectToAppropriatePage(role: string | null): void {
    const userId = this.authService.getCurrentUserId();

    switch (role) {
      case 'manager':
        this.router.navigate(['/profile', userId]);
        break;
      case 'staff':
        this.router.navigate(['/staff-home', userId]);
        break;
      case 'businessman':
        this.router.navigate(['/home-businessman', userId]);
        break;
      case 'driver':
        this.router.navigate(['/home-carrier', userId]);
        break;
      default:
        this.router.navigate(['/login']);
    }
  }
}
