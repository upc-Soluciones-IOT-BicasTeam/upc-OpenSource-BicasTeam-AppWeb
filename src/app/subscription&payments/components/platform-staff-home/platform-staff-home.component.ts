import { Component, OnInit } from '@angular/core';
import { UserEntity } from '../../../iam/model/user.entity';
import { ProfileEntity } from '../../../iam/model/profile.entity';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileApiService } from '../../../iam/services/profile-api.service';
import { IamApiService } from '../../../iam/services/iam-api.service';
import { SubsApiService } from '../../services/subs-api.service';

interface CombinedUserData {
  name: string;
  lastName: string;
  email: string;
  url: string;
  state: string;
  idSubs: number;
}

@Component({
  selector: 'app-platform-staff-home',
  templateUrl: './platform-staff-home.component.html',
  styleUrls: ['./platform-staff-home.component.css'],
})
export class PlatformStaffHomeComponent implements OnInit {
  usersData: CombinedUserData[] = [];
  error: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private profileApi: ProfileApiService,
    private router: Router,
    private iamApi: IamApiService,
    private subsApi: SubsApiService
  ) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    this.iamApi.getAllUsers().subscribe(
      (resUsers: any) => {
        const users: UserEntity[] = resUsers.data || resUsers;

        this.profileApi.getAllProfiles().subscribe((resProfiles: any) => {
          const profiles: ProfileEntity[] = resProfiles.data || resProfiles;

          this.subsApi.getAll().subscribe((resSubs: any) => {
            const subs = resSubs.data || resSubs;

            const filtered: CombinedUserData[] = [];

            users.forEach((user: UserEntity) => {
              const profile = profiles.find((p) => p.idCredential === user.id);
              if (!profile || profile.name === 'Unknown') return;

              const userSub = subs.find((s: any) => s.userId === user.id);

              if (userSub && userSub.url) {
                filtered.push({
                  name: profile.name,
                  lastName: profile.lastName,
                  email: user.email,
                  url: userSub.url,
                  state: userSub.state,
                  idSubs: userSub.id,
                });
              }
            });

            this.usersData = filtered;
          });
        });
      },
      (error) => {
        this.error = true;
        console.error('Error loading data', error);
      }
    );
  }
  updateStatus(user: CombinedUserData, newState: string): void {
    this.subsApi.updateStatus(user.idSubs, newState).subscribe({
      next: () => {
        user.state = newState;
      },
      error: (err) => {
        console.error('Error updating status:', err);
      },
    });
  }
}
