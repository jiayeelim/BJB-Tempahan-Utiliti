import { Component, OnInit } from '@angular/core';
import { RuangService } from '../service/ruang.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage'
import { UserService } from '../service/user.service';
import { User } from '../models/user';
import { Ruang } from '../models/ruang'
import { Router } from '@angular/router';
import { ReservationService } from '../service/reservation.service';
import { Reservation } from '../models/reservation';
import { ReserveId } from '../models/reserveid';
import { Time } from '@angular/common';

class ruangID extends Ruang{
  id: string;
  url: string;
}

class UserID extends User {
  id: string;
  url: string;
}

class reservationID extends Reservation{
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
  quantity: number;
  ruangname: string;
  ruangprice: number;
  discount: number;
  status: string;
  reason: string;
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
  

  reserves: Reservation = new Reservation();
  reservationData: reservationID;
  reserveList: Array<reservationID> = [null];
  route_url: Array<string> = [];
  id: string;
  users: User = new User();
  user: UserID;
  userList: Array<UserID> = [null];
  
  //ruangData: RuangWithId = new RuangWithId();
  //reservationData: ReservationWithId = new ReservationWithId();

  //ruangList: Array<RuangWithId> = [null];
  //reservationList: Array<ReservationWithId> = [null];


  selectedReservation$: AngularFirestoreDocument<Reservation>;
  selectedUser$: AngularFirestoreDocument<User>;
  //selectedRuang$: AngularFirestoreDocument<Ruang>;

  constructor(
    private router:Router, 
    private ruangServices: RuangService, 
    private firestore: AngularFirestore, 
    private storage: AngularFireStorage, 
    public userService: UserService,
    public reservationService:ReservationService) { 

      this.route_url = this.router.url.split('/');
      this.id = this.route_url[2];
      console.log(this.id);

    if( localStorage.getItem('isLoggedIn')=='true'&&!this.reservationService.triggered){  
    this.name=localStorage.getItem('name');
    console.log(this.name);

    }
    this.reserveList.pop();
    //this.ruangList.pop();
    

    this.reservelist = this.reservationService;
    this.reserveidList = [];
    //this.reservationService.reservelist.reservername = this.rname;
    this.reservationService.getReserveID(this.name);
    //this.reservationService.fetchReservationDetails(ID);
    //console.log(ID);

    for(let i=0; i<this.reservelist.reserveID_list.length; i++){
      this.firestore.collection<Reservation>('Reservation').doc(this.reservationService.reserveID_list[i].reservationID).get().subscribe(field =>{
        const data = field.data();
        console.log(this.name);

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
        this.reserveid.status = data.status;
        this.reserveid.reason = data.reason;
        

        this.reserveidList.push(this.reserveid);
      });
    }

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
          this.reservationData.status = data.status;
          this.reservationData.reason = data.reason;

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

    const query = this.userService.getUserID().ref;
    const query_ = this.firestore.collection<User>('User').doc(this.id).get();

    query_.subscribe( value => {
      const data = value.data();

      this.users.name = data.name;
      this.users.ic= data.ic;
      this.users.address1 = data.address1;
      this.users.address2 = data.address2;
      this.users.postcode = data.postcode;
      this.users.state = data.state;
      this.users.email = data.email;
      this.users.phone = data.phone;
      this.users.username = data.username;
      this.users.password = data.password;
      this.users.password2 = data.password2;
      this.user.resident = data.resident;
      this.user.phone = data.phone;
    })

    query.onSnapshot( doc => {
      doc.forEach( documentSnapshot => {
        this.selectedUser$ = this.firestore.doc(documentSnapshot.ref);
        this.selectedUser$.snapshotChanges().subscribe( value => {
          const data = value.payload.data();
          const id = value.payload.id;

          this.user = new UserID();
          this.user.id = id;
          this.user.name = data.name;
          this.user.ic= data.ic;
          this.user.address1 = data.address1;
          this.user.address2 = data.address2;
          this.user.postcode = data.postcode;
          this.user.state = data.state;
          this.user.email = data.email;
          this.user.phone = data.phone;
          this.user.username = data.username;
          this.user.password = data.password;
          this.user.resident = data.resident;

          this.userList.push(this.user);
        });
        })
      });
  }


  ngOnInit(): void {
  }

  updateReservation(reservationID){
    this.router.navigate(['/updateReservation', reservationID]);
  }

  deleteReservation(reservationID){
    var selection = confirm("Adakah anda pasti untuk padam tempahan ini?");
    if(selection == true){
      console.log(reservationID);
      this.reservelist.deleteReservation(this.reservationService.reservationlistID,reservationID);
      this.firestore.collection<Reservation>('Reservation').doc(reservationID).delete();
    }
  }

}
