import { Directive,
  OnInit,
  trigger,
  state,
  Input
 } from '@angular/core';
import { TasksService } from '../shared/tasks.service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Directive({
  selector: 'task',
  providers: [TasksService],
})

export class TaskDirective implements OnInit {
  tasks;
  @Input() agendaKey;
  @Input() activeAgenda;
  @Input() agendaStartTime;

  constructor(public tasksService: TasksService) {}

  ngOnInit(): void {
    this.getTasks();
    console.log("AgendaStartTime: " + this.agendaStartTime);
  }

  getTasks(): void {
    if(this.activeAgenda) { this.tasks = this.tasksService.getTasks(this.agendaKey); }
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
}
