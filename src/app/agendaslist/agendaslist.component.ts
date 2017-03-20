import { AgendasService } from './../shared/agendas.service';
import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Router }   from '@angular/router';
import { TasksListComponent } from '../taskslist/taskslist.component';
import { TasksService } from '../shared/tasks.service';
import { SnackBarComponent } from '../shared/snackbar/snackbar.component';
import { ConfirmationDialog } from '../shared/confirmationdialog/confirmationdialog.component';
import { AuthService } from '../shared/auth.service';


@Component({
  selector: 'agendas-list',
  templateUrl: './agendaslist.component.html',
  styleUrls: ['./agendaslist.component.css'],
  providers: [TasksService]
})
export class AgendasListComponent implements OnInit {
  agendas;
  dialogRef: MdDialogRef<ConfirmationDialog>;

  constructor(
    public authService: AuthService,
    public tasksService: TasksService,
    public agendasService: AgendasService,
    public dialog: MdDialog,
    public snackBar: SnackBarComponent,
    private router: Router,
   ) { }

  ngOnInit(): void {
    this.getAgendas();
    var d = new Date();
    console.log(d.getHours()+":"+d.getMinutes());
  }

  getAgendas(): void {
    this.agendas=this.tasksService.getAgendas();
  }

  public addNewAgenda() {
    this.agendasService.addNewAgenda();
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
    this.dialogRef = this.dialog.open(ConfirmationDialog);

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
  gotoAgenda(agendaKey): void {
    this.router.navigate(['/agendas',agendaKey]);
  }

  updateObject(key,property,value,message): void {
    this.tasksService.updateObject('agenda',key,property,value, 'string')
    if (message != null) this.snackBar.showSnackBar(message);
  }

  trackById(index: number, item) {
    return item.$key
  }
}
