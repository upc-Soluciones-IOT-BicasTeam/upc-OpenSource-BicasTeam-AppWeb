import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IamApiService } from '../../../iam/services/iam-api.service';
import { UserEntity } from '../../../iam/model/user.entity';
import { ProfileEntity } from '../../../iam/model/profile.entity';
import { ProfileApiService } from '../../../iam/services/profile-api.service';
import { AuthService } from '../../../core/services/auth.service';
import { AppConstants } from '../../../shared/constants/app.constants';

@Component({
  selector: 'app-sidebar-public',
  templateUrl: './sidebar-public.component.html',
  styleUrls: ['./sidebar-public.component.css'],
})
export class SidebarPublicComponent implements OnInit {
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

  ngOnInit(): void {
    // Load current user data from AuthService
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.user = currentUser;
      this.loadProfileData();
    } else {
      const userId = this.route.snapshot.params['id'];
      if (userId) {
        this.user.id = parseInt(userId);
        this.loadProfileData();
      }
    }
  }

  private loadProfileData(): void {
    if (this.user.id) {
      this.profileApi.findUserById(this.user.id).subscribe({
        next: (profileData: any) => {
          console.log('Profile data loaded:', profileData);
          this.profile = profileData;
          this.type = 'MANAGER';
          this.name = profileData.name || 'Manager';
          this.lastName = profileData.lastName || 'User';
        },
        error: (error) => {
          console.error('Error loading profile data:', error);
          this.type = 'MANAGER';
          this.name = 'Manager';
          this.lastName = 'User';
        },
      });
    }
  }

  getUserImage(type: string): string {
    return AppConstants.DEFAULT_PROFILE_IMAGE;
  }

  goToHome(): void {
    this.router.navigate(['/home-businessman', this.user.id]);
  }

  goToProfile(): void {
    this.router.navigate(['/profile', this.user.id]);
  }

  goTologout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  goToVehicles(): void {
    this.router.navigate(['/vehicles-businessman', this.user.id]);
  }

  goToReports(): void {
    this.router.navigate(['/report-businessman', this.user.id]);
  }

  goToShipments(): void {
    this.router.navigate(['/shipment-businessman', this.user.id]);
  }

  goToPricing(): void {
    this.router.navigate(['/subscription', this.user.id]);
  }

  goToAnalytics(): void {
    this.router.navigate(['/analytics', this.user.id]);
  }
}
