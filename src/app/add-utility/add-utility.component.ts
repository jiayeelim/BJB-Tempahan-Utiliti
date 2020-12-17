import { Component, OnInit } from '@angular/core';
import { RuangService } from '../ruang.service';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-utility',
  templateUrl: './add-utility.component.html',
  styleUrls: ['./add-utility.component.css']
})
export class AddUtilityComponent implements OnInit {

  ruang: any;
  ruangName: string;
  ruangInformation: string;
  ruangPrice: number|undefined;
  ruangCapacity: number|undefined;
  ruangImageUrl: any;
  message: void;
  path: string;
  imgSrc: string = '/assets/image/blankImage.png';
  selectedImage: any = null;
  task: AngularFireUploadTask;

  constructor(public af:AngularFireStorage, public ruangService:RuangService) { }

  showPreview(event:any)
  {
    if(event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.onload = (e:any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else{
      this.imgSrc = '/assets/image/blankImage.png';
      this.selectedImage = null;
    }
  }

  upload($event)
  {
    this.path = $event.target.files[0];
  }

  CreateRuang()
  {
    //console.log(this.path);
    var filename = "/files"+Math.random()+this.path;
    //const filename = this.selectedImage.name;
    this.task = this.af.upload(filename,this.path);
    const fileRef = this.af.ref(filename);

    let Ruang = {};
    Ruang['name'] = this.ruangName;
    Ruang['information'] = this.ruangInformation;
    Ruang['price'] = this.ruangPrice;
    Ruang['capacity'] = this.ruangCapacity;
    Ruang['image'] = filename;

    /*this.af.upload(filename, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.ruangImageUrl = url;
          this.ruangService.create_newRuang(Ruang, this.selectedImage).then(res =>{

            this.ruangName="";
            this.ruangInformation="";
            this.ruangPrice=undefined;
            this.ruangCapacity=undefined;
          })
          //this.message = alert("Ruang data save DONE");
        })
      })
    ).subscribe();*/

    this.ruangService.create_newRuang(Ruang).then(res =>{

      this.ruangName="";
      this.ruangInformation="";
      this.ruangPrice=undefined;
      this.ruangCapacity=undefined;
      fileRef.getDownloadURL().subscribe((url) => {
        this.ruangImageUrl = url;
      })
      //this.ruangImageUrl=fileRef.getDownloadURL();

      console.log(res);

      this.message = alert("Ruang data save DONE");

    }).catch(error => {
      console.log(error);

    });

  }

  ngOnInit(): void {
  }

  

}
