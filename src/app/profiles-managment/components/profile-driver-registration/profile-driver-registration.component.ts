import { Component, OnInit } from '@angular/core';
import { UserEntity } from '../../model/user.entity';
import { ProfileEntity } from '../../model/profile.entity';
import { IamApiService } from '../../services/iam-api.service.service';
import { ProfileApiServiceService } from '../../services/profile-api.service.service';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-profile-driver-registration',
  templateUrl: './profile-driver-registration.component.html',
  styleUrls: ['./profile-driver-registration.component.css']
})
export class ProfileDriverRegistrationComponent implements OnInit {
  user: UserEntity = new UserEntity();
  profile: ProfileEntity = new ProfileEntity();
  passwordConfirmation: string = '';
  error: boolean = false;
  error_msg: string = '';
  driverList: ProfileEntity[] = [];
  showForm: boolean = false;

  constructor(
    private iamApi: IamApiService,
    private profileApi: ProfileApiServiceService,
    private router: Router
  ) {
    this.user.role = 'DRIVER';
  }

  ngOnInit(): void {
    this.loadDrivers();
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  loadDrivers(): void {
    this.profileApi.getAllProfiles().subscribe({
      next: (profiles: any) => {
        const currentCompanyId = this.getCurrentManagerCompanyId();
        this.driverList = profiles.filter((p: ProfileEntity) =>
          p.idCompany === currentCompanyId
        );
      },
      error: (err) => {
        console.error('Error loading drivers:', err);
      }
    });
  }

  async registerDriver(): Promise<void> {
    await this.validateInputs();

    if (!this.error) {
      try {
        await this.createUser();

        const profilePayload = new ProfileEntity();
        profilePayload.name = this.profile.name;
        profilePayload.lastName = this.profile.lastName;
        profilePayload.telephone = this.profile.telephone;
        profilePayload.idCredential = this.profile.idCredential;
        profilePayload.idCompany = this.getCurrentManagerCompanyId();

        this.profileApi.createUser(profilePayload).subscribe({
          next: () => {
            this.loadDrivers();
            this.toggleForm();
            this.user = new UserEntity();
            this.profile = new ProfileEntity();
            this.passwordConfirmation = '';
            this.error = false;
            this.error_msg = '';
          },
          error: (err) => {
            console.error('Error creating profile:', err);
            this.error = true;
            this.error_msg = 'Error al crear el perfil del conductor.';
          }
        });
      } catch (err) {
        this.error = true;
        this.error_msg = 'Error al registrar el conductor.';
      }
    }
  }

  async validateInputs(): Promise<void> {
    this.error = false;
    this.error_msg = '';

    try {
      const existing = await firstValueFrom(this.iamApi.findUserWithEmail(this.user.email));
      if (existing) {
        this.error = true;
        this.error_msg = 'El correo ya está registrado.';
        return;
      }
    } catch (err) {
      console.warn('Correo no registrado, continúa.');
    }

    if (this.user.password !== this.passwordConfirmation) {
      this.error = true;
      this.error_msg = 'Las contraseñas no coinciden.';
    }
  }

  async createUser(): Promise<void> {
    const newUser = new UserEntity();
    newUser.email = this.user.email;
    newUser.password = this.user.password;
    newUser.role = this.user.role;

    const data = await firstValueFrom(this.iamApi.createUser(newUser));
    this.profile.idCredential = data.id;
  }

  getCurrentManagerCompanyId(): string {
    const profile = JSON.parse(localStorage.getItem('profile') || '{}');
    return profile.idCompany || '';
  }
}