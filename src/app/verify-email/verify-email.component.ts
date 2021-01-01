import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
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

  user: User = new User();
  users: UserID;
  userList: Array<UserID> = [null];
  route_url: Array<string> = [];
  selectedUser$: AngularFirestoreDocument<User>;
  username: string;
  id: string;
  updatePasswordForm;

  constructor(
    private router: Router,
    private firestore: AngularFirestore,
    public authService: AuthService) {

    this.route_url = this.router.url.split('/');
    this.id = this.route_url[2];

    const query = this.firestore.collection<User>('User').doc(this.id).get();

    query.subscribe(value => {
      const data = value.data();

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
      this.user.password2 = data.password2;

      this.updatePasswordForm = new FormGroup({
        password: new FormControl(this.user.password),
        password2: new FormControl(this.user.password),
    });
  });
  }

  ngOnInit(): void {
  }

  updatePassword(){
    if(this.updatePasswordForm.value.password == this.updatePasswordForm.value.password2){
      this.user.password = this.updatePasswordForm.value.password;

    try{
      this.firestore.collection('User').doc(this.id).update(Object.assign({}, this.user));
      window.alert("Kata Laluan telah Dikemas Kini!");
      this.router.navigate(['/login']);
      this.updatePasswordForm.reset();
    }catch(err){
      window.alert("Sila Isikan Maklumat yang Tepat");
    }
  }
  else{
    window.alert("Kata Laluan mesti sepandan");
  }
}

}
