import { Component, OnInit } from '@angular/core';
import { RuangService } from '../ruang.service';
import { AngularFireStorage } from '@angular/fire/storage'

@Component({
  selector: 'app-add-utility',
  templateUrl: './add-utility.component.html',
  styleUrls: ['./add-utility.component.css']
})
export class AddUtilityComponent implements OnInit {

  ruangName: string;
  ruangInformation: string;
  ruangPrice: number|undefined;
  ruangCapacity: number|undefined;
  //ruangImage: 
  message: void;
  path: string;

  constructor(public af:AngularFireStorage, public ruangService:RuangService) { }

  upload($event)
  {
    this.path = $event.target.files[0];
  }

  CreateRuang()
  {
    //console.log(this.path);

    this.af.upload("/files"+Math.random()+this.path,this.path);

    let Ruang = {};
    Ruang['name'] = this.ruangName;
    Ruang['information'] = this.ruangInformation;
    Ruang['price'] = this.ruangPrice;
    Ruang['capacity'] = this.ruangCapacity;

    this.ruangService.create_newRuang(Ruang).then(res =>{

      this.ruangName="";
      this.ruangInformation="";
      this.ruangPrice=undefined;
      this.ruangCapacity=undefined;
      console.log(res);
      this.message = alert("Ruang data save DONE");

    }).catch(error => {
      console.log(error);

    });
  }

  ngOnInit(): void {
  }

  

}
