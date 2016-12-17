import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthService {

  constructor(public af: AngularFire,
              public router: Router) { }

  redirectUrl: string;  
  login(uEmail,uPassword) {
    this.af.auth.login({
      email: uEmail,
      password: uPassword,});
    this.af.auth.subscribe(user=>{    
      if(user) {console.log("Logged in as: "+uEmail); 
                this.router.navigate([this.redirectUrl]);}

    }) 
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
