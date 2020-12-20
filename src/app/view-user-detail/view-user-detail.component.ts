import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-view-user-detail',
  templateUrl: './view-user-detail.component.html',
  styleUrls: ['./view-user-detail.component.css']
})
export class ViewUserDetailComponent implements OnInit {

  user: User = new User();
  route_url: Array<string> = [];
  id: string;
  message: string;
  username: string;
  
  selectedUser$: AngularFirestoreDocument<User>;

  constructor(
    private router:Router,
    private firestore: AngularFirestore) {

    this.route_url = this.router.url.split('/');
    this.id = this.route_url[2];
    
    console.log(this.route_url);
    console.log(this.id);

    this.username = localStorage.getItem('token');

    const query = this.firestore.collection<User>('User').ref.where('username', '==', this.user.username);

    query.onSnapshot( doc => {
      doc.forEach( documentSnapshot => {
        this.selectedUser$ = this.firestore.doc(documentSnapshot.ref);
        this.selectedUser$.snapshotChanges().subscribe( value => {
          const data = value.payload.data();
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
        });
        });
      });
  }  

  ngOnInit(): void {
  }

}
