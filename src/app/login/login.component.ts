import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../login';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: Login = { username: "admin", password: "1234" };
  loginForm: FormGroup;
  message?: string;
  returnUrl?: string;
  submitted?: false;

  constructor(private formBuilder: FormBuilder,private router: Router, public authService: AuthService) { }

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
      else{
        this.message = "Anda telah memasukkan ID Pengguna atau Kata Laluan yang tidak sah.";
      }
    }
  }

}
