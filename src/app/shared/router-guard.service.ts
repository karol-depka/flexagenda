import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { FirebaseAuth, FirebaseAuthState } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';

@Injectable()
export class RouterGuardService implements CanActivate {

  constructor (public authService: AuthService,
               private auth: FirebaseAuth,
               private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    console.log("Original URL: "+url);
    return this.checkLogin(url);
  }
  checkLogin(url: string): boolean {
    this.authService.redirectUrl = url;
    if (this.authService.isLoggedIn) {
      console.log(this.authService.isLoggedIn) ;
      //this.router.navigate([url]);
      return true; }
    // Navigate to the login page with extras
    return false;
  }

}