import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PgLoginComponent } from './public/pages/pg-login/pg-login.component';
import { PgRegisterComponent } from './public/pages/pg-register/pg-register.component';
import { PgRegisterSuccesComponent } from './public/pages/pg-register-succes/pg-register-succes.component';
import { PgRegisterInfoComponent } from './public/pages/pg-register-info/pg-register-info.component';
import { PgHomeBusinessmanComponent } from './public/pages/pg-home-businessman/pg-home-businessman.component';
import { PgHomeDriverComponent } from './public/pages/pg-home-driver/pg-home-driver.component';
import { PgVehiclesBusinessmanComponent } from './public/pages/pg-vehicles-businessman/pg-vehicles-businessman.component';
import { PgVehiclesCarrierComponent } from './public/pages/pg-vehicles-carrier/pg-vehicles-carrier.component';
import { PgProfileEditionComponent } from './public/pages/pg-profile-edition/pg-profile-edition.component';
import { PgShipmentBusinessmanComponent } from './public/pages/pg-shipment-businessman/pg-shipment-businessman.component';
import { PgReportBusinessmanComponent } from './public/pages/pg-report-businessman/pg-report-businessman.component';
import { PgSubscriptionComponent } from './public/pages/pg-subscription/pg-subscription.component';
import { PgStaffHomeComponent } from './public/pages/pg-staff-home/pg-staff-home.component';
import { PgAnalyticsComponent } from './public/pages/pg-analytics/pg-analytics.component';

const routes: Routes = [
  { path: 'login', component: PgLoginComponent },
  { path: 'register', component: PgRegisterComponent },
  { path: 'register/successfully', component: PgRegisterSuccesComponent },
  { path: 'register/:type', component: PgRegisterInfoComponent },
  { path: ':id/home-businessman', component: PgHomeBusinessmanComponent },
  { path: ':id/home-carrier', component: PgHomeDriverComponent },
  {
    path: ':id/vehicles-businessman',
    component: PgVehiclesBusinessmanComponent,
  },
  { path: ':id/vehicles-carrier', component: PgVehiclesCarrierComponent },
  {
    path: ':id/shipment-businessman',
    component: PgShipmentBusinessmanComponent,
  },
  { path: ':id/profile', component: PgProfileEditionComponent },
  { path: ':id/report-businessman', component: PgReportBusinessmanComponent },
  { path: ':id/subscription', component: PgSubscriptionComponent },
  { path: ':id/staff-home', component: PgStaffHomeComponent },
  { path: ':id/analytics', component: PgAnalyticsComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
