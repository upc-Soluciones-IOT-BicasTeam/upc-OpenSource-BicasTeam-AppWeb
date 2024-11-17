import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserEntity } from '../../model/user.entity';
import { ActivatedRoute, Router } from '@angular/router';
import { IamApiService } from '../../services/iam-api.service.service';
import { Observable, firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-iam-register-user-info',
  templateUrl: './iam-register-user-info.component.html',
  styleUrls: ['./iam-register-user-info.component.css']
})
export class IamRegisterUserInfoComponent implements OnInit, OnDestroy {
  user: UserEntity = new UserEntity();
  error: boolean = false;
  error_msg: string = '';
  privacityPolicy: boolean = false;
  passwordConfirmation: string = '';

  constructor(private route: ActivatedRoute, private iamApi: IamApiService, private router: Router) {
    this.user.type = this.route.snapshot.params['type'];
  }

  ngOnInit() {
    document.body.style.backgroundColor = '#303841';
  }

  ngOnDestroy() {
    document.body.style.backgroundColor = '';
  }

  async createUser() {
    await this.validateInputs();

    if (!this.error) {
      // Usa una instancia de UserEntity para garantizar que el objeto pase la validación de tipos
      const userPayload = new UserEntity();
      userPayload.name = this.user.name;
      userPayload.lastName = this.user.lastName;
      userPayload.email = this.user.email;
      userPayload.password = this.user.password;
      userPayload.type = this.user.type;

      this.iamApi.createUser(userPayload).subscribe(
        (data: UserEntity) => {
          console.log('User registered successfully:', data);
          this.router.navigate(['/register/successfully']);
        },
        (error) => {
          console.error('Error during registration:', error);
          this.error = true;
          this.error_msg = 'Registration failed. Please try again later.';
        }
      );
    }
  }


  async validateInputs() {
    this.error = false;
    this.error_msg = '';

    try {
      const emailCheckResult = await firstValueFrom(this.iamApi.findUserWithEmail(this.user.email));
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
}
