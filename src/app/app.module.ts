import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'; 
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HttpClientModule } from '@angular/common/http';
import {} from '@angular/compiler';
import { FormsModule } from '@angular/forms';

import { AngularFireModule} from '@angular/fire';
import { AngularFireDatabaseModule} from '@angular/fire/database';
import { environment} from '../environments/environment';
import { AngularFirestoreModule} from '@angular/fire/firestore';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireStorageModule} from '@angular/fire/storage';

import { AppRoutingModule } from './app-routing.module';
//Component
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { InsertReservationComponent } from './insert-reservation/insert-reservation.component';
import { UpdateReservationComponent } from './update-reservation/update-reservation.component';
import { ViewReservationComponent } from './view-reservation/view-reservation.component';
import { UserPortalComponent } from './user-portal/user-portal.component';
import { AdminPortalComponent } from './admin-portal/admin-portal.component';
import { UserViewUtilitiComponent } from './user-view-utiliti/user-view-utiliti.component';
import { ViewUtilityComponent} from './view-utility/view-utility.component';
import { AddUtilityComponent} from './add-utility/add-utility.component';
import { UpdateUtilityComponent} from './update-utility/update-utility.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { HubungiKamiComponent } from './hubungi-kami/hubungi-kami.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { ViewUserDetailComponent } from './view-user-detail/view-user-detail.component';
import { PertanyaanAdminComponent } from './pertanyaan-admin/pertanyaan-admin.component'

//Module
import { ReactiveFormsModule } from '@angular/forms';
//Service
import { RegisterService } from './service/register.service';
import { RuangService } from './service/ruang.service';
import { ReservationService } from './service/reservation.service';
import { AuthService } from "./service/auth.service";
import { UserService } from './service/user.service';
import { HubungiKamiService } from './service/hubungi-kami.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { AdminViewReservationComponent } from './admin-view-reservation/admin-view-reservation.component';
import { AdminUpdateReservationComponent } from './admin-update-reservation/admin-update-reservation.component';
import { VerifyEmailAddressComponent } from './verify-email-address/verify-email-address.component';
//import { HubungiKamiComponent } from './hubungi-kami/hubungi-kami.component';
//import { SizeDetectorComponent } from './size-detector/size-detector.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HomeComponent,
    LoginComponent,

    InsertReservationComponent,
    UpdateReservationComponent,
    ViewReservationComponent,

    UserPortalComponent,
    AdminPortalComponent,

    UserViewUtilitiComponent,
    ViewUtilityComponent,
    AddUtilityComponent,
    UpdateUtilityComponent,
    LoginAdminComponent,
    UpdateUserComponent,
    ViewUserDetailComponent,
    HubungiKamiComponent,
    PertanyaanAdminComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    AdminViewReservationComponent,
    AdminUpdateReservationComponent,
    VerifyEmailAddressComponent,
    //HubungiKamiComponent,

    //PasswordPatternDirective,
    //MatchPasswordDirective,
    //ValidateUserNameDirective

    //SizeDetectorComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  providers: [AuthGuard, RegisterService, RuangService, AuthService, UserService, HubungiKamiService, ReservationService],
  bootstrap: [AppComponent]

})
export class AppModule { }
