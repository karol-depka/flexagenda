import { Component,
  OnInit,
  Input,
  Host
 } from '@angular/core';
import { TasksService } from '../shared/tasks.service';
import { SnackBarComponent } from '../shared/snackbar/snackbar.component';
import { TasksListComponent } from "../taskslist/taskslist.component";

@Component({
  selector: 'task',
  templateUrl: './task.component.html',
  providers: [TasksService, TasksListComponent]
})

export class TaskComponent {
  tasks;
  // @Input() agendaKey;
  // @Input() activeAgenda;
  // @Input() agendaStartTime;
  @Input() task;
  @Input() taskList: TasksListComponent;

  constructor(public tasksService: TasksService,
              public snackBar: SnackBarComponent
              // @Host() public parent: TasksListComponent
   ) {}

  calculateDuration(minutesToAdd=10, previousTime='02:04'): string {
    var temp = previousTime.split(':');
    var d = new Date();
    d.setHours(+temp[0]);
    d.setMinutes(+temp[1] + minutesToAdd);

    var newDuration = this.tasksService.addZero(d.getHours()) +
      ":" + this.tasksService.addZero(d.getMinutes());

    return newDuration
  }

  updateObject(key, property, value, type, message): void {
    this.tasksService.updateObject('task', key, property, value, type);
    if (message != null) this.snackBar.showSnackBar(message);
  }
}
