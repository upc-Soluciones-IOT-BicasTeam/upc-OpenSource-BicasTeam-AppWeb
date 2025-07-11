import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IamApiService } from '../../../iam/services/iam-api.service.service';
import { UserEntity } from '../../../iam/model/user.entity';
import { ProfileEntity } from '../../../iam/model/profile.entity';
import { ProfileApiServiceService } from '../../../iam/services/profile-api.service.service';
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
    private profileApi: ProfileApiServiceService
  ) {
    this.user.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.profileApi.findUserById(this.user.id!).subscribe((data: any) => {
      console.log(data);
      this.type = 'Manager';
      this.name = data.name;
      this.lastName = data.lastName;
    });
  }

  getUserImage(type: string): string {
    return AppConstants.DEFAULT_PROFILE_IMAGE;
  }

  goToHome(): void {
    this.router.navigate([this.user.id, `home-businessman`]);
  }

  goToProfile(): void {
    this.router.navigate([this.user.id, `profile`]);
  }

  goTologout(): void {
    this.router.navigate([`login`]);
  }

  goToVehicles(): void {
    this.router.navigate([this.user.id, `vehicles-businessman`]);
  }

  goToReports(): void {
    this.router.navigate([this.user.id, `report-businessman`]);
  }

  goToShipments(): void {
    this.router.navigate([this.user.id, `shipment-businessman`]);
  }

  goToPricing(): void {
    this.router.navigate([this.user.id, `subscription`]);
  }

  goToAnalytics(): void {
    this.router.navigate([this.user.id, 'analytics']);
  }
}
