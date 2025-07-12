import {Component, OnInit} from '@angular/core';
import {UserEntity} from "../../../iam/model/user.entity";
import {ProfileEntity} from "../../../iam/model/profile.entity";
import {ActivatedRoute, Router} from "@angular/router";
import {ProfileApiService} from "../../../iam/services/profile-api.service";
import {IamApiService} from "../../../iam/services/iam-api.service";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-profile-create-carrier',
  templateUrl: './profile-create-carrier.component.html',
  styleUrl: './profile-create-carrier.component.css'
})
export class ProfileCreateCarrierComponent implements OnInit{
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
    this.user.id = this.route.snapshot.params['id'];

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
        profilePayload.idCompany = this.user.id;
        console.log(profilePayload);

        this.profileApi.createUser(profilePayload).subscribe(
          (data: ProfileEntity) => {
            console.log('Profile created successfully:', data);
            this.router.navigate(['/carriers', this.user.id]);
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
    userPayload.role = "carrier";

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
