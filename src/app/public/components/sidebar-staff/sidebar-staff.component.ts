import { Component, OnInit } from '@angular/core';
import { UserEntity } from '../../../iam/model/user.entity';
import { ProfileEntity } from '../../../iam/model/profile.entity';
import { ActivatedRoute, Router } from '@angular/router';
import { IamApiService } from '../../../iam/services/iam-api.service';
import { ProfileApiService } from '../../../iam/services/profile-api.service';
import { AuthService } from '../../../core/services/auth.service';
import { AppConstants } from '../../../shared/constants/app.constants';

@Component({
  selector: 'app-sidebar-staff',
  templateUrl: './sidebar-staff.component.html',
  styleUrl: './sidebar-staff.component.css',
})
export class SidebarStaffComponent implements OnInit {
  user: UserEntity = {} as UserEntity;
  profile: ProfileEntity = new ProfileEntity();
  name: string = '';
  lastName: string = '';
  type: string = '';
  visible: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: IamApiService,
    private profileApi: ProfileApiService,
    private authService: AuthService
  ) {
    this.user.id = this.route.snapshot.params['id'];
  }
  ngOnInit() {
    this.type = 'Staff Platform';

    // Load current user data from AuthService
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.user = currentUser;
      this.loadProfileData();
    } else {
      // If no user in AuthService, try to get from route params
      const userId = this.route.snapshot.params['id'];
      if (userId) {
        this.user.id = parseInt(userId);
        this.loadProfileData();
      }
    }
  }

  private loadProfileData(): void {
    if (this.user.id) {
      // Load profile data using ProfileApiService
      this.profileApi.findUserById(this.user.id).subscribe({
        next: (profileData: any) => {
          console.log('Profile data loaded:', profileData);
          this.profile = profileData;
          this.name = profileData.name || 'Staff';
          this.lastName = profileData.lastName || 'Member';
        },
        error: (error) => {
          console.error('Error loading profile data:', error);
          // Set default values if profile loading fails
          this.name = 'Staff';
          this.lastName = 'Member';
        },
      });
    }
  }

  getUserImage(type: string): string {
    return AppConstants.DEFAULT_PROFILE_IMAGE;
  }

  goToChangueCredentials(): void {
    this.router.navigate([this.user.id, `profile`]);
  }

  goTologout(): void {
    // Use AuthService to logout
    this.authService.logout();
    this.router.navigate([`login`]);
  }

  goToHome(): void {
    this.router.navigate([this.user.id, `staff-home`]);
  }

  goToPricing(): void {
    // Staff should go to their main dashboard, not subscription
    this.router.navigate([this.user.id, `staff-home`]);
  }
}
