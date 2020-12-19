import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegisterService } from '../register.service';
import { FormBuilder, FormGroup, Validators, FormControl  } from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from '../models/user';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestoreCollection } from '@angular/fire/firestore';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  //registerForm: FormGroup;

  registerForm = this.formBuilder.group({
    name: ['',Validators.required],
    username: ['',[Validators.required]],
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

  /*registerForm = new FormGroup({
    name: new FormControl(''),
    username: new FormControl(''),
    ic: new FormControl(''),
    address1: new FormControl(''),
    address2: new FormControl(''),
    postcode:new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    state: new FormControl(''),
    password: new FormControl(''),
    password2: new FormControl(''),
    resident: new FormControl(''),
  });*/

  user_username: Array<string> = [null];
  user_data$: Observable<User[]>;
  newUser: AngularFirestoreCollection<User>;
  UserData: User = new User();
  returnUrl: string;

  submitted = false;
  stateList: any = ['Johor', 'Kedah', 'Kelantan', 'Malacca', 'Negeri Sembilan', 'Pahang', 'Penang', 'Perak', 'Sabah', 'Sarawak', 'Selangor', 'Terengganu']

  constructor(
    public activatedRoute: ActivatedRoute, 
    public registerService:RegisterService, 
    private formBuilder: FormBuilder,
    public authService: AuthService
    ) {
      this.user_username.pop();
      this.newUser = this.registerService.newUserData();

      this.user_data$ = this.newUser.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as User;
          const id = a.payload.doc.id;
  
          // store all data in parallel arrays
          this.user_username.push(data.username);
          
          // console.log(data.email);
          // console.log(id);
          return{id,...data};
        }))
      );    
     }

  /*user: any;
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
}*/

ngOnInit(): void{
  this.user_data$.subscribe(); 
  this.returnUrl = '/admin-portal';
  }

  registerNewUser(){
    let status: boolean;
    status = true;

    for(let i=0; i<this.user_username.length; i++){
      if(this.registerForm.value.username == this.user_username[i]){
        status = false;
      }
    }

    if(status){
      if(this.registerForm.value.password == this.registerForm.value.password2){
        this.UserData.username = this.registerForm.value.username;
        this.UserData.password = this.registerForm.value.password;
        this.UserData.name = this.registerForm.value.name;
        this.UserData.ic = this.registerForm.value.ic;
        this.UserData.address1 = this.registerForm.value.address1;
        this.UserData.address2 = this.registerForm.value.address2;
        this.UserData.postcode = this.registerForm.value.postcode;
        this.UserData.state = this.registerForm.value.state;
        this.UserData.resident = this.registerForm.value.resident;
        this.UserData.email = this.registerForm.value.email;
        this.UserData.phone = this.registerForm.value.phone;

        try{
          this.newUser.add(Object.assign({}, this.UserData)).then( () => {
            window.alert("Anda teleh berjaya didaftarkan!");
            this.registerForm.reset();
            this.returnUrl['/user-portal'];
            window.close();
          }, () => {
            window.alert("Minta Maaf. Pendaftaran Tak Berjaya");
            this.registerForm.reset();
            window.close();
          });
        }  
        catch (err){
          console.log(err);
         }
        }
        else{
          window.alert("Kata Laluan mesti sepandan");
        }
      }
      else{
        window.alert("Minta Maaf. Nama Pengguna Ini Telah Digunakan");
      }
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