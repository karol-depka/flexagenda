import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthService {

  constructor(public af: AngularFire,
              public router: Router) { }

  isLoggedIn: boolean = false;              
  redirectUrl: string;  
  login(uEmail,uPassword) {
    console.log(this.redirectUrl);
    this.af.auth.login({
      email: uEmail,
      password: uPassword,});
    this.af.auth.subscribe(user=>{    
      if(user) { console.log("Logged in as: "+uEmail);
                this.isLoggedIn = true;}
                this.router.navigate([this.redirectUrl]);
    }) 
  }
  logOut() {
    this.af.auth.logout();
    console.log("Logged out");
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
  test() {
    this.router.navigate(['/test']);
    console.log("test");
  }

}
