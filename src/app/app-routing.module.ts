import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import {HomeComponent} from './home/home.component';
import {UserPortalComponent} from './user-portal/user-portal.component';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {InsertReservationComponent} from './insert-reservation/insert-reservation.component';
import {UpdateReservationComponent} from './update-reservation/update-reservation.component';
import {UserViewUtilitiComponent} from './user-view-utiliti/user-view-utiliti.component';
import {ViewReservationComponent} from './view-reservation/view-reservation.component';
import {ViewUtilityComponent} from './view-utility/view-utility.component';
import {AddUtilityComponent} from './add-utility/add-utility.component';
import {UpdateUtilityComponent} from './update-utility/update-utility.component';
import {AdminPortalComponent} from './admin-portal/admin-portal.component';

const routes: Routes = [
  {path:'appcomponent', component: AppComponent},
  {path:'register', component: RegisterComponent},
  {path:'home', component: HomeComponent},
  {path:'user-portal', component: UserPortalComponent},
  {path:'login', component: LoginComponent},
  {path:'insertReservation', component: InsertReservationComponent},
  {path:'updateReservation', component: UpdateReservationComponent},
  {path:'user-view-utility', component: UserViewUtilitiComponent},
  {path:'viewReservation', component: ViewReservationComponent},
  {path:'viewUtility', component: ViewUtilityComponent},
  {path:'addUtility', component: AddUtilityComponent},
  {path:'updateUtility', component: UpdateUtilityComponent},
  {path:'adminPortal', component: AdminPortalComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
