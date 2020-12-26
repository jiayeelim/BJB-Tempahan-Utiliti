import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { User } from '../models/user';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Location } from '@angular/common';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  user: User = new User();
  route_url: Array<string> = [];
  username: string;
  id: string;
  name: string;

  updateUserForm: FormGroup;

  constructor(
    private router: Router, 
    private actRoute: ActivatedRoute, 
    private firestore: AngularFirestore,
    private userService: UserService) {

    //console.log(this.router.url);
    this.route_url = this.router.url.split('/');
    this.id = this.route_url[2];

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

      this.updateUserForm = new FormGroup({
        address1: new FormControl(this.user.address1),
        address2: new FormControl(this.user.address2),
        postcode: new FormControl(this.user.postcode),
        state: new FormControl(this.user.state),
        phone: new FormControl(this.user.phone),
        email: new FormControl(this.user.email),
      });
    });
  }

  ngOnInit(): void {
    this.updateUser();
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.userService.getUser(id).valueChanges().subscribe(data => {
      this.updateUserForm.setValue(data)
    })
  }

  updateUser(){
    //this.user.name = this.updateUserForm.value.name;
    this.user.address1 = this.updateUserForm.value.address1;
    this.user.address2 = this.updateUserForm.value.address2;
    this.user.state = this.updateUserForm.value.state;
    this.user.postcode = this.updateUserForm.value.postcode;
    this.user.phone = this.updateUserForm.value.phone;
    this.user.email = this.updateUserForm.value.email;

    try {
      if(this.user.email !== ""){
      this.firestore.collection('User').doc(this.id).update(Object.assign({}, this.user));
      window.alert("User telah Dikemas Kini!");
      this.updateUserForm.reset();
      this.router.navigate(['/view-user-detail']);
      }
      else{
        window.alert("Error! ");
      }
    }
    catch(err){
      console.log(err);
    }
  }

}
