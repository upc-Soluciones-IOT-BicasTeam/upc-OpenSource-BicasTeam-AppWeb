import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IamApiService } from '../../../iam/services/iam-api.service.service';
import { UserEntity } from '../../../iam/model/user.entity';

@Component({
  selector: 'app-profile-edition',
  templateUrl: './profile-edition.component.html',
  styleUrls: ['./profile-edition.component.css']
})
export class ProfileEditionComponent implements OnInit {
  user: UserEntity = new UserEntity();
  error: boolean = false;
  error_msg: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private iamApiService: IamApiService) {
    this.user.id = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    if (this.user.id !== null && this.user.id !== undefined) {
      this.iamApiService.findUserById(this.user.id).subscribe(
        (data: UserEntity) => {
          this.user = data;
        },
        (error) => {
          console.error('Error fetching user:', error);
          this.error = true;
          this.error_msg = 'Failed to load user data.';
        }
      );
    } else {
      console.error('User ID is null or undefined');
      this.error = true;
      this.error_msg = 'Invalid user ID.';
    }
  }

  updateUser() {
    this.iamApiService.updateUser(this.user.email, this.user.password, this.user).subscribe(
      (data: UserEntity) => {
        console.log('User updated successfully:', data);
        alert('Profile updated successfully!');
        this.router.navigate([`/profile/${this.user.id}`]).catch((err) => console.error('Navigation error:', err));
      },
      (error) => {
        console.error('Error updating user:', error);
        this.error = true;
        this.error_msg = 'Failed to update user profile. Please try again later.';
      }
    );
  }
}
