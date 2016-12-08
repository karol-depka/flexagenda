import { Component, ViewContainerRef } from '@angular/core';
import { AngularFire,
         AuthProviders,
         AuthMethods } from 'angularfire2';
import { AgendasListComponent } from './agendaslist/agendaslist.component';
import { TasksService } from './shared/tasks.service';
import { RouterGuardService } from './shared/router-guard.service';
import { SnackBarComponent } from './shared/snackbar/snackbar.component';

@Component({
  selector: 'flexagenda-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TasksService, RouterGuardService, AgendasListComponent, SnackBarComponent]
})
export class AppComponent {
  title: string = 'Flexible Agenda App';
  constructor(public tasksService: TasksService,
  public agendasList: AgendasListComponent,
  public viewContainerRef: ViewContainerRef
 ) {}
}
