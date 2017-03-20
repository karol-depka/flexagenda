import { Injectable } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthService {

  public static uid;

  authObserver = (auth)=>{
      if(auth) {
        AuthService.uid = auth.uid;
        this.router.navigate([this.redirectUrl]);
      }
  }

  constructor(
      public af: AngularFire,
      public router: Router) {
    this.af.auth.subscribe(this.authObserver);
  }

  redirectUrl: string='/agendas';
  login(uEmail,uPassword) {
; // TODO: remove coode duplication with email login
    if (uEmail) {
      this.af.auth.login({
        email: uEmail,
        password: uPassword
      }).then(this.authObserver);
      // TODO: if we press the login button twice, will this happen multiple times?
    }
    else {
      this.af.auth.login({
        provider: AuthProviders.Google,
        method: AuthMethods.Popup
      }).then(this.authObserver);
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

  getUidOrThrow() {
    if (! AuthService.uid) {
      throw new Error("Uid not ready: " + AuthService.uid)
    }
    return AuthService.uid;
  }

}
