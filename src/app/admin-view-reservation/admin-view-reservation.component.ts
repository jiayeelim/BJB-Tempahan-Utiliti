import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../service/reservation.service';
import { Router } from '@angular/router';
import { Reservation } from '../models/reservation';
import { Time } from '@angular/common';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Injectable } from '@angular/core';

class ReservationWithId extends Reservation{
  id: string;
  url: string;
}

@Component({
  selector: 'app-admin-view-reservation',
  templateUrl: './admin-view-reservation.component.html',
  styleUrls: ['./admin-view-reservation.component.css']
})
export class AdminViewReservationComponent implements OnInit {

  name: string;

  reserveService;

  selectedReservation$: AngularFirestoreDocument<Reservation>;
  reservation: ReservationWithId;
  reservationList: Array<ReservationWithId> = [null];

  constructor(private router:Router, private reservationService: ReservationService, 
    private firestore: AngularFirestore, private storage: AngularFireStorage) {
      this.reservationList.pop();

      this.reserveService = this.reservationService;

      const query = this.reservationService.getReservationData().ref;
      query.onSnapshot( doc => {
        doc.forEach( documentSnapshot =>{
          this.selectedReservation$ = this.firestore.doc(documentSnapshot.ref);
          this.selectedReservation$.snapshotChanges().subscribe( value => {
            const data = value.payload.data();
            const id= value.payload.id;

            this.reservation = new ReservationWithId();
            this.reservation.id = id;
            this.reservation.name = data.name;
            //console.log(this.reservation.id);
           // this.reservationService.getReserveID(this.reservation.name);
            this.reservation.phoneno = data.phoneno;
            this.reservation.quantity = data.quantity;
            this.reservation.reservationDescription = data.reservationDescription;
            this.reservation.ruangname = data.ruangname;
            this.reservation.ruangprice = data.ruangprice;
            this.reservation.ruangpricePer = data.ruangpricePer;
            this.reservation.startdate = data.startdate.toDate();
            this.reservation.enddate = data.enddate.toDate();
            this.reservation.discount = data.discount;
            this.reservation.total =data.total;
            this.reservation.status = data.status;
            this.reservation.reason = data.reason;

            this.reservationList.push(this.reservation);
            
          });
        })
      });
     }

  ngOnInit(): void {
  }

  deleteReservation(reserveID){
    var selection = confirm("Adakah anda pasti untuk padam tempahan ini?");
    if(selection == true){
      //console.log(reserveID);
      //this.reserveService.deleteReservation(this.reservationService.reservationlistID,reserveID);
      this.firestore.collection<Reservation>('Reservation').doc(reserveID).delete();
      window.location.reload();
  }
  }

  updateReservation(reservationID){
  this.router.navigate(['/admin-updateReservation', reservationID]);
  } 

}
