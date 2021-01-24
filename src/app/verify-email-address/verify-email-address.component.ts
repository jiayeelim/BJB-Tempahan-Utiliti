import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

class UserID extends User {
  id: string;
  url: string;
}

@Component({
  selector: 'app-verify-email-address',
  templateUrl: './verify-email-address.component.html',
  styleUrls: ['./verify-email-address.component.css']
})
export class VerifyEmailAddressComponent implements OnInit {

  route_url: Array<string> = [];
  user_email:  Array<string> = [null];
  users_id: Array<string> = [null];
  user_data$: Observable<User[]>;
  selectedUser$: AngularFirestoreDocument<User>;
  user: UserID;
  userList: Array<UserID> = [null];
  email: string;
  id: string;

  constructor(
    public authService: AuthService,
    public userService: UserService,
    public afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {

    this.route_url = this.router.url.split('/');
    this.id = this.route_url[2];
    console.log(this.id);

    const query = this.firestore.collection<User>('User').doc(this.id).get();

    query.subscribe(value => {
      const data = value.data();
      const id = value.id;

      this.user = new UserID();
      this.user.name = data.name;
      this.user.ic= data.ic;
      this.user.id = id;
      this.user.address1 = data.address1;
      this.user.address2 = data.address2;
      this.user.postcode = data.postcode;
      this.user.state = data.state;
      this.user.email = data.email;
      this.user.phone = data.phone;
      this.user.username = data.username;
      this.user.password = data.password;
      this.user.password2 = data.password2;
    });

   }

  ngOnInit(): void {
    this.user_data$.subscribe();
  }

}
