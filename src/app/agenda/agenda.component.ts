import { AgendasService } from './../shared/agendas.service';
import { TaskTreeComponent } from './../taskTree/taskTree.component';
import { Component, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('taskTree') taskListComponent: TasksListComponent

  constructor(private _route: ActivatedRoute,
              private _tasksService: TasksService,
              private agendasService: AgendasService,
              public dialog: MdDialog,
              public snackBar: SnackBarComponent) {
  }

  ngOnInit(): void {
    this.getAgenda();
    var d = new Date();
    console.log("Agenda: " + this.agendaKey);
    //console.log(d.getHours()+":"+d.getMinutes());
  }

  getAgenda(): void {
    this.agenda = this._tasksService.getAgenda(this.agendaKey);
  }

  updateTime(time): void {
    this.agendasService.updateAgenda(this.agendaKey, 'startTime', time, 'string');
    this.taskListComponent.calculateStartTimes(time);
    // this.taskListComponent.calculateStartTimes(time); // HACK
    this.snackBar.showSnackBar('Agenda updated.');
  }

  updateTimeToNow(): void {
    var timeNow = this._tasksService.timeNow();
    // console.log("agenda key: " + this.agendaKey);
    this.updateTime(timeNow);
  }

  updateTitle(title): void {
    this.agendasService.updateAgenda(this.agendaKey, 'title', title, 'string');
    this.snackBar.showSnackBar('Agenda updated.')
  }
}
