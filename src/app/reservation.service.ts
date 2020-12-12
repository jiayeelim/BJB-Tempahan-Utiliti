import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class ReservationService {

    constructor(public fireservices:AngularFirestore) { }
  
    create_newReservation(Reservation)
    {
      return this.fireservices.collection('Reservation').add(Reservation);
    }
  }