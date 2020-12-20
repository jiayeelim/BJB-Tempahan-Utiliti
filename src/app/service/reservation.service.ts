import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Reservation } from '../models/reservation';


@Injectable({
  providedIn: 'root'
})

export class ReservationService {

    constructor(public fireservices:AngularFirestore) { }
  
    newReservationData()
    {
      return this.fireservices.collection<Reservation>('Reservation');
    }
  }