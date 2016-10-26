import { Component } from '@angular/core';
import { AngularFire,
         AuthProviders,
         AuthMethods } from 'angularfire2';
import { GeneralTasksComponent } from './generaltasks.component';
import { TasksService } from './shared/tasks.service';

@Component({
  selector: 'flexagenda-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TasksService]
})
export class AppComponent {
  title: string = 'Flexible Agenda App';
  constructor(public tasksService: TasksService) {
  }
}
