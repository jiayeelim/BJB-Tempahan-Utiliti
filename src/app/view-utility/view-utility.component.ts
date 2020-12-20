import { Component, OnInit } from '@angular/core';
import { RuangService } from '../ruang.service';
import { AngularFireStorage } from '@angular/fire/storage'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-view-utility',
  templateUrl: './view-utility.component.html',
  styleUrls: ['./view-utility.component.css']
})
export class ViewUtilityComponent implements OnInit {

  ruang: Array<any>;
  imageUrl: Observable<string|any>;
  /*ruangName: string;
  ruangInformation: string;
  ruangPrice: number|undefined;
  ruangCapacity: number|undefined;*/
  
  constructor(public ruangService:RuangService, public af:AngularFireStorage) {}
  
  ngOnInit(){
    this.ruangService.get_allRuang().subscribe(data=>{
      this.ruang = data;

    })
  }

  getImage(path: string)
  {
    const ref = this.af.refFromURL("gs://bjb-tempahan-utiliti.appspot.com");
    /*this.imageUrl=ref.getDownloadURL();
    return this.imageUrl;*/
    
    /*ref.child(path).getDownloadURL().subscribe(url => {
      this.imageUrl = url;
      console.log("File available at", url);
    })*/ 
    
    return this.imageUrl;
  }
}
