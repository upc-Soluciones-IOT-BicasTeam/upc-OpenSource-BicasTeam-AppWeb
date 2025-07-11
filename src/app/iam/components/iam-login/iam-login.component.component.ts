import { Component, OnInit, OnDestroy } from '@angular/core';
import { IamApiService } from '../../services/iam-api.service.service';
import { UserEntity } from '../../model/user.entity';
import { Router } from '@angular/router';

@Component({
  selector: 'app-iam-login',
  templateUrl: './iam-login.component.component.html',
  styleUrls: ['./iam-login.component.component.css']
})
export class IamLoginComponentComponent implements OnInit, OnDestroy {
  user: UserEntity = new UserEntity();
  error: boolean = false;
  error_msg: string = '';

  constructor(private iamApi: IamApiService, private router: Router) {}

  ngOnInit() {
    document.body.style.backgroundColor = '#303841';
  }

  ngOnDestroy() {
    document.body.style.backgroundColor = '';
  }

  login() {
    this.error = false; // Reinicia el estado de error al intentar un nuevo login
    this.iamApi.authenticateUser(this.user.email, this.user.password).subscribe(
      (data: any) => {
        console.log(data);
        if (data) {

          data.role === 'manager'
            ? this.router.navigate([`${data.id}/profile`])
            : this.router.navigate([`${data.id}/staff-home`]);
        } else {
          this.error = true;
          this.error_msg = 'Email or Password incorrect';
        }
      },
      (error) => {
        console.error('Error during login:', error);
        this.error = true;
        this.error_msg = 'An unexpected error occurred. Please try again later.';
      }
    );
  }

  cleanCss() {
    document.body.style.backgroundColor = '';
  }

  goToRegisterUserInformation(type: string) {
    this.user.role = type; // Guarda el tipo de usuario
    console.log(type)
    this.router.navigate([`register/${type}`]);
  }
}
