import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { IamLoginComponentComponent } from './iam/components/iam-login/iam-login.component.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { IamRegisterComponent } from './iam/components/iam-register/iam-register.component';
import { IamRegisterUserInfoComponent } from './iam/components/iam-register-user-info/iam-register-user-info.component';
import { IamRegisterSuccessfullyComponent } from './iam/components/iam-register-successfully/iam-register-successfully.component';
import {IamApiService} from "./iam/services/iam-api.service.service";
import { SidebarPublicComponent } from './public/components/sidebar-public/sidebar-public.component';
import { PgLoginComponent } from './public/pages/pg-login/pg-login.component';
import { PgRegisterComponent } from './public/pages/pg-register/pg-register.component';
import { PgRegisterInfoComponent } from './public/pages/pg-register-info/pg-register-info.component';
import { PgRegisterSuccesComponent } from './public/pages/pg-register-succes/pg-register-succes.component';

import {MatSidenav, MatSidenavContainer, MatSidenavModule} from "@angular/material/sidenav";
import {MatListItem, MatListModule, MatNavList} from "@angular/material/list";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatDivider, MatDividerModule} from "@angular/material/divider";

@NgModule({
  declarations: [
    AppComponent,
    IamLoginComponentComponent,
    IamRegisterComponent,
    IamRegisterUserInfoComponent,
    IamRegisterSuccessfullyComponent,
    SidebarPublicComponent,
    PgLoginComponent,
    PgRegisterComponent,
    PgRegisterInfoComponent,
    PgRegisterSuccesComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatSidenavContainer,
    MatNavList,
    MatIcon,
    MatDivider,
    MatListItem,
    MatSidenav,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatDividerModule
  ],
  providers: [
    provideAnimationsAsync(),IamApiService
  ],
  bootstrap: [AppComponent,]
})
export class AppModule { }
