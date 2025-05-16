import { Component, OnInit } from '@angular/core';
import { UserEntity } from '../../../iam/model/user.entity';
import { ProfileEntity } from '../../../iam/model/profile.entity';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileApiServiceService } from '../../../iam/services/profile-api.service.service';
import { IamApiService } from '../../../iam/services/iam-api.service.service';

interface CombinedUserData {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-platform-staff-home',
  templateUrl: './platform-staff-home.component.html',
  styleUrls: ['./platform-staff-home.component.css']
})
export class PlatformStaffHomeComponent implements OnInit {
  usersData: CombinedUserData[] = [];
  error: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private profileApi: ProfileApiServiceService,
    private router: Router,
    private iamApi: IamApiService
  ) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    this.iamApi.getAllUsers().subscribe((users: any) => {
      this.profileApi.getAllProfiles().subscribe((profiles: any) => {
        const combined: CombinedUserData[] = users.map((user: UserEntity) => {
          const matchingProfile = profiles.find(
            (p: ProfileEntity) => p.idCredentials === user.id
          );

          return {
            name: matchingProfile?.name || 'Unknown',
            lastName: matchingProfile?.lastName || '',
            email: user.email,
            password: user.password
          };
        });

        this.usersData = combined;
      });
    }, error => {
      this.error = true;
      console.error('Error loading data', error);
    });
  }
}
