import { Injectable } from '@angular/core';
import { CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot } from '@angular/router';
import { TasksService } from './tasks.service';

@Injectable()
export class RouterGuardService implements CanActivate {

  constructor (private tasksService: TasksService) {
  }

  canActivate() {
    console.log('AuthGuard#canActivate called');
    return (this.tasksService.af.auth ? true : false) 
  }

}
