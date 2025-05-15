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
      (data: UserEntity) => {
        if (data) {

          data.type === 'Gerente'
            ? this.router.navigate([`${data.id}/home-businessman`])
            : this.router.navigate([`${data.id}/home-carrier`]);
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
    this.user.type = type; // Guarda el tipo de usuario
    console.log(type)
    this.router.navigate([`register/${type}`]); // Redirigir al registro exitoso
  }
}
