import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireObject, AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  userRef: AngularFireObject<any>;

  constructor(public fireservices:AngularFirestore, private firebase:AngularFireDatabase, private router: Router) { }

  getUserID(){
    //return this.fireservices.collection('User').snapshotChanges();
    return this.fireservices.collection<User>('User');
  }

  isLoggedIn(){
    if(localStorage.getItem('isLoggedIn') == "true"){
      return true;
    }

    return false;
  }

  updateUser(user: User){
    this.userRef.update({
      address1: user.address1,
      address2: user.address2,
      state: user.state,
      postcode: user.postcode,
      phone: user.phone,
      email: user.email
    })
  }

  getUser(id: string){
    this.userRef = this.firebase.object('view-user-detail/' + id);
    return this.userRef;
  }

  logout() : void {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('token');
    localStorage.removeItem('name');
  }

}


