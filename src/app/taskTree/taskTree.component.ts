import { SnackBarComponent } from './../shared/snackbar/snackbar.component';
import { MdDialog } from '@angular/material';
import { TasksService } from './../shared/tasks.service';
import { Component } from '@angular/core';
import { TasksListComponent } from './../taskslist/taskslist.component';

@Component({
  selector: 'task-tree',
    templateUrl: './taskTree.component.html',
    styleUrls: ['./taskTree.component.css'],
    // animations: [
    //   trigger('flyInOut', [
    //     state('*', style({transform: 'translateY(0)'})),
    //     transition('void => *',[
    //       style({transform: 'translateY(-100%)'}),
    //       animate(200)
    //     ]),
    //     transition('* => void', [
    //       animate(200, style({transform: 'translateY(-100%)'}))
    //     ])
    //   ])
    // ],
    providers: [TasksService]
})
export class TaskTreeComponent extends TasksListComponent {
  constructor(
      tasksService: TasksService,
      dialog: MdDialog,
      snackBar: SnackBarComponent,
      /*private dragulaService: DragulaService*/) {
    super(tasksService, dialog, snackBar);
  }
}
