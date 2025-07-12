import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PgLoginComponent } from './public/pages/pg-login/pg-login.component';
import { PgRegisterComponent } from './public/pages/pg-register/pg-register.component';
import { PgRegisterSuccesComponent } from './public/pages/pg-register-succes/pg-register-succes.component';
import { PgRegisterInfoComponent } from './public/pages/pg-register-info/pg-register-info.component';
import { PgHomeBusinessmanComponent } from './public/pages/pg-home-businessman/pg-home-businessman.component';
import { PgHomeDriverComponent } from './public/pages/pg-home-driver/pg-home-driver.component';
import { PgVehiclesBusinessmanComponent } from './public/pages/pg-vehicles-businessman/pg-vehicles-businessman.component';
import { PgProfileEditionComponent } from './public/pages/pg-profile-edition/pg-profile-edition.component';
import { PgShipmentBusinessmanComponent } from './public/pages/pg-shipment-businessman/pg-shipment-businessman.component';
import { PgReportBusinessmanComponent } from './public/pages/pg-report-businessman/pg-report-businessman.component';
import { PgVehiclesDetailsBusinessmanComponent } from './public/pages/pg-vehicles-details-businessman/pg-vehicles-details-businessman.component';
import { PgCreateVehicleComponent } from './public/pages/pg-create-vehicle/pg-create-vehicle.component';
import { PgVehiclesUpdateComponent } from './public/pages/pg-vehicles-update/pg-vehicles-update.component';
import { PgStaffHomeComponent } from './public/pages/pg-staff-home/pg-staff-home.component';
import { PgSubscriptionComponent } from './public/pages/pg-subscription/pg-subscription.component';
import { PgAnalyticsComponent } from './public/pages/pg-analytics/pg-analytics.component';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';

const routes: Routes = [
  { path: 'login', component: PgLoginComponent },
  { path: 'register', component: PgRegisterComponent },
  { path: 'register/successfully', component: PgRegisterSuccesComponent },
  { path: 'register/:type', component: PgRegisterInfoComponent },

  {
    path: 'home-businessman/:id',
    component: PgHomeBusinessmanComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: 'manager' },
  },
  {
    path: 'vehicles-businessman/:id',
    component: PgVehiclesBusinessmanComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: 'manager' },
  },
  {
    path: 'shipment-businessman/:id',
    component: PgShipmentBusinessmanComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: 'manager' },
  },
  {
    path: 'report-businessman/:id',
    component: PgReportBusinessmanComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: 'manager' },
  },
  {
    path: 'vehicles-details-businessman/:id/:vehicleId',
    component: PgVehiclesDetailsBusinessmanComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: 'manager' },
  },
  {
    path: 'create-vehicle-businessman/:id',
    component: PgCreateVehicleComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: 'manager' },
  },
  {
    path: 'vehicles-update/:id/:vehicleId',
    component: PgVehiclesUpdateComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: 'manager' },
  },
  {
    path: 'subscription/:id',
    component: PgSubscriptionComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: 'manager' },
  },
  {
    path: 'analytics/:id',
    component: PgAnalyticsComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: 'manager' },
  },

  {
    path: 'home-carrier/:id',
    component: PgHomeDriverComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: 'driver' },
  },

  {
    path: 'profile/:id',
    component: PgProfileEditionComponent,
    canActivate: [AuthGuard],
  },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
