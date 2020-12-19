import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../login';
import { AuthService } from '../auth.service';
import { User } from '../models/user';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  model: Login = { username: "admin", password: "1234" };
  loginForm: FormGroup;
  message: string;
  returnUrl?: string;
  submitted?: false;

  user_username:  Array<string> = [""];
  user_password:  Array<string> = [""];
  users_id: Array<string> = [""];
  user_data$: Observable<User[]>;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router, 
    public authService: AuthService) {

      this.user_username.pop();
      this.user_password.pop();
      this.users_id.pop();

      /*this.user_data$ = this.authService.getUserData().snapshotChanges().pipe(
        map((changes: any[]) => changes.map(a =>{
          const data = a.payload.doc.data() as User;
          const id = a.payload.doc.id;

          this.user_username.push(data.username);
          this.user_password.push(data.password);

          //return data;
          //.users_id.push(id);

           return <any>{id,...data};
     })));*/
    }

  ngOnInit(){
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.returnUrl = '/admin-portal';
    this.authService.logout();

  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  login() {

    let status: boolean;
    status = false;

    for(let i=0; i < this.user_username.length; i++){
      if(this.loginForm.value.username == this.user_username[i]){
        if(this.loginForm.value.password == this.user_password[i]){
          status = true;
        }
      }
    }

    if(status){
      
      // store user session in Local Storage
      localStorage.setItem('isLoggedIn','true');
      localStorage.setItem('token',this.loginForm.value.username);
      this.router.navigate(['/admin-portal']);
    }
    else{
      // If there is no any match account, report to users
      this.message = "Incorrect email or password.";
      // console.log("Opps. There is no match to any backend data.");
    }
    
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    else{
      if(this.f.username.value == this.model.username && this.f.password.value == this.model.password){
        console.log("Login successful");
        //this.authService.authLogin(this.model);
        localStorage.setItem('isLoggedIn', "true");
        localStorage.setItem('token', this.f.username.value);
        this.router.navigate([this.returnUrl]);
      }
      //else if(this.f.username.value == this.){

      //}
      else{
        this.message = "Anda telah memasukkan ID Pengguna atau Kata Laluan yang tidak sah.";
      }
    }
  }

}
