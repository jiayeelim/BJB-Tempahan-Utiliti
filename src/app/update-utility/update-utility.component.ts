import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Ruang } from '../models/ruang'
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-utility',
  templateUrl: './update-utility.component.html',
  styleUrls: ['./update-utility.component.css']
})
export class UpdateUtilityComponent implements OnInit {

  item: Ruang = new Ruang();
  route_url: Array<string> = [];
  ruangID: string;
  previousImgURL: string;
  newImgURL: string = "";

  updateutilityform;

  constructor(private router:Router, private location: Location, private firestore: AngularFirestore, private storage: AngularFireStorage) {

    this.route_url = this.router.url.split('/');
    this.ruangID = this.route_url[2];

    const query = this.firestore.collection<Ruang>('Ruang').doc(this.ruangID).get();

    query.subscribe(value => {
      const data = value.data();

      this.item.name = data.name;
      this.item.information = data.information;
      this.item.capacity = data.capacity;
      this.item.price = data.price;
      this.item.image_url = data.image_url;
      this.url = this.item.image_url;

      this.previousImgURL = this.url;

      this.updateutilityform = new FormGroup({
        name: new FormControl(this.item.name),
        information: new FormControl(this.item.information),
        price: new FormControl(this.item.price),
        capacity: new FormControl(this.item.capacity),
        img: new FormControl(''),
      });
      console.log(this.item.price);
    });
  }

  ngOnInit(): void {
  }

  deleteImgUrl(){
    this.storage.storage.refFromURL(this.previousImgURL).delete();
  }

  changeImageAndUpdateRuang(event, imageUrl){
    // delete the previous image from firebase storage
    this.deleteImgUrl();
    console.log('image deleted');

    // upload the new image to storage
    const file: File = event.target.files[0];
    const filePath = "ruangImages/" + imageUrl;
    const task = this.storage.upload(filePath, file);

    task.snapshotChanges().subscribe(() => {
      // get the complete url of the image
      const file = "ruangImages/" + imageUrl;
      const ref = this.storage.ref(file);

      ref.getDownloadURL().subscribe(url =>{
        // console.log(url);
        this.item.image_url = url;

        // update product details to firestore
        this.firestore.collection('Ruang').doc(this.ruangID).update(Object.assign({}, this.item)).then(() => {
          window.alert("Ruang updated! :)");
          this.updateutilityform.reset();
          this.router.navigate(['view-utility']);          
        });
     });
    });
  }

  updateRuang(){
    this.item.name = this.updateutilityform.value.name;
    this.item.information = this.updateutilityform.value.information;
    this.item.capacity = this.updateutilityform.value.capacity;
    this.item.price = this.updateutilityform.value.price;
    //console.log(this.updateutilityform.value.img);

    try{
      // If no any new image uploaded, just directly update the database, else update storage and get url
      if(this.newImgURL == ""){
        this.item.image_url = this.previousImgURL;
        this.firestore.collection('Ruang').doc(this.ruangID).update(Object.assign({}, this.item));
        window.alert("Ruang updated! :)");
        this.updateutilityform.reset();
        this.router.navigate(['view-utility']);
      }
      else{
        this.changeImageAndUpdateRuang(this.event, this.newImgURL);
      }

      
    }
    catch(err){
      console.log(err);
    }
  }

  message = "";
  url ;
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
    this.newImgURL = event.target.files[0].name;
    // console.log(this.newImgURL);

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      this.message = "";
      this.url = reader.result;
    }

  }
}
