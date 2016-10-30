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
import { TasksService } from '../shared/tasks.service';
import { AngularFire, FirebaseListObservable} from 'angularfire2';
import { SnackBarComponent } from '../shared/snackbar/snackbar.component';

@Component({
  selector: 'tasks-list',
  templateUrl: './taskslist.component.html',
  styleUrls: ['./taskslist.component.css'],
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

export class TasksListComponent implements OnInit {
  tasks;
  selectedTask;
  direction: string;
  @Input() agendaKey;
  constructor(public tasksService: TasksService) {
   }

  getTasks(): void {
    this.tasks=this.tasksService.getTasks(this.agendaKey);
  }
  ngOnInit(): void {
    this.getTasks();
  }
  deleteTask(taskKey): void {
    this.tasks.remove(taskKey).then(_ => console.log('Task deleted!'));
    this.selectedTask = null;
    this.direction="out";
  }
}
