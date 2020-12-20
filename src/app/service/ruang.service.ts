import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class RuangService {

  image: AngularFireList<any>;
  //fileList: any[];*/

  constructor(public fireservices:AngularFirestore, private firebase:AngularFireDatabase) { }

  /*getImageDetailList() {
    this.imageDetailList = this.firebase.list('imageDetails');
  }*/

  create_newRuang(Ruang)
  {
    return this.fireservices.collection('Ruang').add(Ruang);
    //this.imageDetailList.push(this.dataSet);
  }

  get_allRuang(){
    return this.fireservices.collection('Ruang').snapshotChanges();
    //this.image = this.firebase.list('Ruang');
  }
}
