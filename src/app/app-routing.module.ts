import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PgLoginComponent} from "./public/pages/pg-login/pg-login.component";
import {PgRegisterComponent} from "./public/pages/pg-register/pg-register.component";
import {PgRegisterSuccesComponent} from "./public/pages/pg-register-succes/pg-register-succes.component";
import {PgRegisterInfoComponent} from "./public/pages/pg-register-info/pg-register-info.component";
import {PgHomeBusinessmanComponent} from "./public/pages/pg-home-businessman/pg-home-businessman.component";
import {PgHomeDriverComponent} from "./public/pages/pg-home-driver/pg-home-driver.component";
import {PgVehiclesBusinessmanComponent} from "./public/pages/pg-vehicles-businessman/pg-vehicles-businessman.component";
import {PgProfileEditionComponent} from "./public/pages/pg-profile-edition/pg-profile-edition.component";
import {PgShipmentBusinessmanComponent} from "./public/pages/pg-shipment-businessman/pg-shipment-businessman.component";
import {PgReportBusinessmanComponent} from "./public/pages/pg-report-businessman/pg-report-businessman.component";
import {PgVehiclesDetailsBusinessmanComponent} from "./public/pages/pg-vehicles-details-businessman/pg-vehicles-details-businessman.component";
import {PgCreateVehicleComponent} from "./public/pages/pg-create-vehicle/pg-create-vehicle.component";
import {PgVehiclesUpdateComponent} from "./public/pages/pg-vehicles-update/pg-vehicles-update.component";


const routes: Routes = [
  {path: 'login',component: PgLoginComponent},
  {path: 'register',component: PgRegisterComponent},
  {path: 'register/successfully',component: PgRegisterSuccesComponent},
  {path: 'register/:type',component: PgRegisterInfoComponent},
  {path: ':id/home-businessman',component: PgHomeBusinessmanComponent},
  {path: ':id/home-carrier',component: PgHomeDriverComponent},
  {path:':id/vehicles-businessman',component:PgVehiclesBusinessmanComponent},
  {path:':id/shipment-businessman',component: PgShipmentBusinessmanComponent},
  {path:':id/profile',component:PgProfileEditionComponent},
  {path:':id/report-businessman',component: PgReportBusinessmanComponent},
  {path:':id/vehicles-details-businessman/:id', component: PgVehiclesDetailsBusinessmanComponent},
  {path:':id/create-vehicle-businessman',component: PgCreateVehicleComponent},
  {path:':id/vehicles-update/:id', component: PgVehiclesUpdateComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
