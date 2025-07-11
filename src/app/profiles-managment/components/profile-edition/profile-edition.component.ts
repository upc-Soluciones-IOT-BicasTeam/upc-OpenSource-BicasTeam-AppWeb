import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IamApiService } from '../../../iam/services/iam-api.service';
import { UserEntity } from '../../../iam/model/user.entity';
import { ProfileEntity } from '../../../iam/model/profile.entity';

@Component({
  selector: 'app-profile-edition',
  templateUrl: './profile-edition.component.html',
  styleUrls: ['./profile-edition.component.css'],
})
export class ProfileEditionComponent implements OnInit {
  user: UserEntity = new UserEntity();
  profile: ProfileEntity = new ProfileEntity();
  authEmail: string = '';
  authPassword: string = '';
  authenticated: boolean = false;
  loading: boolean = false;
  error: boolean = false;
  success: boolean = false;
  error_msg: string = '';
  originalUser: Partial<UserEntity> = {};
  showProfileForm: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private iamApiService: IamApiService
  ) {}

  ngOnInit() {
    // Inicia sin cargar los datos del usuario.
  }

  authenticateUser() {
    if (this.authEmail && this.authPassword) {
      this.loading = true;
      this.error = false;
      this.error_msg = '';

      this.iamApiService
        .authenticateUser(this.authEmail, this.authPassword)
        .subscribe(
          (data: UserEntity) => {
            this.user = data;
            this.originalUser = { ...data };
            this.authenticated = true;
            this.loading = false;
          },
          (error) => {
            console.error('Authentication failed:', error);
            this.error = true;
            this.error_msg = 'Invalid credentials. Please try again.';
            this.loading = false;
          }
        );
    } else {
      this.error = true;
      this.error_msg = 'Please enter both email and password.';
    }
  }

  updateUser() {
    this.loading = true;
    this.error = false;
    this.success = false;

    let hasChanges = false;

    // Verificar si hay cambios en los campos del usuario
    for (const key in this.user) {
      if (this.user.hasOwnProperty(key)) {
        const userKey = key as keyof UserEntity;
        if (
          this.user[userKey] !== undefined &&
          this.user[userKey] !== this.originalUser[userKey]
        ) {
          hasChanges = true;
          break;
        }
      }
    }

    if (!hasChanges) {
      this.error = true;
      this.error_msg = 'No changes detected.';
      this.loading = false;
      return;
    }

    // Llamada al método de actualización de usuario
    this.iamApiService
      .updateUser(this.authEmail, this.authPassword, this.user)
      .subscribe(
        (data: UserEntity) => {
          console.log('User updated successfully:', data);
          this.success = true;
          this.loading = false;
          alert('Profile updated successfully!');
          this.router
            .navigate([`/profile/${this.user.id}`])
            .catch((err) => console.error('Navigation error:', err));
        },
        (error) => {
          console.error('Error updating user:', error);
          this.error = true;
          this.error_msg =
            'Failed to update user profile. Please try again later.';
          this.loading = false;
        }
      );
  }
}
