import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Reservation } from '../models/reservation';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Location } from '@angular/common';
import { Time } from '@angular/common';


@Component({
  selector: 'app-update-reservation',
  templateUrl: './update-reservation.component.html',
  styleUrls: ['./update-reservation.component.css']
})

export class UpdateReservationComponent implements OnInit {

  item: Reservation = new Reservation();
  route_url: Array<string> = [];
  reservationID: string;

  updateReservationForm;

  constructor(private router:Router, private location: Location, private firestore: AngularFirestore, private storage: AngularFireStorage) {
    this.route_url = this.router.url.split('/');
    this.reservationID = this.route_url[2];

    const query = this.firestore.collection<Reservation>('Reservation').doc(this.reservationID).get();

    query.subscribe( value =>{
      const data = value.data();
      
      this.item.name = data.name;
      this.item.phoneno = data.phoneno;
      this.item.ruangname = data.ruangname;
      this.item.ruangprice = data.ruangprice;
      this.item.ruangpricePer = data.ruangpricePer;
      this.item.startdate = data.startdate;
      this.item.starttime = data.starttime;
      this.item.enddate = data.enddate;
      this.item.endtime = data.endtime;
      this. item.quantity = data.quantity;
      this.item.reservationDescription = data.reservationDescription;
      this.item.total = data.total;

      this.updateReservationForm = new FormGroup({
        startdate: new FormControl(this.item.startdate),
        starttime: new FormControl(this.item.starttime),
        enddate: new FormControl(this.item.enddate),
        endtime: new FormControl(this.item.endtime),
        reservationDescription: new FormControl(this.item.reservationDescription),
      });
    
      
    });
   }

  ngOnInit(): void {
  }

  updateReservation(){
    this.item.reservationDescription = this.updateReservationForm.value.reservationDescription;
    this.item.startdate = this.updateReservationForm.value.startdate;
    this.item.starttime = this.updateReservationForm.value.starttime;
    this.item.enddate = this.updateReservationForm.value.enddate;
    this.item.endtime = this.updateReservationForm.value.endtime;

    try
    {
      this.firestore.collection('Reservation').doc(this.reservationID).update(Object.assign({}, this.item));
      window.alert("Kemaskini tempahan telah BERJAYA! ");
      this.updateReservationForm.reset();
    }

    catch (err)
    {
      console.log(err);
    }
  }
  

}
