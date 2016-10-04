import { Component,
   OnInit,
   trigger,
   state,
   animate,
   transition,
   style } from '@angular/core';
import { Task } from './shared/task';
import { TasksService } from './shared/tasks.service';
import { TaskFormComponent } from './taskform.component';

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
    tasks: Task[];
  selectedTask: Task;
  direction: string;
  constructor(private tasksService: TasksService) { }

  getTasks(): void {
    this.tasksService.getTasks().then(tasks=>this.tasks=tasks);
  }
  ngOnInit(): void {
    this.getTasks();
  }
  DeleteTask(task: Task): void {
   this.tasks.splice(this.tasks.indexOf(task),1);
   this.selectedTask = null;
   this.direction="out";
  }
}
