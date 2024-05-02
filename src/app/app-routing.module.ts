import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PgLoginComponent} from "./public/pages/pg-login/pg-login.component";
import {PgRegisterComponent} from "./public/pages/pg-register/pg-register.component";
import {PgRegisterSuccesComponent} from "./public/pages/pg-register-succes/pg-register-succes.component";
import {PgRegisterInfoComponent} from "./public/pages/pg-register-info/pg-register-info.component";
import {SidebarPublicComponent} from "./public/components/sidebar-public/sidebar-public.component";
import {PgHomeBusinessmanComponent} from "./public/pages/pg-home-businessman/pg-home-businessman.component";
import {PgHomeDriverComponent} from "./public/pages/pg-home-driver/pg-home-driver.component";


const routes: Routes = [
  {path: 'login',component: PgLoginComponent},
  {path: 'register',component: PgRegisterComponent},
  {path: 'register/successfully',component: PgRegisterSuccesComponent},
  {path: 'register/:type',component: PgRegisterInfoComponent},
  {path: 'sidebarViewTemporalPath/:id',component: SidebarPublicComponent},
  {path: 'Home-businessman',component: PgHomeBusinessmanComponent},
  {path: 'Home-driver',component: PgHomeDriverComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
