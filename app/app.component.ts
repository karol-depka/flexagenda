import { Component } from '@angular/core';

export class Task {
  id: number;
  start: string;
  duration: number;
  title: string;
}
const TASKS: Task[] = [
  { id: 1, start: "08:30", duration: 20, title: 'Eating' },
  { id: 2, start: "09:20", duration: 30, title: 'Cleaning' },
  { id: 3, start: "10:00", duration: 200, title: 'Working' },
];
@Component({
  selector: 'flexagenda',
  template:`
  <h1>{{title}}</h1>
  <h2>My Tasks</h2>
<ul class="tasks">
<li>
<span class="badge">ID</span>
<span class="start">start</span>
<span class="duration">duration</span>
<span class="title">title</span>
</li>
    <!-- each task goes here -->
    <li class="animation" *ngFor="let task of tasks"
[class.selected]="task === selectedTask"
     (click)="onSelect(task)">
<span class="badge">{{task.id}}</span>
<span class="start">{{task.start}}</span>
<span class="duration">{{task.duration}}</span>
<span class="title">{{task.title}}</span>

  </li>
</ul>

  <div *ngIf="selectedTask">
  <h2>ID:{{selectedTask.id}} task details!</h2>
  <div><label>id: </label>{{selectedTask.id}}
  <label>Start: </label>
    <input [(ngModel)]="selectedTask.start" placeholder="start"/>
  <label>Duration: </label>
    <input [(ngModel)]="selectedTask.duration" placeholder="duration"/>
  <label>Title: </label>
    <input [(ngModel)]="selectedTask.title" placeholder="title"/>
    <button (click)="DeleteTask(task)">Delete</button>
  </div>
</div>
<div class="container">
    <h3>Add New Task:</h3>

        <input #newStart placeholder="start" />
        <input #newDuration placeholder="duration" />
        <input #newTitle placeholder="title" />
        <button (click)="addTask(newStart.value,newDuration.value,newTitle.value)">Add Task</button>

</div>


  `
})
export class AppComponent {
  title = 'Flexible Agenda App';
  tasks = TASKS;
  selectedTask: Task;

onSelect(task: Task): void {
  this.selectedTask = task;
}

addTask(start,duration,title){
      this.tasks.push({
        id:this.tasks.length+1,
        start:start,
        duration:duration,
        title:title});
   }
DeleteTask(task: Task): void {
 this.tasks.splice(this.tasks.indexOf(this.selectedTask),1);
 this.selectedTask = null;
}

}
