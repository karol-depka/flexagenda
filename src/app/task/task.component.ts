import { Component,
  OnInit,
  Input
 } from '@angular/core';
import { TasksService } from '../shared/tasks.service';
import { SnackBarComponent } from '../shared/snackbar/snackbar.component';
import { TasksListComponent } from "../taskslist/taskslist.component";

@Component({
  selector: 'task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  providers: [TasksService, TasksListComponent]
})

export class TaskComponent implements OnInit {
  tasks;
  @Input() task;
  @Input() tasksListComponent: TasksListComponent;
  @Input() taskIndex;
  @Input() isFirst;
  @Input() isLast;
  tasksService: TasksService;

  constructor(public snackBar: SnackBarComponent) { }

  ngOnInit() {
    this.tasksService = this.tasksListComponent.tasksService;
   }

  updateObject(key, property, value, type, message): void {
    this.tasksService.updateObject('task', key, property, value, type);
    if (message != null) this.snackBar.showSnackBar(message);
  }
}
