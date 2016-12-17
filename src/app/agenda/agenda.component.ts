import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { TasksListComponent } from '../taskslist/taskslist.component';
import { TasksService } from '../shared/tasks.service';
import { SnackBarComponent } from '../shared/snackbar/snackbar.component';
import { ConfirmationDialog } from '../shared/confirmationdialog/confirmationdialog.component';


@Component({
  selector: 'agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {
  agendaKey: string = this._route.snapshot.params['agendaKey'];
  agenda;
  
  constructor(private _route: ActivatedRoute,
    private _tasksService: TasksService,
    public dialog: MdDialog,
    public snackBar: SnackBarComponent) { }

  ngOnInit(): void { 
    this.getAgenda();
    var d = new Date();
    console.log("Agenda: "+this.agendaKey);
    //console.log(d.getHours()+":"+d.getMinutes()); 
  }

  getAgenda(): void {
    this.agenda=this._tasksService.getAgenda(this.agendaKey);
  }

}
