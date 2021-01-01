import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  constructor(
    public authService: AuthService,
    public userService: UserService,
    private firestore: AngularFirestore,
    private router: Router) {

      this.user_data$ = this.authService.getUserData().snapshotChanges().pipe(
        map(changes => changes.map(a =>{
          const data = a.payload.doc.data() as User;
          const id = a.payload.doc.id;

          this.user_email.push(data.email);
          this.users_id.push(id);

          console.log(data.email)
          console.log(id)
          return {id,...data};
     })));

    }

  ngOnInit(): void {
    this.user_data$.subscribe();
  }

  forgotpassword(){
    let status: boolean;
    status = false;

    for(let i=0; i<this.users_id.length; i++){
      if(this.forgotpasswordForm.value.email == this.user_email[i]){
        status = true;
        window.alert("Veritation Email Sent!!")
        console.log(this.users_id[i]);
        this.router.navigate(['/verify-email', this.users_id[i]]);
      }
    }

    if(!status){
      window.alert("Error Email!");
    }
      this.forgotpasswordForm.reset();
  }

}
