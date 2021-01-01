import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router, ActivatedRoute} from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from '../models/user';

class UserID extends User {
  id: string;
  url: string;
}

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  user: UserID;
  userList: Array<UserID> = [null];
  route_url: Array<string> = [];
  selectedUser$: AngularFirestoreDocument<User>;
  username: string;
  id: string;

  constructor(
    private router: Router,
    private firestore: AngularFirestore,
    public authService: AuthService) {

    this.route_url = this.router.url.split('/');
    this.id = this.route_url[2];

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
  }

}
