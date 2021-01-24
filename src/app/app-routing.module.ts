import { NgModule } from '@angular/core';
import { AuthGuard } from './auth.guard';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent} from './home/home.component';
import { UserPortalComponent} from './user-portal/user-portal.component';
import { RegisterComponent} from './register/register.component';
import { LoginComponent} from './login/login.component';
import { LoginAdminComponent} from '../app/login-admin/login-admin.component';
import { UpdateUserComponent } from '../app/update-user/update-user.component';
import { InsertReservationComponent} from './insert-reservation/insert-reservation.component';
import { UpdateReservationComponent} from './update-reservation/update-reservation.component';
import { UserViewUtilitiComponent} from './user-view-utiliti/user-view-utiliti.component';
import { ViewReservationComponent} from './view-reservation/view-reservation.component';
import { ViewUtilityComponent} from './view-utility/view-utility.component';
import { AddUtilityComponent} from './add-utility/add-utility.component';
import { UpdateUtilityComponent} from './update-utility/update-utility.component';
import { AdminPortalComponent} from './admin-portal/admin-portal.component';
import { ViewUserDetailComponent} from './view-user-detail/view-user-detail.component';
import { HubungiKamiComponent} from './hubungi-kami/hubungi-kami.component';
import { PertanyaanAdminComponent} from './pertanyaan-admin/pertanyaan-admin.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { VerifyEmailAddressComponent } from './verify-email-address/verify-email-address.component';
import {} from '@angular/compiler';
import { AdminViewReservationComponent } from './admin-view-reservation/admin-view-reservation.component';
import { AdminUpdateReservationComponent } from './admin-update-reservation/admin-update-reservation.component';
//import { HubungiKamiComponent } from './hubungi-kami/hubungi-kami.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'appcomponent', component: AppComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent},
  {path: 'user-portal/:id', component: UserPortalComponent},
  {path: 'login', component: LoginComponent},
  {path: 'login-admin', component: LoginAdminComponent},
  {path: 'update-user/:id', component: UpdateUserComponent},
  {path: 'insertReservation/:ruangID', component: InsertReservationComponent},
  {path: 'updateReservation/:reservationID', component: UpdateReservationComponent},
  {path: 'user-view-utility', component: UserViewUtilitiComponent},
  {path: 'viewReservation/:id', component: ViewReservationComponent},
  {path: 'view-utility', component: ViewUtilityComponent},
  {path: 'add-utility', component: AddUtilityComponent},
  {path: 'updateProduct/:ruangID', component: UpdateUtilityComponent},
  {path: 'admin-portal', component: AdminPortalComponent},
  {path: 'view-user-detail/:id', component: ViewUserDetailComponent},
  {path: 'hubungi-kami', component: HubungiKamiComponent},
  {path: 'pertanyaan-admin', component: PertanyaanAdminComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'verify-email/:id', component: VerifyEmailComponent},
  {path: 'verify-email-address/:id', component: VerifyEmailAddressComponent},
  {path: 'admin-viewReservation', component: AdminViewReservationComponent},
  {path: 'admin-updateReservation/:id', component: AdminUpdateReservationComponent}

  //{path: 'hubungi-kami', component: HubungiKamiComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
