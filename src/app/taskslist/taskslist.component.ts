import { Component, OnInit, OnChanges, ViewContainerRef,
   trigger,
   state,
   animate,
   transition,
   style,
   Input,
   Directive
 } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { TasksService } from '../shared/tasks.service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { SnackBarComponent } from '../shared/snackbar/snackbar.component';
import { ConfirmationDialog } from '../shared/confirmationdialog/confirmationdialog.component';

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
  @Input() activeAgenda;
  @Input() agendaStartTime;
  tasksStartTimes;
  dialogRef: MdDialogRef<ConfirmationDialog>;

  constructor(public tasksService: TasksService,
              public dialog: MdDialog,
              public viewContainerRef: ViewContainerRef,
              public snackBar: SnackBarComponent) {}

  getTasks(): void {
    if(this.activeAgenda) {
    this.tasks = this.tasksService.getTasks(this.agendaKey);
  }
  }
  ngOnInit(): void {
    this.getTasks();
    this.calculateStartTimes();
    //this.calculateSeconds();
  }
  calculateStartTimes(): void {
    this.tasks.subscribe(tasks =>{
      this.tasksStartTimes = [];
      this.tasksStartTimes.push(this.agendaStartTime);
     tasks.forEach(task=>
       {this.tasksStartTimes[this.tasksStartTimes.length] =
         this.calculateDuration(task.duration,
                            this.tasksStartTimes[this.tasksStartTimes.length-1])
     console.log(this.tasksStartTimes);
   }
    )
    });
  }
  calculateDuration(minutesToAdd=10, previousTime='02:04'): string {
    var temp = previousTime.split(':'); // split it at the colons
    var d = new Date();
    d.setHours(+temp[0]);
    d.setMinutes(+temp[1]+minutesToAdd);
    var newDuration = this.tasksService.addZero(d.getHours())+":"+this.tasksService.addZero(d.getMinutes());
    return newDuration
  }
  deleteTask(taskKey): void {
    this.tasks.remove(taskKey).then(_ => console.log('Task '+taskKey+' deleted!'));
    this.selectedTask = null;
    this.direction="out";
  }
  public confirmTaskDelete(taskKey, message): string {
    /*
    This function opens 'confirmationdialog' for agenda removal
    TODO update for the latest version of material2 when 'dialog' will be released
    https://github.com/angular/material2/blob/master/src/lib/dialog/README.md
    */
    let configDialog = new MdDialogConfig();
    configDialog.viewContainerRef = this.viewContainerRef;
    this.dialogRef = this.dialog.open(ConfirmationDialog, configDialog);

    this.dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) { this.deleteTask(taskKey);
      this.snackBar.showSnackBar('Task deleted')
     }
      else { console.log('Task '+taskKey+' not deleted.') }
      this.dialogRef = null;

    });
    return message
  }
}
