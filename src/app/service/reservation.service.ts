import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Reservation } from '../models/reservation';
import { ReserveId } from '../models/reserveid';
import { Reservelist } from '../models/reservelist';

class tempReserveId{
  reservationID: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})

export class ReservationService {

  triggered: boolean = false;
  reservationlistID: string;
  name: string;
  reservelist: Reservelist = new Reservelist();
  reserveID: ReserveId = new ReserveId();
  reserveID_list: ReserveId[]=[];

  reservation: tempReserveId;
  reservationList: tempReserveId[]=[];

  

    constructor(public fireservices:AngularFirestore) { }

    getReserveID(name){
      this.reserveID_list = [];
      const query = this.fireservices.collection('Reservelist').ref.where('reservername',"==",name);

      query.get().then( querySnapshot => {
        if(querySnapshot.empty){
          const reservationidList = this.reserveID_list.map((obj)=>{return Object.assign({}, obj)});

          this.reservelist.reservername=name;
          this.reservelist.reservationlist=reservationidList;

          this.fireservices.collection<Reservelist>('Reservelist').add(Object.assign({}, this.reservelist)).then( ()=>this.getReserveID(name));

        }
        else{
          querySnapshot.forEach(documentSnapshot =>{
            this.reservationlistID = documentSnapshot.id;
            this.fetchReservationDetails(this.reservationlistID);
          });
        }
      });
      this.triggered=true;
    }

    fetchReservationDetails(reservationlistID){
      this.reserveID_list = [];
      const query = this.fireservices.collection<Reservelist>('Reservelist').doc(reservationlistID);

      query.get().subscribe(field =>{
        const data= field.data();
        data.reservationlist.forEach(value =>{

          var $reserveid = new ReserveId();
          $reserveid.reservationID = value.reservationID;

          this.reserveID_list.push($reserveid);
        });
      });
    }

    deleteReservation(reservelist_id, reservation_id){
      var newList = [];

      for(let i=0; i< this.reserveID_list.length; i++){
        if(this.reserveID_list[i].reservationID !=reservation_id){
          var tempReserveId = new Reservelist();
          tempReserveId.reservelistID = this.reserveID_list[i].reservationID;

          newList.push(tempReserveId)
        }
      }
      var tempReservelist= new Reservelist();
      tempReservelist.reservername= localStorage.getItem('name');
      tempReservelist.reservationlist= newList.map((obj)=>{return Object.assign({},obj)});

      this.fireservices.collection<Reservelist>('Reservalist').doc(reservelist_id).set(Object.assign({}, tempReservelist)).then(()=>{
        window.alert('Tempahan telah berjaya dipadamkan!');
        window.location.reload();
      })
    }
  
    /*newReservationData()
    {
      return this.fireservices.collection<Reservation>('Reservation');
    }*/
  }