import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

import { IamLoginComponentComponent } from './iam/components/iam-login/iam-login.component.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { IamRegisterComponent } from './iam/components/iam-register/iam-register.component';
import { IamRegisterUserInfoComponent } from './iam/components/iam-register-user-info/iam-register-user-info.component';
import { IamRegisterSuccessfullyComponent } from './iam/components/iam-register-successfully/iam-register-successfully.component';
import { IamApiService } from './iam/services/iam-api.service';
import { SidebarPublicComponent } from './public/components/sidebar-public/sidebar-public.component';
import { PgLoginComponent } from './public/pages/pg-login/pg-login.component';
import { PgRegisterComponent } from './public/pages/pg-register/pg-register.component';
import { PgRegisterInfoComponent } from './public/pages/pg-register-info/pg-register-info.component';
import { PgRegisterSuccesComponent } from './public/pages/pg-register-succes/pg-register-succes.component';
import { ProfileHomeBusinessmanComponent } from './profiles-managment/components/profile-home-businessman/profile-home-businessman.component';
import { ProfileHomeDriverComponent } from './profiles-managment/components/profile-home-driver/profile-home-driver.component';
import { PgHomeDriverComponent } from './public/pages/pg-home-driver/pg-home-driver.component';
import { PgHomeBusinessmanComponent } from './public/pages/pg-home-businessman/pg-home-businessman.component';
import { VehicleBusinessmanComponent } from './service-execution/vehicles-management/components/vehicle-businessman/vehicle-businessman.component';
import { PgVehiclesBusinessmanComponent } from './public/pages/pg-vehicles-businessman/pg-vehicles-businessman.component';
import { ProfileEditionComponent } from './profiles-managment/components/profile-edition/profile-edition.component';
import { PgProfileEditionComponent } from './public/pages/pg-profile-edition/pg-profile-edition.component';
import { ShipmentBusinessmanComponent } from './service-execution/shipment-management/components/shipment-businessman/shipment-businessman.component';
import { PgShipmentBusinessmanComponent } from './public/pages/pg-shipment-businessman/pg-shipment-businessman.component';
import { ReportViewComponent } from './service-execution/reports-management/report-view/report-view.component';
import { PgReportBusinessmanComponent } from './public/pages/pg-report-businessman/pg-report-businessman.component';
import { VehicleDetailsComponent } from './service-execution/vehicles-management/components/vehicle-details/vehicle-details.component';
import { PgVehiclesDetailsBusinessmanComponent } from './public/pages/pg-vehicles-details-businessman/pg-vehicles-details-businessman.component';
import { CreateVehicleComponent } from './service-execution/vehicles-management/components/create-vehicle/create-vehicle.component';
import { PgCreateVehicleComponent } from './public/pages/pg-create-vehicle/pg-create-vehicle.component';
import { VehicleUpdateComponent } from './service-execution/vehicles-management/components/vehicle-update/vehicle-update.component';
import { PgVehiclesUpdateComponent } from './public/pages/pg-vehicles-update/pg-vehicles-update.component';
import { PgStaffHomeComponent } from './public/pages/pg-staff-home/pg-staff-home.component';
import { PgAnalyticsComponent } from './public/pages/pg-analytics/pg-analytics.component';
import { PgSubscriptionComponent } from './public/pages/pg-subscription/pg-subscription.component';
import { SidebarStaffComponent } from './public/components/sidebar-staff/sidebar-staff.component';
import { AnalyticsComponent } from './analytics/components/analytics/analytics.component';
import { SubscriptionComponent } from './subscription&payments/components/subscription/subscription.component';
import { PlatformStaffHomeComponent } from './subscription&payments/components/platform-staff-home/platform-staff-home.component';
import { VehiclesApiService } from './service-execution/vehicles-management/services/vehicles-api.service';
import { ShipmentApiService } from './service-execution/shipment-management/services/shipment-api.service';
import { ReportsApiService } from './service-execution/reports-management/reports-services/report-view.service';
import { ProfileApiService } from './profiles-managment/services/profile-api.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { PgCarriersComponent } from './public/pages/pg-carriers/pg-carriers.component';
import { ProfileCreateCarrierComponent } from './profiles-managment/components/profile-create-carrier/profile-create-carrier.component';

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
    ProfileEditionComponent,
    PgProfileEditionComponent,
    ShipmentBusinessmanComponent,
    PgShipmentBusinessmanComponent,
    ReportViewComponent,
    PgReportBusinessmanComponent,
    VehicleDetailsComponent,
    PgVehiclesDetailsBusinessmanComponent,
    CreateVehicleComponent,
    PgCreateVehicleComponent,
    VehicleUpdateComponent,
    PgVehiclesUpdateComponent,
    PgStaffHomeComponent,
    PgAnalyticsComponent,
    PgSubscriptionComponent,
    SidebarStaffComponent,
    AnalyticsComponent,
    SubscriptionComponent,
    PlatformStaffHomeComponent,
    PgCarriersComponent,
    ProfileCreateCarrierComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    AppRoutingModule,
    FormsModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatCardSubtitle,
    MatCardHeader,
    MatButton,
    ReactiveFormsModule,
  ],
  providers: [
    provideAnimationsAsync(),
    IamApiService,
    VehiclesApiService,
    ShipmentApiService,
    ReportsApiService,
    ProfileApiService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
