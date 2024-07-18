import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
//import { LoginService } from '../login/login.service';
 //import { AuthService } from './auth.service';
import { AuthTokenService } from '../login/auth-token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    //constructor(private authTokenService: LoginService, private router: Router ){}
    constructor(private authTokenService:AuthTokenService
      , private router: Router ){}

  canActivate(

    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      console.log("In Active Auth Guard");
      if (this.authTokenService.getIsAuthenticated() && localStorage.getItem('user')){

        console.log("In insde Active Auth Guard");
        return true;

        }

      this.router.navigate(['']);
      return false;
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      console.log("In DEActive Auth Guard");
      if (this.authTokenService.getIsAuthenticated()){
        console.log("In insde DeActive Auth Guard");
        return true;
      }
      this.router.navigate(['']);
    }


}