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
    if (this.authService.isAuthenticated()) {
      this.redirectToUserHome();
    }
  }

  ngOnDestroy() {
    document.body.style.backgroundColor = '';
  }

  login() {
    this.error = false;
    this.isLoading = true;

    if (!this.user.email || !this.user.password) {
      this.setError('Please enter both email and password');
      this.isLoading = false;
      return;
    }

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

    switch (user.role) {
      case 'manager':
        this.router.navigate(['/home-businessman', user.id]);
        break;
      case 'staff':
        this.router.navigate(['/staff-home', user.id]);
        break;
      case 'driver':
        this.router.navigate(['/home-carrier', user.id]);
        break;
      case 'businessman':
        this.router.navigate(['/home-businessman', user.id]);
        break;
      default:
        this.router.navigate(['/profile', user.id]);
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
    this.user.role = type; 
    console.log(type);
    this.router.navigate([`register/${type}`]);
  }
}
