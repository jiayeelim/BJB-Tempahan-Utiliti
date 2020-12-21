import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Ruang } from '../models/ruang';

@Injectable({
  providedIn: 'root'
})
export class RuangService {

  //image: AngularFireList<any>;

  constructor(public fireservices:AngularFirestore, private firebase:AngularFireDatabase) { }

  /*create_newRuang(Ruang)
  {
    return this.fireservices.collection('Ruang').add(Ruang);
  }*/

  get_allRuang(){
    return this.fireservices.collection('Ruang').snapshotChanges();
  }

  newRuangData(){
    return this.fireservices.collection<Ruang>('Ruang');
  }
}
