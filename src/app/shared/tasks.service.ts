import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { Injectable, ViewContainerRef } from '@angular/core';
import { AngularFire,
         FirebaseListObservable,
         FirebaseObjectObservable } from 'angularfire2';

@Injectable()
export class TasksService {
  TASKS: FirebaseListObservable<any[]>;
  AGENDAS_: FirebaseListObservable<any[]>; // lazy
  taskOrder: FirebaseObjectObservable<any[]>;
  TasksCount: number;

  constructor(
      public af:AngularFire,
      public authService : AuthService
      ) {
    //this.af.auth.subscribe(auth => console.log(auth));
    // var uid = this.authService.getUidOrThrow()
    // if ( ! uid ) {
      // console.log(" ! this.authService.uid ",  uid );
    // }
  }

  /*
  public getTasks(): FirebaseListObservable<any[]> {
    return this.TASKS;
  }*/

  public getTasks(agendaKey): FirebaseListObservable<any[]> {
    this.TASKS = this.af.database.list('/agenda_tasks/' + agendaKey,
      {query: {orderByChild: 'order'} });
    console.log("tasks list for agenda: " + this.TASKS)

    return this.TASKS;
  }

  public getAgenda(agendaKey : string): FirebaseObjectObservable<any[]> {
    var agenda: FirebaseObjectObservable<any[]>;
    agenda = this.af.database.object('/Agenda/' + agendaKey); // FIXME: duplication

    return agenda;
  }

  public addNewTask(agendaKey : string, task, isFirst : boolean) : string {
    /*
    This function adds newTask object to the database.
    If no 'task' is provided newTask is added at the end of TASKS list.
    If 'task' is provided specific newTaskOrder is calculated
    with 'getNewTaskOrder' function.
    */
    var newOrder: number
    console.log(`TasksService: addNewTask: ${agendaKey}, ${task}, ${isFirst}`);

    newOrder = this.getNewTaskOrder(agendaKey,task,isFirst);
    var newTaskId = this.TASKS.push({
      order:newOrder,
      type:"general",
      duration:10,
      title:"",
      description:"",
      completed:false
    });
    return newTaskId.key;
  }

  public getNewTaskOrder(agendaKey : string, task, isFirst : boolean): any {
    if ( !task && isFirst ) {
      return 1;
    }
    /*
    This function prepares existing tasks to compare for 'calculateNewOrder' function.
    */
    var ordersArray=[];
    var newOrder: number = 0;
    //console.log(newOrder);
    var orderSubscription;
    var taskOrder: FirebaseListObservable<any[]>;
    // console.log(task.$key);
    if(isFirst) console.log(isFirst);
    taskOrder = this.af.database.list('/agenda_tasks/' + agendaKey,
    { preserveSnapshot:true,
      query: {
        orderByChild: 'order',
        limitToLast: 2,
        endAt: task ? task.order : null
        }
     });
     orderSubscription = taskOrder
      .subscribe(tasks => {
        tasks.forEach(task=> {
          {ordersArray.push(task.val().order)}
          console.log(task.key)}
        )
       });
       // FIXME: RACE CONDITION: ordersArray might not yet be initialized
       orderSubscription.unsubscribe();
       if (task) {
         return this.calculateNewTaskOrder(ordersArray,isFirst);
       } else {
         return ordersArray[ordersArray.length-1] + 1; // FIXME: add new task if zero tasks does not work yet
       }

  }

  public calculateNewTaskOrder(ordersArray, isFirst): number {
    /*
    This function calculates and returns NewTaskOrder.
    If task 'isFirst', newTaskOrder will be set at the beginning of the list.
    If task '!isFirst', newTaskOrder will be set between compared existing tasks
    order's.
    */
    var newOrder: number = 0;
    isFirst ? newOrder=ordersArray[ordersArray.length-1]/2 : (
      newOrder=(ordersArray[ordersArray.length-1]+ordersArray[ordersArray.length-2])/2
    )

    return newOrder
  }

  public reorderQuery(agendaKey, task, direction): FirebaseListObservable<any[]> {
    /*
    This functions queries DB for list of 2 tasks.
    */
    var dynQuery:any = {};
    dynQuery.orderByChild = 'order';
    var tasksList: FirebaseListObservable<any[]>;
    if (direction==='up') {
    /* If direction==='up' retrieves clicked and previous task
    (limits query to last 2 records with last one ending at order='task.order'
    sorted by 'order')
    query: { orderByChild: 'order',limitToLast: 2,endAt: task.order } */
          dynQuery.limitToLast = 2;
          dynQuery.endAt = task.order;

    }
    else {
      /*
    If direction!='up'==='down' retrieves clicked and next task
    (limits query to first 2 records with first one starting at order='task.order'
    sorted by 'order')
    query: { orderByChild: 'order',limitToFirst: 2,startAt: task.order }
    */
      dynQuery.limitToFirst = 2;
      dynQuery.startAt = task.order;
    }

    tasksList = this.af.database.list('/agenda_tasks/'+agendaKey,
      { preserveSnapshot: true, query: dynQuery });

    return tasksList;
  }

  public reorderTasks(agendaKey : string, task, direction) {
    //console.log(task.$key);
    var tasksList: FirebaseListObservable<any[]>;
    var tasksObject: FirebaseObjectObservable<any[]>;
    var orderSubscription;
    var keys = [];
    var orders = [];
    var updates = {};

    tasksList=this.reorderQuery(agendaKey, task, direction);

    orderSubscription=tasksList
      .subscribe(tasks =>{
        tasks.forEach(task=>
          {keys.push(task.key) //temp array with 'keys'
           orders.push(task.val().order)} //temp array with 'order'
        )
      });
      keys.splice(0,1); //delete unnecessary 1st element created by Observable
      orders.splice(0,1); //delete unnecessary 1st element created by Observable
      //console.log(orders);
      updates[keys[0]+'/order/']=orders[1];
      updates[keys[1]+'/order/']=orders[0];
      //console.log(updates);
      orderSubscription.unsubscribe();
      //Querying again as object to use 'data fan-out' update
      tasksObject = this.af.database.object('/agenda_tasks/'+agendaKey);
      tasksObject.update(updates).then(
        _ => console.log('Tasks reordered.'+keys[0]+' => order: '+orders[1]
        +' '+keys[1]+' => order: '+orders[0]));
    //this.taskOrder.update(temp[0],{order:index+1}).then(_ => console.log(temp[0]+' task moved down!'));
    //this.taskOrder.update(temp[1],{order:index}).then(_ => console.log(temp[1]+' task moved up!'));
  }

  public getTasksCount(): number {
    this.TASKS.subscribe(tasks=>this.TasksCount=tasks.length);
    //console.log(Promise.resolve(this.TasksCount));

    return this.TasksCount;
  }

  updateObject(key, updateKey, updateValue, type): void {
    if (type == 'number') updateValue = this.guardPositiveValue(updateValue,type);

    console.log("tasks list for agenda: " + this.TASKS)
    // console.log("updateObject: this.getAgendas().$ref.toString(): ", this.getAgendas().$ref.toString());
    this.TASKS.update(key, {[updateKey]:updateValue}).then(_ => console.log('Task updated!'));
  }

  guardPositiveValue(value, type): Number {
    if (value < 1) return;
    else return Number(value);
  }

  timeNow(): string {
    var d = new Date();
    var now = this.addZero(d.getHours()) + ":" + this.addZero(d.getMinutes());
    console.log(now);

    return now;
  }

  addZero(input): string {
    return input < 10 ? ("0" + input) : input;
  }

}
