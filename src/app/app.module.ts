import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { RouterModule }   from '@angular/router';
import {
  AngularFireModule,
  AngularFire,
  AuthMethods,
  AuthProviders} from 'angularfire2';

import { AppComponent } from './app.component';
import { TestComponent } from './test.component';
import { AgendasListComponent } from './agendaslist/agendaslist.component';
import { TaskComponent } from './task/task.component';
import { TasksListComponent } from './taskslist/taskslist.component';
import { SnackBarComponent } from './shared/snackbar/snackbar.component';
import { ConfirmationDialog } from './shared/confirmationdialog/confirmationdialog.component';
import { AgendaComponent } from './agenda/agenda.component';
import { AuthService } from './shared/auth.service';
import { RouterGuardService } from './shared/router-guard.service';
import { TasksService } from './shared/tasks.service';
import { LoginComponent } from './shared/login/login.component';
import { TreeModule } from 'angular-tree-component';


export const firebaseConfig ={
  apiKey: "AIzaSyCUkZPJQS8aOMDBNi0gDmC8XGM9-BC-BxI",
  authDomain: "flexagenda-1782e.firebaseapp.com",
  databaseURL: "https://flexagenda-1782e.firebaseio.com",
  storageBucket: "flexagenda-1782e.appspot.com",
  messagingSenderId: "994212923829"
}

const firebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    AgendasListComponent,
    TaskComponent,
    TasksListComponent,
    SnackBarComponent,
    ConfirmationDialog,
    AgendaComponent,
    LoginComponent
  ],
  entryComponents: [
   ConfirmationDialog
  ],
  imports: [
    BrowserModule,
    HttpModule,
    TreeModule,
    MaterialModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: 'agendas',
        pathMatch: 'full',
        canActivate:[ RouterGuardService ]
      },
      {
        path: 'agendas',
        component: AgendasListComponent,
        canActivate:[ RouterGuardService ]
      },
      {
        path: 'agendas/:agendaKey',
        component: AgendaComponent,
        canActivate:[ RouterGuardService ]
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: '**', //
        redirectTo: '',
        canActivate:[ RouterGuardService ]
      },
    ])
  ],
  providers: [AuthService, RouterGuardService, TasksService],
  bootstrap: [AppComponent] // TODO: add AuthService as singleton to bootstrap?
})
export class AppModule { }
