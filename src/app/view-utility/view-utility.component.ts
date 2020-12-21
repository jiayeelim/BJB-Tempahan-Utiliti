import { Component, OnInit } from '@angular/core';
import { RuangService } from '../service/ruang.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage'
import { Observable } from 'rxjs';
import { Ruang } from '../models/ruang'
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-utility',
  templateUrl: './view-utility.component.html',
  styleUrls: ['./view-utility.component.css']
})
export class ViewUtilityComponent implements OnInit {

  ruang: Array<any>;
  
  constructor(public ruangService:RuangService, public af:AngularFireStorage) {}
  
  ngOnInit(){
    this.ruangService.get_allRuang().subscribe(data=>{
      this.ruang = data;

    })
  }

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
