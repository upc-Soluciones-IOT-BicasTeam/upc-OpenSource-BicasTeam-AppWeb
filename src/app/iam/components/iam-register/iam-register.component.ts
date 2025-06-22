import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IamApiService } from '../../services/iam-api.service.service';
import { UserEntity } from '../../model/user.entity';

@Component({
  selector: 'app-iam-register',
  templateUrl: './iam-register.component.html',
  styleUrls: ['./iam-register.component.css']
})
export class IamRegisterComponent {
  user: UserEntity = new UserEntity();

  constructor(private router: Router, private iamApiService: IamApiService) {}

  ngOnInit() {
    document.body.style.backgroundColor = '#303841';
  }

  ngOnDestroy() {
    document.body.style.backgroundColor = '';
  }

  cleanCss() {
    document.body.style.backgroundColor = '';
  }

  typeSelection(type: string) {
    this.user.role = type; // Guarda el tipo de usuario
    console.log(`Selected type: ${type}`);
  }

  goToRegisterUserInformation(type: string) {
    this.typeSelection(type);
    this.iamApiService.createUser(this.user).subscribe(
      (data: UserEntity) => {
        console.log('User registered successfully:', data);
        this.router.navigate([`register/${type}`]); // Redirigir al registro exitoso
      },
      (error) => {
        console.error('Error registering user:', error);
        alert('Registration failed. Please try again later.');
      }
    );
  }
}
