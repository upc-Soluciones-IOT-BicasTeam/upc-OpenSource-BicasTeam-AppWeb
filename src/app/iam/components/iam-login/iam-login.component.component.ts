import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { UserEntity } from '../../model/user.entity';
import { Router } from '@angular/router';

@Component({
  selector: 'app-iam-login',
  templateUrl: './iam-login.component.component.html',
  styleUrls: ['./iam-login.component.component.css'],
})
export class IamLoginComponentComponent implements OnInit, OnDestroy {
  user: UserEntity = new UserEntity();
  error: boolean = false;
  error_msg: string = '';
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    document.body.style.backgroundColor = '#303841';

    // Check if user is already authenticated
    if (this.authService.isAuthenticated()) {
      this.redirectToUserHome();
    }
  }

  ngOnDestroy() {
    document.body.style.backgroundColor = '';
  }

  login() {
    // Reset error state
    this.error = false;
    this.isLoading = true;

    // Validate input
    if (!this.user.email || !this.user.password) {
      this.setError('Please enter both email and password');
      this.isLoading = false;
      return;
    }

    // Attempt authentication
    this.authService.login(this.user.email, this.user.password).subscribe({
      next: (authenticatedUser: any) => {
        console.log('Login successful:', authenticatedUser);
        this.isLoading = false;

        if (authenticatedUser) {
          this.redirectToUserHome();
        } else {
          this.setError('Invalid email or password');
        }
      },
      error: (error) => {
        console.error('Login error:', error);
        this.isLoading = false;

        if (error.status === 404) {
          this.setError('Invalid email or password');
        } else {
          this.setError(
            'An unexpected error occurred. Please try again later.'
          );
        }
      },
    });
  }

  private redirectToUserHome(): void {
    const user = this.authService.getCurrentUser();
    if (!user) return;

    // Redirect based on user role to their main dashboard
    switch (user.role) {
      case 'manager':
        this.router.navigate([`${user.id}/home-businessman`]);
        break;
      case 'staff':
        this.router.navigate([`${user.id}/staff-home`]);
        break;
      case 'driver':
        this.router.navigate([`${user.id}/home-carrier`]);
        break;
      case 'businessman':
        this.router.navigate([`${user.id}/home-businessman`]);
        break;
      default:
        // Default to profile page if role is unknown
        this.router.navigate([`${user.id}/profile`]);
        break;
    }
  }

  private setError(message: string): void {
    this.error = true;
    this.error_msg = message;
  }

  cleanCss() {
    document.body.style.backgroundColor = '';
  }

  goToRegisterUserInformation(type: string) {
    this.user.role = type; // Guarda el tipo de usuario
    console.log(type);
    this.router.navigate([`register/${type}`]);
  }
}
