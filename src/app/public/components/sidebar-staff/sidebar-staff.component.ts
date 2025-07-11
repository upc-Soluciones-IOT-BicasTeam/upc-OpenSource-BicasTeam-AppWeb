import { Component, OnInit } from '@angular/core';
import { UserEntity } from '../../../iam/model/user.entity';
import { ProfileEntity } from '../../../iam/model/profile.entity';
import { ActivatedRoute, Router } from '@angular/router';
import { IamApiService } from '../../../iam/services/iam-api.service.service';
import { ProfileApiServiceService } from '../../../iam/services/profile-api.service.service';
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
    private profileApi: ProfileApiServiceService
  ) {
    this.user.id = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.type = 'Staff Platform';
  }

  getUserImage(type: string): string {
    return AppConstants.DEFAULT_PROFILE_IMAGE;
  }

  goToChangueCredentials(): void {
    this.router.navigate([this.user.id, `staff-home`]);
  }

  goTologout(): void {
    this.router.navigate([`login`]);
  }

  goToPricing(): void {
    this.router.navigate([this.user.id, `staff-home`]);
  }
}
