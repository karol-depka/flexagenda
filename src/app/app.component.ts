import { Component } from '@angular/core';
import { AngularFire,
         AuthProviders,
         AuthMethods } from 'angularfire2';

import { Task } from './shared/task';
import { GeneralTasksComponent } from './generaltasks.component';
import { AuthComponent } from './auth/auth.component';


@Component({
  selector: 'flexagenda-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']


})
export class AppComponent {
  title: string = 'Flexible Agenda App';
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
      this.af.auth.subscribe(auth => console.log(auth));
    }
  }
