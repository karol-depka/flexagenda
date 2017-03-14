import { SnackBarComponent } from './../shared/snackbar/snackbar.component';
import { MdDialog } from '@angular/material';
import { TasksService } from './../shared/tasks.service';
import { TasksListComponent } from './../taskslist/taskslist.component';
import {
    AfterViewInit,
    animate,
    Component,
    Input,
    OnInit,
    Renderer,
    state,
    style,
    transition,
    trigger
} from '@angular/core';

@Component({
  selector: 'task-list-no-drag',
    templateUrl: '../taskslist/taskslist.component.html',
    styleUrls: ['../taskslist/taskslist.component.css'],
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
export class TaskListNoDragComponent extends TasksListComponent {
  constructor(
      tasksService: TasksService,
      dialog: MdDialog,
      snackBar: SnackBarComponent,
      /*private dragulaService: DragulaService*/) {
    super(tasksService, dialog, snackBar);
  }

}
