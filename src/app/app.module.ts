import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { IamLoginComponentComponent } from './iam/components/iam-login/iam-login.component.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { IamRegisterComponent } from './iam/components/iam-register/iam-register.component';
import { IamRegisterUserInfoComponent } from './iam/components/iam-register-user-info/iam-register-user-info.component';
import { IamRegisterSuccessfullyComponent } from './iam/components/iam-register-successfully/iam-register-successfully.component';
import { IamApiService } from './iam/services/iam-api.service.service';
import { SidebarPublicComponent } from './public/components/sidebar-public/sidebar-public.component';
import { PgLoginComponent } from './public/pages/pg-login/pg-login.component';
import { PgRegisterComponent } from './public/pages/pg-register/pg-register.component';
import { PgRegisterInfoComponent } from './public/pages/pg-register-info/pg-register-info.component';
import { PgRegisterSuccesComponent } from './public/pages/pg-register-succes/pg-register-succes.component';

import {
  MatSidenav,
  MatSidenavContainer,
  MatSidenavModule,
} from '@angular/material/sidenav';
import { MatListItem, MatListModule, MatNavList } from '@angular/material/list';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { ProfileHomeBusinessmanComponent } from './profiles-managment/components/profile-home-businessman/profile-home-businessman.component';
import { ProfileHomeDriverComponent } from './profiles-managment/components/profile-home-driver/profile-home-driver.component';
import { PgHomeDriverComponent } from './public/pages/pg-home-driver/pg-home-driver.component';
import { PgHomeBusinessmanComponent } from './public/pages/pg-home-businessman/pg-home-businessman.component';
import { VehicleBusinessmanComponent } from './service-execution/vehicles-management/components/vehicle-businessman/vehicle-businessman.component';
import { PgVehiclesBusinessmanComponent } from './public/pages/pg-vehicles-businessman/pg-vehicles-businessman.component';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { VehicleCarrierComponent } from './service-execution/vehicles-management/components/vehicle-carrier/vehicle-carrier.component';
import { PgVehiclesCarrierComponent } from './public/pages/pg-vehicles-carrier/pg-vehicles-carrier.component';
import { ProfileEditionComponent } from './profiles-managment/components/profile-edition/profile-edition.component';
import { PgProfileEditionComponent } from './public/pages/pg-profile-edition/pg-profile-edition.component';
import { ShipmentBusinessmanComponent } from './service-execution/shipment-management/components/shipment-businessman/shipment-businessman.component';
import { PgShipmentBusinessmanComponent } from './public/pages/pg-shipment-businessman/pg-shipment-businessman.component';
import { ReportViewComponent } from './service-execution/reports-management/report-view/report-view.component';
import { PgReportBusinessmanComponent } from './public/pages/pg-report-businessman/pg-report-businessman.component';
import { SubscriptionComponent } from './subscription&payments/components/subscription/subscription.component';
import { PgSubscriptionComponent } from './public/pages/pg-subscription/pg-subscription.component';
import { PlatformStaffHomeComponent } from './subscription&payments/components/platform-staff-home/platform-staff-home.component';
import { PgStaffHomeComponent } from './public/pages/pg-staff-home/pg-staff-home.component';
import { SidebarStaffComponent } from './public/components/sidebar-staff/sidebar-staff.component';
import { PgAnalyticsComponent } from './public/pages/pg-analytics/pg-analytics.component';
import { AnalyticsComponent } from './analytics/components/analytics/analytics.component';

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
    PgRegisterSuccesComponent,
    PgHomeBusinessmanComponent,
    ProfileHomeBusinessmanComponent,
    ProfileHomeDriverComponent,
    PgHomeDriverComponent,
    VehicleBusinessmanComponent,
    PgVehiclesBusinessmanComponent,
    VehicleCarrierComponent,
    PgVehiclesCarrierComponent,
    ProfileEditionComponent,
    PgProfileEditionComponent,
    ShipmentBusinessmanComponent,
    PgShipmentBusinessmanComponent,
    ReportViewComponent,
    PgReportBusinessmanComponent,
    SubscriptionComponent,
    PgSubscriptionComponent,
    PlatformStaffHomeComponent,
    PgStaffHomeComponent,
    SidebarStaffComponent,
    PgAnalyticsComponent,
    AnalyticsComponent,
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
    MatDividerModule,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatButton,
    MatCardSubtitle,
    MatCardHeader,
    ReactiveFormsModule,
  ],
  providers: [provideAnimationsAsync(), IamApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
