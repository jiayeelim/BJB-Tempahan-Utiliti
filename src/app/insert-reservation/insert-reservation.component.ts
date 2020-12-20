import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { ReservationService } from '../service/reservation.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormControl } from '@angular/forms';
import {Reservation } from '../models/reservation';
import { Observable } from 'rxjs';
import { Ruang } from '../models/ruang';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-insert-reservation',
  templateUrl: './insert-reservation.component.html',
  styleUrls: ['./insert-reservation.component.css']
})
export class InsertReservationComponent implements OnInit {
  
      createReservationForm = new FormGroup({
        reservationDescription: new FormControl(''),
        startdate: new FormControl(''),
        starttime: new FormControl(''),
        enddate: new FormControl(''),
        endtime:new FormControl(''),
       // message: void;
        //ruangprice:new FormControl(''),
        //ruangname: new FormControl(''),
        //rate:number;
        //discount:number;
        //total:number;
        //name: string;
        //phoneno: number;
      });

      newReservation: Reservation =  new Reservation();
 
      ruangData$: Observable <Ruang[]> ;
  

  constructor(public af:AngularFireStorage, public reservationService:ReservationService, public firebase:AngularFirestore) { }

  addNewReservation()
  {
    this.newReservation.name = localStorage.getItem('name');
    this.newReservation.phoneno = localStorage.getItem('phone');
    this.newReservation.reservationDescription = this.createReservationForm.value.reservationDescription;
    this.newReservation.startdate = this.createReservationForm.value.startdate;
    this.newReservation.starttime = this.createReservationForm.value.starttime;
    this.newReservation.enddate = this.createReservationForm.value.enddate;
    this.newReservation.endtime = this.createReservationForm.value.endtime;


    try
    {
      this.createNewReservation()
    }

    catch (err)
    {
      console.log(err);
    }


  }

  createNewReservation()
  {
    this.reservationService.newReservationData().add(Object.assign({},this.newReservation)).then(()=>{
      window.alert("Tempahan Ruang telah BERJAYA! ");
      this.createReservationForm.reset();
    })
  }
  

  ngOnInit(): void 
  {

  }


}
