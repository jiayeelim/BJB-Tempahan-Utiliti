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
  submitted = false;
  stateList: any = ['Johor', 'Kedah', 'Kelantan', 'Malacca', 'Negeri Sembilan', 'Pahang', 'Penang', 'Perak', 'Sabah', 'Sarawak', 'Selangor', 'Terengganu']

  constructor(public activatedRoute: ActivatedRoute, public registerService:RegisterService, private formBuilder: FormBuilder) { }

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
  resident: string;

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
    User['resident'] = this.resident;

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
      this.resident = "";
      console.log(res);
      this.message = alert("User data save DONE");

  }).catch(error => {
    console.log(error);
  });
}

ngOnInit(){
  this.registerForm = this.formBuilder.group({
    name: ['',Validators.required],
    username: ['',[Validators.required],this.registerService.userNameValidator.bind(this.registerService)],
    ic: ['', Validators.compose([Validators.required, Validators.minLength(12), Validators.maxLength(12)])],
    address1: ['', [Validators.required]],
    address2: ['', [Validators.required]],
    postcode: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    state: ['', [Validators.required]],
    password: ['', Validators.compose([Validators.required, this.registerService.patternValidator()])],
    password2: ['', [Validators.required]],
    resident: ['', [Validators.required]],
  }, {
    validator: this.registerService.MatchPassword('password', 'comfirmPassword')
  })
}

get registerFormControl() {return this.registerForm.controls;}

onSubmit() {
  this.submitted = true;
  if (this.registerForm.valid) {
    alert('Form Submitted succesfully!!!\n Check the values in browser console.');
    console.table(this.registerForm.value);
  }
}
}