import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
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
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotpasswordForm = new FormGroup({
    email: new FormControl(''),
  });

  user_email:  Array<string> = [null];
  users_id: Array<string> = [null];
  user_data$: Observable<User[]>;
  selectedUser$: AngularFirestoreDocument<User>;
  user: UserID;
  userList: Array<UserID> = [null];
  email:string;

  constructor(
    public authService: AuthService,
    public userService: UserService,
    public afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router) {

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

    }

  ngOnInit(): void {
    //this.user_data$.subscribe();
  }

  forgotpassword(passwordResetEmail){
    let status: boolean;
    status = false;

    for(let i=0; i<this.users_id.length; i++){
      if(this.forgotpasswordForm.value.email == this.user_email[i]){
        status = true;
        
        window.alert("E-mel Pengesahan Berjaya Dihantarkan !!")
        console.log(this.users_id[i]);
        //this.router.navigate(['/auth']);
        this.router.navigate(['/verify-email', this.users_id[i]]);
      }
    }

    if(!status){
      window.alert("Error Email!");
    }
      this.forgotpasswordForm.reset();
  }

  forgotPassword(passwordResetEmail) {
    
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
          window.alert('Password reset email sent, check your inbox.');
          this.router.navigate(['/verify-email-address']);
    }).catch((error) => {
      window.alert(error)
    })
  }

}
