import { Component, OnInit } from '@angular/core';
import { AngularFire,
         AuthProviders,
         AuthMethods } from 'angularfire2';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(public af: AngularFire) {
    //this.af.auth.subscribe(auth => console.log(auth));
  }
    login(uEmail,uPassword) {
      this.af.auth.login({
        email: uEmail,
        password: uPassword,});
    }
    logOut() {
      this.af.auth.logout();
      //this.af.auth.subscribe(auth => console.log(auth));
    }

  ngOnInit() {
  }

}//flexagenda_test
