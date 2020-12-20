import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../app/service/auth.service'
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
      if (this.isNotLoggedIn()) {      
        return true;      
      }
      else{
        return false;
      }  
    }

      public isNotLoggedIn(): boolean {      
        let status = false;      
        if (localStorage.getItem('isLoggedIn') == "false"){      
          status = true;
        }    
        else {      
          status = false;      
        }      
        return status;      
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
  
