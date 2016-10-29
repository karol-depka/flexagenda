import { Component, OnInit } from '@angular/core';
import { TasksService } from '../shared/tasks.service';
import { GeneralTasksComponent } from '../generaltasks.component';
import { TaskFormComponent } from '../taskform.component';

@Component({
  selector: 'agendas-list',
  templateUrl: './agendaslist.component.html',
  styleUrls: ['./agendaslist.component.css'],
  providers: [TasksService]
})
export class AgendasListComponent implements OnInit {
  agendas;
  constructor(public tasksService: TasksService) { }
  isGeneralVisible: boolean = false;
  ngOnInit(): void {
    this.getAgendas();
  }

  getAgendas(): void {
    this.agendas=this.tasksService.getAgendas();
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
      lastActive: false
    }).key;
    console.log(newAgendaKey);
    var newAgenda = this.tasksService.af.database.list('/agenda_tasks/'+newAgendaKey);
    newTaskKey = newAgenda.push({
      order:1,
      type:"general",
      start:"00:00",
      duration:"10",
      title:"FIRST TASK",
      description:"This is your first task in this agenda. You can edit it as you please.",
      completed:false
    }).key;
    console.log(newTaskKey);
  }
  public deleteAgenda(agendaKey): void {
    this.isGeneralVisible=false;
    var agenda = this.tasksService.af.database.list('/agenda_tasks/');
    agenda.remove(agendaKey);
    this.agendas.remove(agendaKey).then(_ => console.log('Agenda deleted!'));

  }
}