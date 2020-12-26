import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Ruang } from '../models/ruang';

@Injectable({
  providedIn: 'root'
})
export class RuangService {

  constructor(public fireservices:AngularFirestore, private firebase:AngularFireDatabase) { }

  getRuangData(){
    return this.fireservices.collection<Ruang>('Ruang');
  }

  newRuangData(){
    return this.fireservices.collection<Ruang>('Ruang');
  }
}
