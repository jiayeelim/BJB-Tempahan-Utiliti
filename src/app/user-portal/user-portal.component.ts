import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-portal',
  templateUrl: './user-portal.component.html',
  styleUrls: ['./user-portal.component.css']
})
export class UserPortalComponent implements OnInit {

  name: string;

  constructor(private router: Router,public authService: AuthService) {

    if(this.isLoggedIn()) {
      this.name = localStorage.getItem('name');
    }
   }

  ngOnInit(): void {
  }

  isLoggedIn(){
    if(localStorage.getItem('isLoggedIn') == "true"){
      return true;
    }

    return false;
  }

  logout(): void {
    console.log("Logout");
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
