import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { InsertReservationComponent } from './insert-reservation/insert-reservation.component';
import { UpdateReservationComponent } from './update-reservation/update-reservation.component';
import { ViewReservationComponent } from './view-reservation/view-reservation.component';
//import { SizeDetectorComponent } from './size-detector/size-detector.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HomeComponent,
    LoginComponent,
    InsertReservationComponent,
    UpdateReservationComponent,
    ViewReservationComponent,
    //SizeDetectorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
