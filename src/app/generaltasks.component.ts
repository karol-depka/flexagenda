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
  template:`
  <ul class="tasks">
  <li>
  <span class="badge">ID</span>
  <span class="start">start</span>
  <span class="duration">duration</span>
  <span class="title">title</span>
  </li>
      <!-- each task goes here -->
      <li *ngFor="let task of tasks"
  [class.selected]="task === selectedTask"
  [@flyInOut]="direction"
       (click)="onSelect(task)">
  <span class="badge">{{task.id}}</span>
  <span class="start">{{task.start}}</span>
  <span class="duration">{{task.duration}}</span>
  <span class="title">{{task.title}}</span>
  <span class="description">{{task.description}}</span>
      </li>
  </ul>
  <div *ngIf="selectedTask">
  <h2>ID:{{selectedTask.id}} task details!</h2>
  <div><!--<label>id: </label>{{selectedTask.id}}
  <label>Start: </label>
    <input [(ngModel)]="selectedTask.start" placeholder="start"/>
  <label>Duration: </label>
  <input [(ngModel)]="selectedTask.duration" placeholder="duration"/>
  <label>Title: </label>
    <input [(ngModel)]="selectedTask.title" placeholder="title"/>-->
    <button md-raised-button (click)="DeleteTask(task)">Delete</button>
  </div>
</div>
<button *ngIf="!selectedTask" md-mini-fab (click)="TaskForm.showTaskForm()">
<md-icon class="md-24">add</md-icon></button>
<task-form #TaskForm [tasks]=this.tasks></task-form>
`,
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
  direction;
  constructor(private tasksService: TasksService) { }

  getTasks(): void {
    this.tasksService.getTasks().then(tasks=>this.tasks=tasks);
  }

  ngOnInit(): void {
    this.getTasks();
  }
  onSelect(task: Task): void {
    this.selectedTask = task;
  }
  DeleteTask(task: Task): void {
   this.tasks.splice(this.tasks.indexOf(this.selectedTask),1);
   this.selectedTask = null;
   this.direction="out";
  }
}
