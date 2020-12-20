import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public fireservices:AngularFirestore, private firebase:AngularFireDatabase, private router: Router) { }

  getUserID(){
    return this.fireservices.collection('User').snapshotChanges();
  }

  isLoggedIn(){
    if(localStorage.getItem('isLoggedIn') == "true"){
      return true;
    }

    return false;
  }

  logout() : void {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    //this.router.navigate(['/home']);
  }

}


