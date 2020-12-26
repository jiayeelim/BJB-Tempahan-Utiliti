import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl  } from '@angular/forms';
import { HubungiKamiService } from '../service/hubungi-kami.service'
import { Pertanyaan } from '../models/hubungikami';

@Component({
  selector: 'app-hubungi-kami',
  templateUrl: './hubungi-kami.component.html',
  styleUrls: ['./hubungi-kami.component.css']
})
export class HubungiKamiComponent implements OnInit {

  ngOnInit(): void {
  }
  pertanyaanForm =  this.formBuilder.group({
    name: ['',Validators.required],
    email: ['',Validators.required],
    telephone: ['',Validators.required],
    message: ['',Validators.required],
  })

  newPertanyaan: Pertanyaan = new Pertanyaan();

  constructor(private hubungiKamiService:HubungiKamiService, private formBuilder: FormBuilder, private router:Router){}
  
  
  addNewPertanyaan(){
    this.newPertanyaan.name=this.pertanyaanForm.value.name;
    this.newPertanyaan.email=this.pertanyaanForm.value.email;
    this.newPertanyaan.telephone=this.pertanyaanForm.value.telephone;
    this.newPertanyaan.message=this.pertanyaanForm.value.message;

    try
    {
      this.createNewPertanyaan();
    }

    catch (err)
    {
      console.log(err);
    }
  }

  createNewPertanyaan(){
    this.hubungiKamiService.newPertanyaanData().add(Object.assign({},this.newPertanyaan)).then(()=>{
      window.alert("Pertanyaan telah BERJAYA dihantar! ");
      this.pertanyaanForm.reset();
      this.router.navigate(['home']);
    })
  }

  get pertanyaanFormControl() {return this.pertanyaanForm.controls;}

}
