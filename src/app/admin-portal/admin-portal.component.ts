import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-portal',
  templateUrl: './admin-portal.component.html',
  styleUrls: ['./admin-portal.component.css']
})
export class AdminPortalComponent implements OnInit {

  constructor(private router: Router,public authService: AuthService) { }

  ngOnInit() {
    //this.username = localStorage.getItem('token');
  }

  isLoggedIn(){
    if(localStorage.getItem('isLoggedIn') == "true"){
      return true;
    }
    else{
    window.alert('Sila log masuk.');
    this.router.navigate(['/login']);
    }
  }

  logout(): void {
    /*console.log("Logout");
    this.authService.logout();
    this.router.navigate(['/login']);*/
    var selection = confirm("Adakah anda pasti log keluar?");
    if(selection == true){
    console.log("Logout");
    this.authService.logout();
    this.router.navigate(['']);
  }
  }

}
