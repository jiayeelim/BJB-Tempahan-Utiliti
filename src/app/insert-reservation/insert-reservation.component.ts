import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { ReservationService } from '../service/reservation.service';
import { RuangService } from '../service/ruang.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormControl } from '@angular/forms';
import { Reservation } from '../models/reservation';
import { ReserveId } from '../models/reserveid';
import { Reservelist } from '../models/reservelist';
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
        startdate: new FormControl(Date()),
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
      ruang: Ruang = new Ruang();
      ruangID: string;
      route_url: Array<string> = [];
      status: string="Pending";

    
      reservationData$: Observable<Reservation[]>;


      reserveList: Reservelist = new Reservelist();
    
 
      //ruangData$: Observable <Ruang[]> ;
  

  constructor(public router: Router, public af:AngularFireStorage, public reservationService:ReservationService, public firebase:AngularFirestore, public ruangService:RuangService) {
    this.route_url = this.router.url.split('/');
    this.ruangID = this.route_url[2];
    const query = this.firebase.collection<Ruang>('Ruang').doc(this.ruangID).get();
    query.subscribe(value =>{
      const data = value.data();

      this.ruang.name = data.name;
      this.ruang.price = data.price;
      this.ruang.pricePer = data.pricePer;
  
  })
      this.newReservation.discount = 0;

      if(localStorage.getItem('isLoggedIn')=='true'){
        this.newReservation.name = localStorage.getItem('name');
        //this.newReservation.name = '123';
        this.newReservation.phoneno = localStorage.getItem('phone');
        //get existing reservation or create new one
        this.reservationService.reservelist.reservername = this.newReservation.name;
        this.reservationService.getReserveID(this.newReservation.name);
      }
      else{
        // redirect to account page to prompt login/register action
       window.alert('Sila log masuk.');
       this.router.navigate(['/login']);
      }
   }

   
  
  addNewReservation()
  {
    this.newReservation.reservationDescription = this.createReservationForm.value.reservationDescription;
    //this.newReservation.startdate = this.createReservationForm.value.startdate;
    //this.newReservation.starttime = this.createReservationForm.value.starttime;
    //this.newReservation.enddate = this.createReservationForm.value.enddate;
    //this.newReservation.endtime = this.createReservationForm.value.endtime;
    this.newReservation.ruangname = this.ruang.name;
    this.newReservation.ruangprice = this.ruang.price;
    this.newReservation.discount = 0;
    this.newReservation.ruangpricePer = this.ruang.pricePer;
    this.newReservation.status = this.status;

    const startDate = this.createReservationForm.value.startdate.toString().split('-');
    const endDate = this.createReservationForm.value.enddate.toString().split('-');
    const startTime = this.createReservationForm.value.starttime.toString().split(':');
    const endTime = this.createReservationForm.value.endtime.toString().split(':');

    this.newReservation.startdate = new Date(startDate[0], startDate[1], startDate[2], startTime[0], startTime[1]);
    this.newReservation.enddate = new Date(endDate[0], endDate[1], endDate[2], endTime[0], endTime[1]);

    this.newReservation.quantity = this.calculateQuantity(this.ruang.pricePer, this.newReservation.startdate,this.newReservation.enddate);
    this.newReservation.total = (this.newReservation.ruangprice*this.newReservation.quantity)-this.newReservation.discount;
    //console.log(this.newReservation.quantity);

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
    var rID : ReserveId = new ReserveId();
    const newId = this.firebase.createId();
    rID.reservationID = newId;
    this.firebase.collection('Reservation').doc(newId).set(Object.assign({},this.newReservation)).then(()=>{
      window.alert("Tempahan Ruang telah BERJAYA! ");
      this.createReservationForm.reset();
      this.reservationService.reserveID_list.push(rID);
      this.reservationService.reservelist.reservationlist = this.reservationService.reserveID_list.map((obj)=>{return Object.assign({},obj)});

      this.firebase.collection<Reservelist>('Reservelist').doc(this.reservationService.reservationlistID).set(Object.assign({}, this.reservationService.reservelist));

    })
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
  

  ngOnInit(): void 
  {

  }

  back(){
    parent.history.go(-2);
  }


}
