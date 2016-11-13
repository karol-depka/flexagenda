import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { TasksListComponent } from '../taskslist/taskslist.component';
import { TasksService } from '../shared/tasks.service';
import { SnackBarComponent } from '../shared/snackbar/snackbar.component';
import { ConfirmationDialog } from '../shared/confirmationdialog/confirmationdialog.component';


@Component({
  selector: 'agendas-list',
  templateUrl: './agendaslist.component.html',
  styleUrls: ['./agendaslist.component.css'],
  providers: [TasksService]
})
export class AgendasListComponent implements OnInit {
  agendas;
  lastActiveAgendaKey: string = null;
  dialogRef: MdDialogRef<ConfirmationDialog>;

  constructor( public tasksService: TasksService,
    public dialog: MdDialog,
    public viewContainerRef: ViewContainerRef,
    public snackBar: SnackBarComponent
   ) { }

  ngOnInit(): void {
    this.getAgendas();
    var d = new Date();
    console.log(d.getHours()+":"+d.getMinutes());
  }

  getAgendas(): void {
    this.agendas=this.tasksService.getAgendas();
  }
  now(): string {
    var d = new Date();
    var now = this.tasksService.addZero(d.getHours())+":"+this.tasksService.addZero(d.getMinutes())
    console.log(now);
    return now
  }

  public addNewAgenda() {
    /*
    This function adds newAgenda object to the database.

    */
    var agendasList = this.tasksService.af.database.list('/agendas');
    var newAgendaKey: string;
    var newTaskKey: string;

    newAgendaKey = agendasList.push({
      title: "NEW AGENDA TITLE - click to edit",
      users: "",
      lastActiveAgenda: false,
      startTime:this.now()
    }).key;
    console.log('In agenda: '+newAgendaKey);
    var newAgenda = this.tasksService.af.database.list('/agenda_tasks/'+newAgendaKey);
    newTaskKey = newAgenda.push({
      order:1,
      type:"general",
      duration:10,
      title:"FIRST TASK",
      description:"This is your first task in this agenda. You can edit it as you please.",
      completed:false
    }).key;
    console.log('new task added: '+newTaskKey);
  }
  public deleteAgenda(agendaKey): void {
    var agenda = this.tasksService.af.database.list('/agenda_tasks/');
    agenda.remove(agendaKey);
    this.agendas.remove(agendaKey).then(_ => console.log('Agenda '+agendaKey+' deleted!'));

  }
  public confirmAgendaDelete(agendaKey, message): string {
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
      if (result) { this.deleteAgenda(agendaKey);
      this.snackBar.showSnackBar('Agenda deleted')
     }
      else { console.log('Agenda '+agendaKey+' not deleted.') }
      this.dialogRef = null;

    });
    return message
  }
}
