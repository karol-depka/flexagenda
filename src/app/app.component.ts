import { Component } from '@angular/core';
import { Task } from './shared/task';
import { GeneralTasksComponent } from './generaltasks.component';


@Component({
  selector: 'flexagenda-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']


})
export class AppComponent {
  title: string = 'Flexible Agenda App';
  }
