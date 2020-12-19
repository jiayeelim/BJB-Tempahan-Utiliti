import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Login } from '../login';
import { AuthService } from '../auth.service';
import { User } from '../models/user';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  model: Login = { username: "admin", password: "1234" };
  loginAdminForm: FormGroup;
  message: string;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public authService: AuthService, 
    ) { }

  ngOnInit(): void {
    this.loginAdminForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.returnUrl = "/admin-portal";
    this.authService.logout();
  }

  get f() { return this.loginAdminForm.controls; }

  loginAdmin(){
   if (this.loginAdminForm.invalid) {
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
