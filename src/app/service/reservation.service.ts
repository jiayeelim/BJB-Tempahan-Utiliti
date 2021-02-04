import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Time } from '@angular/common';
import { Reservation } from '../models/reservation';
import { ReserveId } from '../models/reserveid';
import { Reservelist } from '../models/reservelist';

class tempReserveId{
  reservationID: string;
  name: string;
}

class tempReservelist{
  reserveID: string;
  name: string;
  startdate: any;
  starttime: any;
  enddate: any;
  endtime: any;
  quantity: number;
  ruangname: string;
  ruangprice: number;
  discount: number;
  ruangpricePer: string;
  total: number;
  status: string;
  reason: string;

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
  reserveID_list: ReserveId[];

  reservation: tempReserveId;
  reservationList: tempReserveId[]=[];

  reserveid1: tempReservelist;
  reserveidList: tempReservelist[]=[];

  rID: string;

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
            console.log(this.reservationlistID);
            //return this.reservationlistID;
            this.fetchReservationDetails(this.reservationlistID);
            
            
          });
        }
      });
      this.triggered=true;
    }

    fetchReservationDetails(reservationlistID){
      this.reserveID_list = [];
      this.reserveidList = [];
      const query = this.fireservices.collection<Reservelist>('Reservelist').doc(reservationlistID);

      query.get().subscribe(field =>{
        const data= field.data();
        data.reservationlist.forEach(value =>{

          var $reserveid = new ReserveId();
          $reserveid.reservationID = value.reservationID;
          this.rID=value.reservationID;
          console.log(this.rID);
          
          this.fireservices.collection<Reservation>('Reservation').doc(this.rID).get().subscribe(field =>{
            const data = field.data();
            //console.log(this.rname);
    
            this.reserveid1 = new tempReservelist();
            this.reserveid1.reserveID = field.id;
            this.reserveid1.name = data.name;
            //var startDateTime = data.startdate.toDate().toString().split(' ');
            //this.reserveid1.startdate = startDateTime[1] + ' ' + startDateTime[2] + ' ' + startDateTime[3];
            //this.reserveid1.starttime = startDateTime[4];
            this.reserveid1.startdate =data.startdate.toDate();
            this.reserveid1.enddate = data.enddate.toDate();
            //var endDateTime = data.enddate.toDate().toString().split(' ');
            //this.reserveid1.enddate = endDateTime[1] + ' ' + endDateTime[2] + ' ' + endDateTime[3];
            //this.reserveid1.endtime = endDateTime[4];
        
            this.reserveid1.discount = data.discount;
            this.reserveid1.ruangname = data.ruangname;
            this.reserveid1.ruangprice = data.ruangprice;
            this.reserveid1.ruangpricePer = data.ruangpricePer;
            this.reserveid1.status = data.status;
            this.reserveid1.reason = data.reason;
            this.reserveid1.quantity = data.quantity;
            this.reserveid1.total = data.total;
            
    
            this.reserveidList.push(this.reserveid1);
          });

          this.reserveID_list.push($reserveid);
          console.log(this.reserveID_list.length);
        });
      });
    }

    deleteReservation(reservelist_id, reservation_id){
      var newList = [];

      for(let i=0; i< this.reserveID_list.length; i++){
        if(this.reserveID_list[i].reservationID !=reservation_id){
          var tempReserveId = new ReserveId();
          tempReserveId.reservationID = this.reserveID_list[i].reservationID;

          newList.push(tempReserveId);
          console.log(tempReserveId.reservationID);
        }
      }
      var tempReservelist= new Reservelist();
      //tempReservelist.reservername= localStorage.getItem('name');
      tempReservelist.reservername='123';
      tempReservelist.reservationlist= newList.map((obj)=>{return Object.assign({},obj)});

      this.fireservices.collection<Reservelist>('Reservelist').doc(reservelist_id).set(Object.assign({}, tempReservelist)).then(()=>{
        //window.alert('Tempahan telah berjaya dipadamkan!');
        window.location.reload();
      });
    }
  
    getReservationData(){
      return this.fireservices.collection<Reservation>('Reservation');
    }
  }