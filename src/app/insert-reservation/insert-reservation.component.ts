import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { ReservationService } from '../service/reservation.service';

@Component({
  selector: 'app-insert-reservation',
  templateUrl: './insert-reservation.component.html',
  styleUrls: ['./insert-reservation.component.css']
})
export class InsertReservationComponent implements OnInit {
  
      reservationDescription: string;
      startdate: Date | undefined;
      starttime: Time | undefined;
      enddate: Date | undefined;
      endtime:Time | undefined;
      message: void;
      //price:number;
      //rate:number;
      //discount:number;
      //total:number;
  

  constructor(public af:AngularFireStorage, public reservationService:ReservationService) { }


  CreateReservation()
  {
    let Reservation = {};
    Reservation['tempahandescription'] = this.reservationDescription;
    Reservation['startdate'] = this.startdate;
    Reservation['starttime'] = this.starttime;
    Reservation['enddate'] = this.enddate;
    Reservation['endtime'] = this.endtime;

    this.reservationService.create_newReservation(Reservation).then(res =>{

      this.reservationDescription="";
      this.startdate=undefined;
      this.starttime=undefined;
      this.enddate=undefined;
      this.enddate=undefined;
      console.log(res);
      this.message = alert("Ruang tersebut telah berjaya ditempah!");

    }).catch(error => {
      console.log(error);

    });

  }

  ngOnInit(): void {
  }

}
