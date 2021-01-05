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


  /*isLoggedIn(){
    if(localStorage.getItem('isLoggedIn') == "true"){
      return true;
    }

    return false;
  }*/

  SendVerificationMail() {
    return this.afAuth.currentUser
    .then(u => u.sendEmailVerification())
    .then(() => {
      this.router.navigate(['verify-email']);
    })
  }

  forgotPassword(passwordResetEmail) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email sent, check your inbox.');
    }).catch((error) => {
      window.alert(error)
    })
  }

  SetUserData(user){
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.id}`);
    const userData: User = {
      id: user.id,
      name: user.name,
      ic: user.ic,
      address1: user.address1,
      address2: user.address2,
      email: user.email,
      password: user.password,
      password2: user.password2,
      phone: user.phobe,
      postcode: user.postcode,
      resident: user.resident,
      state: user.state,
      username: user.username,
      emailVerifird: user.emailVerifird,
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  // Sign out 
  logout() {
    /*return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    })*/
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
