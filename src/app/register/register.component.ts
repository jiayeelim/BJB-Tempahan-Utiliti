import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegisterService } from '../register.service';
import { FormBuilder, FormGroup, Validators, FormControl  } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{

  registerForm: FormGroup;
  submitted = true;

  constructor(public activatedRoute: ActivatedRoute, public registerService:RegisterService) { }

  user: any;
  username: string;
  password: string;
  password2: string;
  name: string;
  ic: number | undefined;
  address1: string;
  address2: string;
  postcode: number | undefined;
  state: string;
  email: string;
  phone: number | undefined;
  message: void;

  ngOnInit(){
  }

  CreateUser(){
    let User = {};
    User['name'] = this.name;
    User['username'] = this.username;
    User['password'] = this.password;
    User['password2'] = this.password2;
    User['ic'] = this.ic;
    User['address1'] = this.address1;
    User['address2'] = this.address2;
    User['postcode'] = this.postcode;
    User['state'] = this.state;
    User['email'] = this.email;
    User['phone'] = this.phone;

    this.registerService.create_newUser(User).then(res =>{
      this.username = "";
      this.password = "";
      this.password2 = "";
      this.name = "";
      this.email = "";
      this.phone = undefined;
      this.ic = undefined;
      this.postcode = undefined;
      this.state = "";
      console.log(res);
      this.message = alert("User data save DONE");

  }).catch(error => {
    console.log(error);
  });
}
}