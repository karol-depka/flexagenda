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
import { TasksListComponent } from './taskslist/taskslist.component';
import { SnackBarComponent } from './shared/snackbar/snackbar.component';
import { ConfirmationDialog } from './shared/confirmationdialog/confirmationdialog.component';
import { AgendaComponent } from './agenda/agenda.component';
import { AuthService } from './shared/auth.service';
import { RouterGuardService } from './shared/router-guard.service';
import { TasksService } from './shared/tasks.service';

export const firebaseConfig ={
  apiKey: "AIzaSyBughsAzc9KLbFFGeJxrRlGVh4tvm82r-E",
  authDomain: "flexagenda-a532f.firebaseapp.com",
  databaseURL: "https://flexagenda-a532f.firebaseio.com",
  storageBucket: "flexagenda-a532f.appspot.com",
  messagingSenderId: "825810762567"
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
    TasksListComponent,
    SnackBarComponent,
    ConfirmationDialog,
    AgendaComponent
  ],
  entryComponents: [
   ConfirmationDialog
  ],
  imports: [
    BrowserModule,
    HttpModule,
    MaterialModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),
    RouterModule.forRoot([
      {
        path: 'agendas',
        component: AgendasListComponent,
        canActivate:[RouterGuardService]       
      },      
      {
        path: 'agendas/:agendaKey',
        component: AgendaComponent,
        canActivate:[RouterGuardService]
      },
      {
        path: 'test', //this route is just for tests
        component: TestComponent,
        canActivate:[RouterGuardService]       
      },      
    ])
  ],
  providers: [AuthService, RouterGuardService, TasksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
