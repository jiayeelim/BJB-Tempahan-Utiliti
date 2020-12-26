import { Component, OnInit } from '@angular/core';
import { RuangService } from '../service/ruang.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage'
import { Observable } from 'rxjs';
import { Ruang } from '../models/ruang'
import { Router } from '@angular/router';
import { ReservationService } from '../service/reservation.service';
import { Reservation } from '../models/reservation';

class RuangWithId extends Ruang{
  id: string;
  url: string;
}

class ReservationWithId extends Reservation{
  id: string;
  url: string;
}

@Component({
  selector: 'app-view-reservation',
  templateUrl: './view-reservation.component.html',
  styleUrls: ['./view-reservation.component.css']
})
export class ViewReservationComponent implements OnInit {

  name: string;
  ruangData: RuangWithId = new RuangWithId();
  reservationData: ReservationWithId = new ReservationWithId();

  //ruangList: Array<RuangWithId> = [null];
  //reservationList: Array<ReservationWithId> = [null];


  selectedReservation$: AngularFirestoreDocument<Reservation>;
  selectedRuang$: AngularFirestoreDocument<Ruang>;

  constructor(private router:Router, private ruangServices: RuangService, private firestore: AngularFirestore, private storage: AngularFireStorage, public reservationService:ReservationService) { 
    //if(localStorage.getItem('isLoggedIn')=='true'){
    this.name=localStorage.getItem('name');

    //}
    //this.reservationList.pop();
    //this.ruangList.pop();

    const reservation_query = this.firestore.collection<Reservation>('Reservation').ref.where('name',"==",this.name);
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
      this.firestore.collection<Reservation>('Reservation').doc(this.reservationData.id).delete();
    }
  }

}
