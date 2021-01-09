import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserService } from '../service/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../models/user';
import { Location } from '@angular/common';

class UserID extends User {
  id: string;
  url: string;
}

@Component({
  selector: 'app-view-user-detail',
  templateUrl: './view-user-detail.component.html',
  styleUrls: ['./view-user-detail.component.css']
})
export class ViewUserDetailComponent implements OnInit {

  users: User = new User();
  user: UserID;
  userList: Array<UserID> = [null];
  username: string;
  selectedUser$: AngularFirestoreDocument<User>;
  route_url: Array<string> = [];
  id: string;

  constructor(
    private router:Router,
    private firestore: AngularFirestore,
    private location: Location, 
    public userService: UserService) {

    this.route_url = this.router.url.split('/');
    this.id = this.route_url[2];
    console.log(this.id);

      this.username = localStorage.getItem('token');
      
      //var userID = firestore.collection('User');
      //var query = userID.ref.where("username", "==", this.username);
      this.userList.pop();

      /*firestore.collection('User').ref.where("username", "==", this.username)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          console.log(doc.id, "=>", doc.data());
        });
      })
      .catch(function(error){
        console.log("Error", error);
      });*/

    //const query = this.firestore.collection<User>('User').ref.where('username', '==', this.username);
    const query = this.userService.getUserID().ref;
    const query_ = this.firestore.collection<User>('User').doc(this.id).get();

    query_.subscribe( value => {
      const data = value.data();

      this.users.name = data.name;
      this.users.ic= data.ic;
      this.users.address1 = data.address1;
      this.users.address2 = data.address2;
      this.users.postcode = data.postcode;
      this.users.state = data.state;
      this.users.email = data.email;
      this.users.phone = data.phone;
      this.users.username = data.username;
      this.users.password = data.password;
      this.users.password2 = data.password2;
      this.user.resident = data.resident;
    })

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
          this.user.resident = data.resident;

          this.userList.push(this.user);
        });
        })
      });
  }  

  back(){
    this.location.back();
  }

  ngOnInit(){ 
  }

}
