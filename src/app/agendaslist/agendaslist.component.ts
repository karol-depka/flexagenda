import { Component, OnInit } from '@angular/core';
import { TasksService } from '../shared/tasks.service';

@Component({
  selector: 'agendas-list',
  templateUrl: './agendaslist.component.html',
  styleUrls: ['./agendaslist.component.css'],
  providers: [TasksService]
})
export class AgendasListComponent implements OnInit {
  agendas;
  constructor(public tasksService: TasksService) { }

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
    agendasList.push({
      title: "NEW AGENDA TITLE",
      users: "",
      lastActive: false
    });
  }

}
