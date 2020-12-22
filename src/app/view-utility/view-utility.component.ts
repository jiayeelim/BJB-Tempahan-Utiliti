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
  selector: 'app-view-utility',
  templateUrl: './view-utility.component.html',
  styleUrls: ['./view-utility.component.css']
})
export class ViewUtilityComponent implements OnInit {

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

  updateUtility(ruangID){
    this.router.navigate(['/updateRuang',ruangID]);
  }

  /*ruang: Array<any>;
  
  constructor(public ruangService:RuangService, public af:AngularFireStorage) {}
  
  ngOnInit(){
    this.ruangService.get_allRuang().subscribe(data=>{
      this.ruang = data;

    })
  }*/

  /*getImage(path: string)
  {
    const ref = this.af.refFromURL("gs://bjb-tempahan-utiliti.appspot.com");
    /*this.imageUrl=ref.getDownloadURL();
    return this.imageUrl;
    
    ref.child(path).getDownloadURL().subscribe(url => {
      this.imageUrl = url;
      console.log("File available at", url);
    })
  
    return this.imageUrl;
  }*/

  /*ruang: Ruang = new Ruang();

  constructor(private router:Router, private location: Location, private firestore: AngularFirestore, private ruangService: RuangService) {

    const query = this.firestore.collection<Ruang>('Ruang').get();

    query.subscribe(value => {
      const data = value.data();
      
      this.ruang.name = data.name();

    })
  }*/
}
