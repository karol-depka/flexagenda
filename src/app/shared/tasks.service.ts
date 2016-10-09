import { Injectable } from '@angular/core';
import { AngularFire,
         FirebaseListObservable,
         FirebaseObjectObservable} from 'angularfire2';

//import { Task } from './task';

@Injectable()
export class TasksService {
  TASKS: FirebaseListObservable<any[]>;
  constructor(af:AngularFire) {
    this.TASKS = af.database.list('tasks');
  }
  public getTasks(): Promise<any[]> {
    //this.TASKS.subscribe(TASKS=>console.log(TASKS));
    return Promise.resolve(this.TASKS);
  }
}
