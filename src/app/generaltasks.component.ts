import { Component,
   OnInit,
   trigger,
   state,
   animate,
   transition,
   style } from '@angular/core';
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
  constructor(private _tasksService: TasksService) {
   }

  getTasks(): void {
    this._tasksService.getTasks().then(tasks=>this.tasks=tasks);
  }
  ngOnInit(): void {
    this.getTasks();
  }
  deleteTask(key): void {
    //console.log(task.$key);
    this.tasks.remove(key).then(_ => console.log('item deleted!'));
    //this.tasks.splice(this.tasks.indexOf(task),1);
    this.selectedTask = null;
    this.direction="out";
  }
  updateTask(key,updateKey,updateValue): void {
    //console.log(update);
    this.tasks.update(key,{[updateKey]:updateValue}).then(_ => console.log('item updated!'));;
  }
}
