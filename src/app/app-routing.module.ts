import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IamLoginComponentComponent} from "./iam/components/iam-login/iam-login.component.component";
import {IamRegisterComponent} from "./iam/components/iam-register/iam-register.component";
import {IamRegisterUserInfoComponent} from "./iam/components/iam-register-user-info/iam-register-user-info.component";
import {
  IamRegisterSuccessfullyComponent
} from "./iam/components/iam-register-successfully/iam-register-successfully.component";

const routes: Routes = [
  {path: 'login',component: IamLoginComponentComponent},
  {path: 'register',component: IamRegisterComponent},
  {path: 'register/successfully',component: IamRegisterSuccessfullyComponent},
  {path: 'register/:type',component: IamRegisterUserInfoComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
