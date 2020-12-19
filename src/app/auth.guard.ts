import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../app/auth.service'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    private router : Router
    ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> |

    boolean {
      if(this.authService.isLoggedIn !== true) {
        this.router.navigate(['/login'])
      }
      return true;
    /*let url: string = state.url;  
    return this.verifyLogin(url);*/
      }

  verifyLogin(url) : boolean{
    if(!this.isLoggedIn()){
      this.router.navigate(['/login']);
      return false;
    }
    else if(this.isLoggedIn()){
          return true;
    }
    throw new Error('Invalid value');
  }

  public isLoggedIn(): boolean{
    let status = false;
    if( localStorage.getItem('isLoggedIn') == "true"){
      status = true;
    }
    else{
      status = false;
    }
    return status;
  }

  
}
  
