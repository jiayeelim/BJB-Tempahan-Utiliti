import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RuangService {

  constructor(public fireservices:AngularFirestore) { }

  create_newRuang(Ruang)
  {
    return this.fireservices.collection('Ruang').add(Ruang);
  }
}
