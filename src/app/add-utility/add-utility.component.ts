import { Component, OnInit } from '@angular/core';
import { RuangService } from '../service/ruang.service';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { FormGroup, FormControl } from '@angular/forms';
import { Ruang } from '../models/ruang'
import { Location } from "@angular/common";
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-utility',
  templateUrl: './add-utility.component.html',
  styleUrls: ['./add-utility.component.css']
})
export class AddUtilityComponent implements OnInit {

  addUtilityForm = new FormGroup({
    name: new FormControl(''),
    information: new FormControl(''),
    price: new FormControl(''),
    pricePer: new FormControl(''),
    capacity: new FormControl(''),
    img: new FormControl(''),
  });

  newRuang: Ruang = new Ruang();
  selectedFile;

  constructor(private ruangService:RuangService, private location:Location, private storage:AngularFireStorage) {}

  ngOnInit(): void {
  }

  uploadImageAndAddNewRuang(event, imageUrl){
    const file: File = event.target.files[0];
    const filePath = "ruangImages/" + imageUrl;
    const task = this.storage.upload(filePath, file);

    task.snapshotChanges().subscribe(() => {
      // get the complete url of the image
      const file = "ruangImages/" + this.newRuang.image_url;
      const ref = this.storage.ref(file);
      console.log(file);

      ref.getDownloadURL().subscribe(url =>{
        //console.log(url);
        this.newRuang.image_url = url;

      this.ruangService.newRuangData().add(Object.assign({}, this.newRuang)).then(() => {
        window.alert("Yayy! New ruang added! :)");
        this.addUtilityForm.reset();
        this.location.back();
      });
   });
  });
  }

  addNewRuang(){
    /*console.log(this.addUtilityForm.value.img);
    console.log(this.addUtilityForm.value.price);
    console.log(this.event);*/
    this.newRuang.name = this.addUtilityForm.value.name;
    this.newRuang.information = this.addUtilityForm.value.information;
    this.newRuang.capacity = this.addUtilityForm.value.capacity;
    this.newRuang.price = this.addUtilityForm.value.price;
    this.newRuang.pricePer = this.addUtilityForm.value.pricePer;

    var imageurl = this.addUtilityForm.value.img.split("\\");
    this.newRuang.image_url = imageurl[imageurl.length - 1];
    //console.log(this.newRuang.image_url);

    try{
      // start upload the image to firebase storage
      this.uploadImageAndAddNewRuang(this.event, this.newRuang.image_url);
    }

    catch (err){
      console.log(err);
    }

  }
  
  url;
  message = "";
  event;

  selectFile(event){

    if(!event.target.files[0] || event.target.files[0].length == 0){
      this.message = "You must select an image!";
      return;
    }
    
    var mimeType = event.target.files[0].type;

    if(mimeType.match(/image\/*/) == null){
      this.message = "Only images are supported!";
      return;
    }
    // img input is string typee
    // console.log(this.createProductForm.value.img);
    // console.log(event.target.files[0].name);
    // console.log(event.target.files[0]);
    this.event = event;

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      this.message = "";
      this.url = reader.result;
    }

  }

}
