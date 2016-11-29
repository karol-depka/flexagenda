import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {
  agendaKey: string = this.route.snapshot.params['agendaKey']; 

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.agendaKey);
  }

}
