import { Component,
   OnInit,
   trigger,
   state,
   animate,
   transition,
   style,
   Input,
   Directive
 } from '@angular/core';
import { TasksService } from './shared/tasks.service';
import { TaskFormComponent } from './taskform.component';
import { AngularFire, FirebaseListObservable} from 'angularfire2';

@Component({
  selector:'general-tasks',
  templateUrl: './generaltasks.component.html',
  styleUrls: ['./generaltasks.component.css'],
animations: [
  trigger('flyInOut', [
    state('*', style({transform: 'translateY(0)'})),
    transition('void => *',[
      style({transform: 'translateY(-100%)'}),
      animate(200)
    ]),
    transition('* => void', [
      animate(200, style({transform: 'translateY(-100%)'}))
    ])
  ])
],
providers: [TasksService]
})

export class GeneralTasksComponent implements OnInit {
  tasks;
  selectedTask;
  direction: string;
  constructor(public tasksService: TasksService) {
   }

  getTasks(): void {
    this.tasks=this.tasksService.getTasks();
  }
  ngOnInit(): void {
    this.getTasks();
  }
  deleteTask(key): void {
    this.tasks.remove(key).then(_ => console.log('task deleted!'));
    this.selectedTask = null;
    this.direction="out";
  }

}
