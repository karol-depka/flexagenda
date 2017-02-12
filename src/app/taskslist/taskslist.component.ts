import { Component, OnInit, OnChanges,
   trigger,
   state,
   animate,
   transition,
   style,
   Input,
   Directive
 } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
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
              public snackBar: SnackBarComponent) {}

  ngOnInit(): void {
    this.getTasks();
    this.calculateStartTimes();
    console.log("AgendaStartTime: " + this.agendaStartTime);    
  }

  getTasks(): void {
    if(this.activeAgenda) { this.tasks = this.tasksService.getTasks(this.agendaKey); }
  }  

  calculateStartTimes(): void {
    this.tasks.subscribe(tasks =>{
      this.tasksStartTimes = [];
      this.tasksStartTimes.push(this.agendaStartTime);
     tasks.forEach(task=>
       {this.tasksStartTimes[this.tasksStartTimes.length] =
         this.calculateDuration(task.duration, this.tasksStartTimes[this.tasksStartTimes.length-1])
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
    this.tasks.remove(taskKey).then(_ => console.log('Task ' + taskKey + ' deleted!'));
    this.selectedTask = null;
    this.direction="out";
  }

  updateObject(key,property,value,type, message): void {
    this.tasksService.updateObject('task', key, property, value, type);
    if (message != null) this.snackBar.showSnackBar(message);    
  }

  addNewTask(agendaKey, task, isFirst): void {
    this.tasksService.addNewTask(agendaKey, task, isFirst);
    this.snackBar.showSnackBar('New task added');
  }
  reorderTasks(agendaKey, task, direction): void {
    this.tasksService.reorderTasks(agendaKey, task, direction);
    this.snackBar.showSnackBar('Tasks reordered.')
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
      else { console.log('Task '+taskKey+' not deleted.') }
      this.dialogRef = null;

    });
    return message
  }
}
