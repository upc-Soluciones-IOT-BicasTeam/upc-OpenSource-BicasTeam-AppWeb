import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserEntity } from '../../model/user.entity';
import { ActivatedRoute, Router } from '@angular/router';
import { IamApiService } from '../../services/iam-api.service';

import { Observable, firstValueFrom } from 'rxjs';
import { ProfileApiService } from '../../services/profile-api.service';
import { ProfileEntity } from '../../model/profile.entity';

@Component({
  selector: 'app-iam-register-user-info',
  templateUrl: './iam-register-user-info.component.html',
  styleUrls: ['./iam-register-user-info.component.css'],
})
export class IamRegisterUserInfoComponent implements OnInit, OnDestroy {
  user: UserEntity = new UserEntity();
  profile: ProfileEntity = new ProfileEntity();
  error: boolean = false;
  error_msg: string = '';
  privacityPolicy: boolean = false;
  passwordConfirmation: string = '';

  constructor(
    private route: ActivatedRoute,
    private profileApi: ProfileApiService,
    private router: Router,
    private iamApi: IamApiService
  ) {
    this.user.role = this.route.snapshot.params['type'];
  }

  ngOnInit() {
    document.body.style.backgroundColor = '#303841';
  }

  ngOnDestroy() {
    document.body.style.backgroundColor = '';
  }

  async createProfile() {
    await this.validateInputs();

    if (!this.error) {
      try {
        // Esperar a que el usuario sea creado y el id esté disponible
        await this.createUser();

        const profilePayload = new ProfileEntity();
        profilePayload.idCredential = this.profile.idCredential;
        profilePayload.name = this.profile.name;
        profilePayload.lastName = this.profile.lastName;
        profilePayload.telephone = null;
        profilePayload.idCompany = null;
        console.log(profilePayload);

        this.profileApi.createUser(profilePayload).subscribe(
          (data: ProfileEntity) => {
            console.log('Profile created successfully:', data);
            this.router.navigate(['/register/successfully']);
          },
          (error) => {
            console.error('Error during profile creation:', error);
            this.error = true;
            this.error_msg = 'Profile creation failed. Please try again later.';
          }
        );
      } catch (error) {
        this.error = true;
        this.error_msg = 'Error creating user. Please try again later.';
      }
    }
  }

  async validateInputs() {
    this.error = false;
    this.error_msg = '';

    try {
      const emailCheckResult = await firstValueFrom(
        this.iamApi.findUserWithEmail(this.user.email)
      );
      if (emailCheckResult) {
        this.error = true;
        this.error_msg = 'Email already registered';
      }
    } catch (error) {
      console.error('Error checking email:', error);
    }

    if (!this.privacityPolicy) {
      this.error = true;
      this.error_msg = 'Please accept the privacy policy';
    }

    if (this.user.password !== this.passwordConfirmation) {
      this.error = true;
      this.error_msg = 'Passwords do not match';
    }
  }

  async createUser() {
    const userPayload = new UserEntity();
    userPayload.email = this.user.email;
    userPayload.password = this.user.password;
    userPayload.role = this.user.role;

    try {
      // Cambiar a firstValueFrom para esperar la respuesta de la API
      const data: UserEntity = await firstValueFrom(
        this.iamApi.createUser(userPayload)
      );
      console.log('User created with ID:', data.id);
      console.log(data);
      this.profile.idCredential = data.id; // Establecer el id del usuario recién creado
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Error creating user');
    }
  }
}
