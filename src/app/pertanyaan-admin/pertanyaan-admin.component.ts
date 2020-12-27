import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage'
import { HubungiKamiService } from '../service/hubungi-kami.service'
import { Pertanyaan } from '../models/hubungikami'
import { resolve } from 'dns';

/*class PertanyaanWithId extends Pertanyaan{
  id: string;
  url: string;
}*/

@Component({
  selector: 'app-pertanyaan-admin',
  templateUrl: './pertanyaan-admin.component.html',
  styleUrls: ['./pertanyaan-admin.component.css']
})
export class PertanyaanAdminComponent implements OnInit {

  /*selectedPertanyaan$: AngularFirestoreDocument<Pertanyaan>;
  pertanyaan: Pertanyaan;
  pertanyaanList: Array<Pertanyaan> = [null];*/
  pertanyaan: Pertanyaan[];

  constructor(private hubungiKamiService: HubungiKamiService, private firestore: AngularFirestore, private storage: AngularFireStorage){
  
   /*this.pertanyaanList.pop();

    const query = this.hubungiKamiService.getPertanyaanData().ref;
    query.onSnapshot( doc => {
      doc.forEach( documentSnapshot => {
        this.selectedPertanyaan$ = this.firestore.doc(documentSnapshot.ref);
        this.selectedPertanyaan$.snapshotChanges().subscribe( value => {
          const data = value.payload.data();

          this.pertanyaan = new Pertanyaan();
          this.pertanyaan.name = data.name;
          this.pertanyaan.email = data.email;
          this.pertanyaan.telephone = data.telephone;
          this.pertanyaan.title = data.title;
          this.pertanyaan.message = data.message;

          this.pertanyaanList.push(this.pertanyaan);
          //console.log(this.ruangList.length);
          //console.log(this.name);
        });
      })
    });*/

  }


  ngOnInit(): void {
    this.hubungiKamiService.getPertanyaanData().subscribe(data => {
      this.pertanyaan = data.map(e => {
        return{
          id: e.payload.doc.id,
          ... e.payload.doc.data() as Pertanyaan
        } 
      })
    });
  }

  delete(data){
    var selection = confirm("Are you sure to delete this item?");
    if(selection == true){
      this.firestore.collection<Pertanyaan>('Pertanyaan').doc(data.id).delete();
    }
  }

}
