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
  item1: Reservation = new Reservation();
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
      this.item.discount = data.discount;
      //this.item.startdate = data.startdate;
      //this.item.starttime = data.starttime;
      //this.item.enddate = data.enddate;
      //this.item.endtime = data.endtime;
      //this.item.startdate =data.startdate.toDate();
      //this.item.enddate = data.enddate.toDate();
      var startDateTime = data.startdate.toDate().toString().split(' ');
      this.item.startdate = startDateTime[3] + '-0' + this.convertToNo(startDateTime[1]) + '-' + startDateTime[2];
      this.item.starttime = startDateTime[4];
      var endDateTime = data.enddate.toDate().toString().split(' ');
      this.item.enddate = endDateTime[3] + '-0' + this.convertToNo(endDateTime[1]) + '-' + endDateTime[2];
      this.item.endtime = endDateTime[4];
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
    this.item1.reservationDescription = this.updateReservationForm.value.reservationDescription;
    //this.item.startdate = this.updateReservationForm.value.startdate;
    //this.item.starttime = this.updateReservationForm.value.starttime;
    //this.item.enddate = this.updateReservationForm.value.enddate;
    //this.item.endtime = this.updateReservationForm.value.endtime;
    const startDate = this.updateReservationForm.value.startdate.toString().split('-');
    const endDate = this.updateReservationForm.value.enddate.toString().split('-');
    const startTime = this.updateReservationForm.value.starttime.toString().split(':');
    const endTime = this.updateReservationForm.value.endtime.toString().split(':');

    this.item1.startdate = new Date(startDate[0], startDate[1], startDate[2], startTime[0], startTime[1]);
    this.item1.enddate = new Date(endDate[0], endDate[1], endDate[2], endTime[0], endTime[1]);

    this.item1.quantity = this.calculateQuantity(this.item.ruangpricePer, this.item1.startdate,this.item1.enddate);
    this.item1.total = (this.item.ruangprice*this.item1.quantity)-this.item.discount;

    try
    {
      this.firestore.collection('Reservation').doc(this.reservationID).update(Object.assign({}, this.item1));
      window.alert("Kemaskini tempahan telah BERJAYA! ");
      this.updateReservationForm.reset();
      this.router.navigate(['viewReservation']);
    }

    catch (err)
    {
      console.log(err);
    }
  }

  convertToNo(month){
    if(month=='Jan')
      return 1;
    else if(month=='Feb')
      return 2;
    else if(month=='Mar')
      return 3;
    else if(month=='Apr')
      return 4;
    else if(month=='May')
      return 5;
    else if(month=='Jun')
      return 6;
    else if(month=='Jul')
      return 7;
    else if(month=='Aug')
      return 8;
    else if(month=='Sep')
      return 9;
    else if(month=='Oct')
      return 10;
    else if(month=='Nov')
      return 11;
    else if(month=='Dec')
      return 12;
  }

  calculateQuantity(priceper, startdate, enddate)
  {
   
    if(priceper=='jam'){
      var delta=Math.abs(enddate-startdate)/1000;
      var hours = Math.floor( delta / 60 / 60 );
     
      return hours;
    }
    else{
      var days= Math.round((enddate-startdate)/(1000*60*60*24));
      return days
    }
   
  }
  

}
