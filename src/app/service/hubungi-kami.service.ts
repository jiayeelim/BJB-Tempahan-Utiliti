import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ValidatorFn, AbstractControl, MinLengthValidator } from '@angular/forms';
import { Pertanyaan } from '../models/hubungikami';

@Injectable({
  providedIn: 'root'
})
export class HubungiKamiService {

  constructor(public fireservices:AngularFirestore) { }

  newPertanyaanData(){
    return this.fireservices.collection<Pertanyaan>('Pertanyaan');
  }

  patternValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
      const valid = regex.test(control.value);
      return valid ? null : { invalidPassword: true };
    };
  }

}
