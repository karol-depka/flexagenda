import { Injectable } from '@angular/core';
import { AngularFire,
         FirebaseListObservable,
         FirebaseObjectObservable } from 'angularfire2';

@Injectable()
export class TasksService {
  TASKS: FirebaseListObservable<any[]>;
  taskOrder: FirebaseListObservable<any[]>;
  orderSubscription;
  TasksCount: number;
  constructor(public af:AngularFire) {
    //this.af.auth.subscribe(auth => console.log(auth));
    this.TASKS = af.database.list('/tasks',{
      preserveSnapshot: false,
      query: {
        orderByChild: 'order'
        }
    });
  }
  public getTasks(): FirebaseListObservable<any[]> {
    return this.TASKS;
  }
  public getTasksOrder() {
    this.TASKS
      .subscribe(tasks => {
    tasks.forEach(task => {
      //this.TasksOrder.push({task.$key: task.order});
      //console.log("Key: "+task.$key+" Order: "+task.order);
      //console.log(snapshot.val())
    });
  })
  //console.log(this.TasksOrder);
  }
  public reorderTasks(task,index) {
    console.log(task);
    var temp = {};
    var updates = {};
    var test = {};
    this.taskOrder = this.af.database.list('/tasks',
    { preserveSnapshot:true,
      query: {
        orderByChild: 'order',
        limitToFirst: 2,
        startAt: index
        }
     });
    this.orderSubscription=this.taskOrder
      .subscribe(tasks =>{
        tasks.forEach(
          task=>{temp[task.val().order-index]=task.key})
      });
      //console.log(temp);
      updates[temp[0]]={order: index+1};
      updates[temp[1]]={order: index};
      console.log(updates);
      this.orderSubscription.unsubscribe();
      //console.log(temp[0]);
      //console.log(updates[temp[0]].order);
    //this.TASKS.update(key,{order:step}).then(_ => console.log('item updated!'));
    this.taskOrder.update(temp[0],{order:index+1}).then(_ => console.log(temp[0]+' task moved down!'));
    this.taskOrder.update(temp[1],{order:index}).then(_ => console.log(temp[1]+' task moved up!'));
  }
  public getTasksCount(): number {
    this.TASKS.subscribe(tasks=>this.TasksCount=tasks.length);
    //console.log(Promise.resolve(this.TasksCount));
    return this.TasksCount
  }
  login(uEmail,uPassword) {;
    this.af.auth.login({
      email: uEmail,
      password: uPassword,});
  }
  logOut() {
    this.af.auth.logout();
    this.af.auth.subscribe(auth => console.log(auth));
  }
}
