import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(public fireservices:AngularFirestore) { }

  create_newUser(User){
    return this.fireservices.collection('Users').add(User);
  }
}
