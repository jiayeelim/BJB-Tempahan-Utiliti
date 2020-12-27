import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';
import { User } from '../models/user';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

class UserID extends User {
  id: string;
  url: string;
}

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
  submitted: false;

  user_username:  Array<string> = [null];
  user_password:  Array<string> = [null];
  users_id: Array<string> = [null];
  user_data$: Observable<User[]>;
  selectedUser$: AngularFirestoreDocument<User>;
  name: string;

  user: UserID;
  userList: Array<UserID> = [null];
  username: string;
  route_url: Array<string> = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router, 
    public authService: AuthService,
    public userService: UserService,
    private firestore: AngularFirestore) {

      this.user_username.pop();
      this.user_password.pop();
      this.users_id.pop();
      this.userList.pop();

      const query = this.userService.getUserID().ref;
      query.onSnapshot( doc => {
      doc.forEach( documentSnapshot => {
        this.selectedUser$ = this.firestore.doc(documentSnapshot.ref);
        this.selectedUser$.snapshotChanges().subscribe( value => {
          const data = value.payload.data();
          const id = value.payload.id;

          this.user = new UserID();
          this.user.id = id;
          this.user.name = data.name;
          this.user.ic= data.ic;
          this.user.address1 = data.address1;
          this.user.address2 = data.address2;
          this.user.postcode = data.postcode;
          this.user.state = data.state;
          this.user.email = data.email;
          this.user.phone = data.phone;
          this.user.username = data.username;
          this.user.password = data.password;

          this.userList.push(this.user);
        });
        })
      });

      this.user_data$ = this.authService.getUserData().snapshotChanges().pipe(
        map(changes => changes.map(a =>{
          const data = a.payload.doc.data() as User;
          const id = a.payload.doc.id;

          this.user = new UserID();
          this.user.id = id;
          this.user_username.push(data.username);
          this.user_password.push(data.password);
          this.users_id.push(id);

          //return data;
          //.users_id.push(id);
          console.log(data.username)
          console.log(id)
          return {id,...data};
     })));

    }

  ngOnInit(): void{
    this.user_data$.subscribe();
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
          window.alert("Berjaya Log Masuk!!")
          this.router.navigate(['/user-portal',this.users_id[i]]);

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
            const id = value.payload.id;

            this.user = new UserID();
            this.user.id = id;
            this.name = data.name;
            localStorage.setItem('name',data.name);
            // console.log(data.name);
  
            this.userList.push(this.user);
            this.router.navigate(['/user-portal']);
            console.log("Pengguna telah berjaya Log Masuk!");
          });
        })
      });

    }
 
    // stop here if form is invalid
   
  }


