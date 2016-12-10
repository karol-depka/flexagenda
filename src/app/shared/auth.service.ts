import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthService {

  constructor(public af: AngularFire,
              public router: Router) { }

  login(uEmail,uPassword) {;
    this.af.auth.login({
      email: uEmail,
      password: uPassword,});
    console.log("Logged in as: "+uEmail);
  }
  logOut() {
    this.af.auth.logout();
    console.log("Logged out");
  }

}
