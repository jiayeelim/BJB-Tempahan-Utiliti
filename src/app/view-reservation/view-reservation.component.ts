import { Component, OnInit } from '@angular/core';
import { RuangService } from '../service/ruang.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage'
import { Observable } from 'rxjs';
import { Ruang } from '../models/ruang'
import { Router } from '@angular/router';
import { ReservationService } from '../service/reservation.service';
import { Reservation } from '../models/reservation';
import { ReserveId } from '../models/reserveid';
import { Time } from '@angular/common';

class RuangWithId extends Ruang{
  id: string;
  url: string;
}

class ReservationWithId extends Reservation{
  id: string;
  url: string;
}

class tempReservelist{
  reserveID: string;
  name: string;
  startdate: Date;
  starttime: Time;
  enddate: Date;
  endtime: Time;
  //quantity: number;
  ruangname: string;
  ruangprice: number;
  discount: number;
  ruangpricePer: string;

}

@Component({
  selector: 'app-view-reservation',
  templateUrl: './view-reservation.component.html',
  styleUrls: ['./view-reservation.component.css']
})
export class ViewReservationComponent implements OnInit {

  reservelist;
  name: string;
  reserveid: tempReservelist;
  reserveidList: tempReservelist[];
  rname: string="123";

  
  //ruangData: RuangWithId = new RuangWithId();
  //reservationData: ReservationWithId = new ReservationWithId();

  //ruangList: Array<RuangWithId> = [null];
  //reservationList: Array<ReservationWithId> = [null];


  //selectedReservation$: AngularFirestoreDocument<Reservation>;
  //selectedRuang$: AngularFirestoreDocument<Ruang>;

  constructor(private router:Router, private ruangServices: RuangService, private firestore: AngularFirestore, private storage: AngularFireStorage, public reservationService:ReservationService) { 
    if( localStorage.getItem('isLoggedIn')=='true'&&!this.reservationService.triggered){  
    this.name=localStorage.getItem('name');
    console.log(this.name);

    }
    //this.reservationList.pop();
    //this.ruangList.pop();
    

    this.reservelist = this.reservationService;
    this.reserveidList = [];
    //this.reservationService.reservelist.reservername = this.rname;
    this.reservationService.getReserveID(this.rname);
    
  
    
    console.log(this.reservationService.reserveID_list.length);
    console.log(this.rname);
    
      
/*
    for(let i=0; i<this.reservelist.reserveID_list.length; i++){
      this.firestore.collection<Reservation>('Reservation').doc(this.reservationService.reserveID_list[i].reservationID).get().subscribe(field =>{
        const data = field.data();
        console.log(this.rname);

        this.reserveid = new tempReservelist();
        this.reserveid.reserveID = field.id;
        this.reserveid.name = data.name;
        this.reserveid.startdate = data.startdate;
        this.reserveid.starttime = data.starttime;
        this.reserveid.enddate = data.enddate;
        this.reserveid.endtime = data.endtime;
        this.reserveid.discount = data.discount;
        this.reserveid.ruangname = data.ruangname;
        this.reserveid.ruangprice = data.ruangprice;
        this.reserveid.ruangpricePer = data.ruangpricePer;
        

        this.reserveidList.push(this.reserveid);
      });
    }

   /* const reservation_query = this.firestore.collection<Reservation>('Reservation').ref.where('name',"==",this.name);
    reservation_query.onSnapshot( doc =>{
      doc.forEach(documentSnapshot =>{
        this.selectedReservation$=this.firestore.doc(documentSnapshot.ref);
        this.selectedReservation$.snapshotChanges().subscribe( value =>{
          const data =value.payload.data();
          const id = value.payload.id;

          //this.reservationData = new ReservationWithId();
          this.reservationData.id = id;
          this.reservationData.name = data.name;
          this.reservationData.phoneno = data.phoneno;
          this.reservationData.startdate = data.startdate;
          this.reservationData.enddate = data.enddate;
          this.reservationData.starttime = data.starttime;
          this.reservationData.endtime = data.endtime;
          this.reservationData.ruangprice = data.ruangprice;
          this.reservationData.discount = data.discount;
          this.reservationData.ruangname = data.ruangname;

          //this.reservationList.push(this.reservationData);
          //console.log(this.name);
        });
          //const data = documentSnapshot.data();
          //const id =value.payload.id;
          
        
        
      });
    });


    /*const ruang_query = this.firestore.collection<Ruang>('Ruang').ref.where('name',"==", this.reservationData.ruangname);
    ruang_query.onSnapshot(doc =>{
      doc.forEach(documentSnapshot =>{
        this.selectedRuang$=this.firestore.doc(documentSnapshot.ref);
        this.selectedRuang$ . snapshotChanges().subscribe(value =>{
          const data2=value.payload.data();
          this.ruangData=new RuangWithId;
          this.ruangData.name= data2.name;
          this.ruangData.information= data2.name;
          this.ruangData.image_url = data2.image_url;
          this.ruangData.price = data2.price;
          this.ruangData.pricePer = data2.pricePer;

        });
      });
    });*/
  }


  ngOnInit(): void {
  }

  updateReservation(reservationID){
    this.router.navigate(['/updateReservation', reservationID]);
  }

  deleteReservation(){
    var selection = confirm("Adakah anda pasti untuk padam tempahan ini?");
    if(selection == true){
      this.firestore.collection<Reservation>('Reservation').doc(this.reserveid.reserveID).delete();
    }
  }

}
