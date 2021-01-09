import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { User } from '../models/user';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Location } from '@angular/common';
import { UserService } from '../service/user.service';
import { RegisterService } from '../service/register.service';

class UserID extends User {
  id: string;
  url: string;
}

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  user: User = new User();
  route_url: Array<string> = [];
  users: UserID;
  userList: Array<UserID> = [null];
  selectedUser$: AngularFirestoreDocument<User>;
  username: string;
  id: string;
  name: string;
  user_username: Array<string> = [null];
  updateUserForm;
  /*updateUserForm = this.formBuilder.group({
    name: ['',Validators.required],
    username: ['',[Validators.required]],
    ic: ['', Validators.compose([Validators.required, Validators.minLength(12), Validators.maxLength(12)])],
    address1: ['', [Validators.required]],
    address2: ['', [Validators.required]],
    postcode: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    state: ['', [Validators.required]],
    password: ['', Validators.compose([Validators.required, this.registerService.patternValidator()])],
    password2: ['', [Validators.required]],
    resident: ['', [Validators.required]],
  })*/

  submitted = false;
  stateList: any = ['Johor', 'Kedah', 'Kelantan', 'Melaka', 'Negeri Sembilan', 'Pahang', 'Penang', 'Perak', 'Sabah', 'Sarawak', 'Selangor', 'Terengganu']

  constructor(
    private router: Router, 
    private firestore: AngularFirestore,
    private formBuilder: FormBuilder,
    private location: Location, 
    public registerService:RegisterService) {

    //console.log(this.router.url);
    this.route_url = this.router.url.split('/');
    this.id = this.route_url[2];
    console.log(this.id); 

    const query = this.firestore.collection<User>('User').doc(this.id).get();
    //console.log(this.user.name);

    query.subscribe(value => {
      const data = value.data();

      this.user.name = data.name;
      this.user.ic= data.ic;
      this.user.address1 = data.address1;
      this.user.address2 = data.address2;
      this.user.postcode = data.postcode;
      this.user.state = data.state;
      this.user.email = data.email;
      this.user.phone = data.phone;
      this.user.username = data.username;
      this.user.password = "";
      this.user.password2 = "";
      this.user.resident = data.resident;

      this.updateUserForm = new FormGroup({
        name: new FormControl(this.user.name),
        ic: new FormControl(this.user.ic),
        address1: new FormControl(this.user.address1, [Validators.required]),
        address2: new FormControl(this.user.address2, [Validators.required]),
        postcode: new FormControl(this.user.postcode, [Validators.required]),
        state: new FormControl(this.user.state, [Validators.required]),
        email: new FormControl(this.user.email, [Validators.required, Validators.email]),
        phone: new FormControl(this.user.phone, [Validators.required]),
        password: new FormControl(this.user.password,  Validators.compose([Validators.required, this.registerService.patternValidator()])),
        password2: new FormControl(this.user.password,  Validators.compose([Validators.required, this.registerService.patternValidator()])),
        username: new FormControl(this.user.username),
        resident: new FormControl(this.user.resident, [Validators.required]),
      });
    });
  }

  back(){
    this.location.back();
  }

  ngOnInit(): void {
  }

  updateUser(){

    let status: boolean;
    status = true;

    if(this.updateUserForm.value.address1 && this.updateUserForm.value.address2 && this.updateUserForm.value.state && this.updateUserForm.value.postcode){
    if(this.updateUserForm.value.email){
    if(this.updateUserForm.value.phone){
    if(this.updateUserForm.value.password && this.updateUserForm.value.password2){
    if(this.updateUserForm.value.password == this.updateUserForm.value.password2){

          this.user.name = this.updateUserForm.value.name;
          this.user.ic = this.updateUserForm.value.ic;
          this.user.address1 = this.updateUserForm.value.address1;
          this.user.address2 = this.updateUserForm.value.address2;
          this.user.state = this.updateUserForm.value.state;
          this.user.postcode = this.updateUserForm.value.postcode;
          this.user.phone = this.updateUserForm.value.phone;
          this.user.email = this.updateUserForm.value.email;
          this.user.username = this.updateUserForm.value.username;
          this.user.password = this.updateUserForm.value.password;
          this.user.resident = this.updateUserForm.value.resident;
          this.user.password2 = this.updateUserForm.value.password2;
  
          try{
            this.firestore.collection('User').doc(this.id).update(Object.assign({}, this.user));
            window.alert("User telah Dikemas Kini!");
            this.router.navigate(['/view-user-detail', this.id]);
            this.updateUserForm.reset();
           }catch(err){
          window.alert("Sila Isikan Maklumat yang Tepat");
        }}
      else{
        window.alert("Kata Laluan mesti sepandan");
      }
      }
      else{
        window.alert("Kata Laluan Mesti Diisikan");
      }}
      else{
        window.alert("Telefon Nombor Mesti Diisikan");
      }}
      else{
        window.alert("Emel Mesti Diisikan");
      }}
      else{
        window.alert("Alamat Peluh Mesti Diisikan");
      }
    }
      
  get updateFromControl() {return this.updateUserForm.controls; }

}
