import { Injectable } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthService {

  constructor(public af: AngularFire,
              public router: Router) {}

  redirectUrl: string='/agendas';  
  login(uEmail,uPassword) {
    if (uEmail) {
      this.af.auth.login({
        email: uEmail,
        password: uPassword
      }).then(()=>{this.router.navigate([this.redirectUrl])});
    }
    else {
      this.af.auth.login({
        provider: AuthProviders.Google,
        method: AuthMethods.Popup
      }).then(()=>this.router.navigate([this.redirectUrl]))
    }
  }
  logOut() {
    this.router.navigate(['/login']);
    this.af.auth.logout();
    console.log("Logged out");
  }
  test() {
    this.router.navigate(['/test']);
    console.log("test");
  }

}
