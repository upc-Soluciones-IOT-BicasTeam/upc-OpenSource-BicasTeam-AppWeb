import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-iam-register-successfully',
  templateUrl: './iam-register-successfully.component.html',
  styleUrls: ['./iam-register-successfully.component.css']
})
export class IamRegisterSuccessfullyComponent implements OnInit, OnDestroy {
  constructor(private router: Router) {}

  ngOnInit() {
    document.body.style.backgroundColor = '#303841';
  }

  ngOnDestroy() {
    document.body.style.backgroundColor = '';
  }

  goToLogin() {
    this.router.navigate(['/login']);
    this.cleanCss();
  }

  cleanCss() {
    document.body.style.backgroundColor = '';
  }
}
