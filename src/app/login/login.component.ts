import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { User } from '../models/user';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  //loginForm: FormGroup;

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  message: string;
  returnUrl: string;
  submitted?: false;

  user_username:  Array<string> = [null];
  user_password:  Array<string> = [null];
  users_id: Array<string> = [null];
  user_data$: Observable<User[]>;
  selectedUser$: AngularFirestoreDocument<User>;
  name: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router, 
    public authService: AuthService,
    private firestore: AngularFirestore) {

      this.user_username.pop();
      this.user_password.pop();
      this.users_id.pop();

      this.user_data$ = this.authService.getUserData().snapshotChanges().pipe(
        map(changes => changes.map(a =>{
          const data = a.payload.doc.data() as User;
          const id = a.payload.doc.id;

          this.user_username.push(data.username);
          this.user_password.push(data.password);
          this.users_id.push(id);

          //return data;
          //.users_id.push(id);
          console.log(data.username)
           return {id,...data};
     })));
    }

  ngOnInit(): void{
    /*this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });*/
    this.user_data$.subscribe();
    //this.returnUrl = "";
    this.authService.logout();

  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  login() {

    let status: boolean;
    status = false;

    for(let i=0; i < this.users_id.length; i++){
      if(this.loginForm.value.username == this.user_username[i]){
        if(this.loginForm.value.password == this.user_password[i]){
          status = true;

          // store user session in Local Storage
          localStorage.setItem('isLoggedIn','true');
          localStorage.setItem('token',this.loginForm.value.username);
          this.router.navigate(['/user-portal']);

          this.getUsername(this.user_username[i]);
        }
      }
    }

    if(!status){
      this.message = "Anda telah memasukkan ID Pengguna atau Kata Laluan yang tidak sah.";
    }

    this.loginForm.reset();
  }

    getUsername(username: string){
      const query = this.authService.getUserData().ref.where("username", "==", username);

      query.onSnapshot( doc => {
        doc.forEach( documentSnapshot => {
          this.selectedUser$ = this.firestore.doc(documentSnapshot.ref);
          this.selectedUser$.snapshotChanges().subscribe( value => {
            const data = value.payload.data();
            this.name = data.name;
            localStorage.setItem('name',data.name);
            // console.log(data.name);
  
            this.router.navigate(['/user-portal']);
            console.log("Pengguna telah berjaya Log Masuk!");
          });
        })
      });

    }
 
    // stop here if form is invalid
   
  }


