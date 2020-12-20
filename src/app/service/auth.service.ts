import { Injectable, NgZone } from '@angular/core';
import { User } from '../models/user';
//import { auth } from '../../node_modules/@firebase/auth';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any; // Save logged in user data
  
  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,  
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
     /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user') || '{}');
      } else {
        localStorage.setItem('user', '');
        JSON.parse(localStorage.getItem('user') || '{}');
      }
    })
   }

  getUserData() {
    return this.afs.collection<User>('User');
  }


  isLoggedIn(){
    if(localStorage.getItem('isLoggedIn') == "true"){
      return true;
    }

    return false;
  }

  // Sign out 
  logout() : void {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('token');
    localStorage.removeItem('name');
  }
}
