import { Component, OnInit } from '@angular/core';
import { RuangService } from '../service/ruang.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage'
import { Observable } from 'rxjs';
import { Ruang } from '../models/ruang'
import { Router } from '@angular/router';

class RuangWithId extends Ruang{
  id: string;
  url: string;
}

@Component({
  selector: 'app-user-view-utiliti',
  templateUrl: './user-view-utiliti.component.html',
  styleUrls: ['./user-view-utiliti.component.css']
})
export class UserViewUtilitiComponent implements OnInit {

  name: string;

  selectedRuang$: AngularFirestoreDocument<Ruang>;
  ruang: RuangWithId;
  ruangList: Array<RuangWithId> = [null];

  constructor(private router:Router, private ruangServices: RuangService, private firestore: AngularFirestore, private storage: AngularFireStorage){

    this.ruangList.pop();

    const query = this.ruangServices.getRuangData().ref;
    query.onSnapshot( doc => {
      doc.forEach( documentSnapshot => {
        this.selectedRuang$ = this.firestore.doc(documentSnapshot.ref);
        this.selectedRuang$.snapshotChanges().subscribe( value => {
          const data = value.payload.data();
          const id = value.payload.id;

          this.ruang = new RuangWithId();
          this.ruang.id = id;
          this.ruang.name = data.name;
          this.ruang.information = data.information;
          this.ruang.price = data.price;
          this.ruang.capacity = data.capacity;
          this.ruang.image_url = data.image_url;

          this.ruangList.push(this.ruang);
          //console.log(this.ruangList.length);
          console.log(this.name);
        });
      })
    });
  }

  ngOnInit(): void {
    
  }

  //addReservation(ruangID){
  //  this.router.navigate(['/insertReservation',ruangID]);
 // }

  }


