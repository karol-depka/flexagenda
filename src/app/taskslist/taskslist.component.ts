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
import { MdDialog, MdDialogRef } from '@angular/material';
import { TasksService } from '../shared/tasks.service'
import { SnackBarComponent } from '../shared/snackbar/snackbar.component';
import { ConfirmationDialog } from '../shared/confirmationdialog/confirmationdialog.component';
import {FirebaseListObservable} from "angularfire2";

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
  tasks: FirebaseListObservable<any[]>;
  selectedTask;
  direction: string;
  @Input() agendaKey;
  @Input() activeAgenda;
  @Input() agendaStartTime;
  tasksStartTimes;
  dialogRef: MdDialogRef<ConfirmationDialog>;

  public shallFocusNewTask: boolean;

  constructor(public tasksService: TasksService,
              public dialog: MdDialog,
              public snackBar: SnackBarComponent) {}

  ngOnInit(): void {
    this.getTasks();
    this.calculateStartTimes();
    console.log("AgendaStartTime: " + this.agendaStartTime);
  }

  public confirmTaskDelete(taskKey, message): string {
    /*
    This function opens 'confirmationdialog' for agenda removal
    TODO update for the latest version of material2 when 'dialog' will be released
    https://github.com/angular/material2/blob/master/src/lib/dialog/README.md
    */
    this.dialogRef = this.dialog.open(ConfirmationDialog);

    this.dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) { this.deleteTask(taskKey);
      this.snackBar.showSnackBar('Task deleted.')
     }
      else { console.log('Task ' + taskKey + ' not deleted!') }
      this.dialogRef = null;
    });

    return message
  }

  getTasks(): void {
    if(this.activeAgenda) { this.tasks = this.tasksService.getTasks(this.agendaKey); }
  }

  addNewTask(task, isFirst : boolean): void {
    console.log(`addNewTask: ${task}, ${isFirst}, agenda key: ${this.agendaKey}`);
    this.shallFocusNewTask = true;
    this.tasksService.addNewTask(this.agendaKey, task, isFirst);
    this.snackBar.showSnackBar('New task added');
  }

  deleteTask(taskKey : string): void {
    this.tasks.remove(taskKey).then(_ => console.log('Task ' + taskKey + ' deleted!'));
    this.selectedTask = null;
    this.direction = "out";
  }

  reorderTasks(task, firstLast:boolean, direction: string): void {
    // FIXME: Use of isFirst and isLast should be reconcidered 
   if((direction == "up" && firstLast === false)
   || (direction == "down" && firstLast === false))
    { 
     this.tasksService.reorderTasks(this.agendaKey, task, direction);
     this.snackBar.showSnackBar('Tasks reordered.')
    }
  }

  calculateStartTimes(): void {
    this.tasks.subscribe(tasks => {
      this.tasksStartTimes = [];
      this.tasksStartTimes.push(this.agendaStartTime);
      tasks.forEach(task => {
        this.tasksStartTimes[this.tasksStartTimes.length] =
          this.calculateDuration(task.duration, this.tasksStartTimes[this.tasksStartTimes.length - 1])
      })
    });
  }

  calculateDuration(minutesToAdd=10, previousTime='02:04'): string {
    var temp = previousTime.split(':');
    var d = new Date();

    d.setHours(+temp[0]);
    d.setMinutes(+temp[1] + minutesToAdd);

    var newDuration = this.tasksService.addZero(d.getHours()) +
      ":" + this.tasksService.addZero(d.getMinutes());

    return newDuration
  }

  trackById(index: number, item) {
    return item.$key
  }
}
