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

  updateUserForm = this.formBuilder.group({
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
  }, {
    validator: this.registerService.MatchPassword('password', 'comfirmPassword')
  })

  submitted = false;
  stateList: any = ['Johor', 'Kedah', 'Kelantan', 'Malacca', 'Negeri Sembilan', 'Pahang', 'Penang', 'Perak', 'Sabah', 'Sarawak', 'Selangor', 'Terengganu']

  constructor(
    private router: Router, 
    private actRoute: ActivatedRoute, 
    private firestore: AngularFirestore,
    private formBuilder: FormBuilder,
    public registerService:RegisterService, 
    private userService: UserService) {

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
      this.user.password = data.password;
      this.user.password2 = data.password2;
    });
  }

  ngOnInit(): void {
  }

  updateUser(){
   
      if(this.updateUserForm.value.password == this.updateUserForm.value.password2){
        this.user.address1 = this.updateUserForm.value.address1;
        this.user.address2 = this.updateUserForm.value.address2;
        this.user.state = this.updateUserForm.value.state;
        this.user.postcode = this.updateUserForm.value.postcode;
        this.user.phone = this.updateUserForm.value.phone;
        this.user.email = this.updateUserForm.value.email;
        this.user.password = this.updateUserForm.value.password;

        try{
          this.firestore.collection('User').doc(this.id).update(Object.assign({}, this.user));
          window.alert("User telah Dikemas Kini!");
          this.updateUserForm.reset();
         }catch(err){
      console.log(err);
      }}
      else{
        window.alert("Kata Laluan mesti sepandan");
      }
    }

  get updateFromControl() {return this.updateUserForm.controls; }

}
