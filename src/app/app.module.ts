import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { IamLoginComponentComponent } from './iam/components/iam-login/iam-login.component.component';
import {FormsModule} from "@angular/forms";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { IamRegisterComponent } from './iam/components/iam-register/iam-register.component';
import { IamRegisterUserInfoComponent } from './iam/components/iam-register-user-info/iam-register-user-info.component';
import { IamRegisterSuccessfullyComponent } from './iam/components/iam-register-successfully/iam-register-successfully.component';
import {IamApiService} from "./iam/services/iam-api.service.service";

@NgModule({
  declarations: [
    AppComponent,
    IamLoginComponentComponent,
    IamRegisterComponent,
    IamRegisterUserInfoComponent,
    IamRegisterSuccessfullyComponent
  ],
    imports: [
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        FormsModule
    ],
  providers: [
    provideAnimationsAsync(),IamApiService
  ],
  bootstrap: [AppComponent,]
})
export class AppModule { }
