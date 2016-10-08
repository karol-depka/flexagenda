import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import {
  AngularFireModule,
  AngularFire,
  AuthMethods,
  AuthProviders} from 'angularfire2';

import { AppComponent } from './app.component';
import { GeneralTasksComponent } from './generaltasks.component';
import { TaskFormComponent } from './taskform.component';
import { AuthComponent } from './auth/auth.component';

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
    GeneralTasksComponent,
    TaskFormComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
