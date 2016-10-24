import { Injectable, ViewContainerRef } from '@angular/core';
import { AngularFire,
         FirebaseListObservable,
         FirebaseObjectObservable } from 'angularfire2';

@Injectable()
export class TasksService {
  TASKS: FirebaseListObservable<any[]>;
  AGENDAS: FirebaseListObservable<any[]>;
  taskOrder: FirebaseObjectObservable<any[]>;
  TasksCount: number;
  constructor(public af:AngularFire) {
    //this.af.auth.subscribe(auth => console.log(auth));
    this.TASKS = af.database.list('/tasks',{
      preserveSnapshot: false,
      query: {
        orderByChild: 'order'
        }
    });
    this.AGENDAS = af.database.list('/agendas');
  }
  public getTasks(): FirebaseListObservable<any[]> {
    return this.TASKS;
  }
  public getAgendas(): FirebaseListObservable<any[]> {
    return this.AGENDAS;
  }

  public addNewTask(task,isFirst) {
    /*
    This function adds newTask object to the database.
    If no 'task' is provided newTask is added at the end of TASKS list.
    If 'task' is provided specific newTaskOrder is calculated
    with 'getNewTaskOrder' function.
    */
    var newOrder: number
    task ? newOrder=this.getNewTaskOrder(task,isFirst) : newOrder=this.getTasksCount()+1
    this.TASKS.push({
      order:newOrder,
      type:"general",
      start:"00:00",
      duration:"10",
      title:"NEWTITLE",
      description:"NEWDESCRIPTION",
      completed:false
    });
  }
  public getNewTaskOrder(task,isFirst): any {
    /*
    This function prepares existing tasks to compare for 'calculateNewOrder' function.
    */
    var ordersArray=[];
    var newOrder: number = 0;
    //console.log(newOrder);
    var orderSubscription;
    var taskOrder: FirebaseListObservable<any[]>;
    console.log(task.$key);
    if(isFirst) console.log(isFirst);
    taskOrder = this.af.database.list('/tasks',
    { preserveSnapshot:true,
      query: {
        orderByChild: 'order',
        limitToLast: 2,
        endAt: task.order
        }
     });
     orderSubscription=taskOrder
       .subscribe(tasks =>{
        tasks.forEach(task=>
          {{ordersArray.push(task.val().order)}
          console.log(task.key)}
       )
       });
       orderSubscription.unsubscribe();
       return this.calculateNewTaskOrder(ordersArray,isFirst)
  }

  public calculateNewTaskOrder(ordersArray,isFirst): number {
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

  public reorderQuery(task,direction): FirebaseListObservable<any[]> {
    /*
    This functions queries DB for list of 2 tasks.
    */
    var tasksList: FirebaseListObservable<any[]>;
    if (direction==='up') {
      /*
      If direction==='up' retrieves clicked and previous task
      (limits query to last 2 records with last one ending at order='task.order'
      sorted by 'order')
      */
      tasksList = this.af.database.list('/tasks',
      { preserveSnapshot:true,
        query: {
          orderByChild: 'order',
          limitToLast: 2,
          endAt: task.order
          }
       });
    }
    else
    /*
    If direction!='up'==='down' retrieves clicked and next task
    (limits query to first 2 records with first one starting at order='task.order'
    sorted by 'order')
    */
    tasksList = this.af.database.list('/tasks',
    { preserveSnapshot:true,
      query: {
        orderByChild: 'order',
        limitToFirst: 2,
        startAt: task.order
        }
     });
     return tasksList
  }

  public reorderTasks(task,direction) {
    //console.log(task.$key);
    var tasksList: FirebaseListObservable<any[]>;
    var tasksObject: FirebaseObjectObservable<any[]>;
    var orderSubscription;
    var keys = [];
    var orders = [];
    var updates = {};

    tasksList=this.reorderQuery(task,direction);
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
      tasksObject = this.af.database.object('/tasks');
      tasksObject.update(updates).then(
        _ => console.log('Tasks reordered.'+keys[0]+' => order: '+orders[1]
        +' '+keys[1]+' => order: '+orders[0]));
    //this.taskOrder.update(temp[0],{order:index+1}).then(_ => console.log(temp[0]+' task moved down!'));
    //this.taskOrder.update(temp[1],{order:index}).then(_ => console.log(temp[1]+' task moved up!'));
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

  updateObject(object,key,updateKey,updateValue): void {
  //console.log(update);
  switch (object) {
    case 'task':
        this.TASKS.update(key,{[updateKey]:updateValue}).then(_ => console.log('Task updated!'));
        break;
    case 'agenda':
        this.AGENDAS.update(key,{[updateKey]:updateValue}).then(_ => console.log('Agenda updated!'));
        break;
}
}
}
