import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router, ActivatedRoute} from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from '../models/user';
import { UserService } from '../service/user.service';

class UserID extends User {
  id: string;
  url: string;
}

@Component({
  selector: 'app-user-portal',
  templateUrl: './user-portal.component.html',
  styleUrls: ['./user-portal.component.css']
})
export class UserPortalComponent implements OnInit {

  //user: User = new User();
  user: UserID;
  userList: Array<UserID> = [null];
  route_url: Array<string> = [];
  selectedUser$: AngularFirestoreDocument<User>;
  username: string;
  id: string;
  name: string;

  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    private firestore: AngularFirestore,
    public userService: UserService,
    public authService: AuthService) {

      if(this.isLoggedIn()) {
        this.name = localStorage.getItem('name');
        this.id = localStorage.getItem('id');
      }

    this.userList.pop();

    this.route_url = this.router.url.split('/');
    this.id = this.route_url[2];
    console.log(this.id);
    //console.log(this.user.name);

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

  isLoggedIn(){
    if(localStorage.getItem('isLoggedIn') == "true"){
      return true;
    }
    else{
    window.alert('Sila log masuk.');
    this.router.navigate(['/login']);
    }
  }

  logout(){

    var selection = confirm("Adakah anda pasti log keluar?");
    if(selection == true){
    console.log("Logout");
    this.authService.logout();
    this.router.navigate(['']);
  }}

}
