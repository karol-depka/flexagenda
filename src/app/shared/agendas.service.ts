import { Observable } from 'rxjs/Observable';
import { TasksService } from './tasks.service';
import { AuthService } from './auth.service';
import { Injectable, ViewContainerRef } from '@angular/core';
import { AngularFire,
         FirebaseListObservable,
         FirebaseObjectObservable } from 'angularfire2';

@Injectable()
export class AgendasService {
  AGENDAS_: FirebaseListObservable<any[]>; // lazy
  userHasAgendas: Observable<any[]>;
  userHasAgendasRaw: Observable<any[]>;

  constructor(
      public af:AngularFire,
      public authService : AuthService,
      public tasksService : TasksService

      ) {
    af.auth.subscribe(auth => {
      if ( auth ) {
        var userHasAgendaPath = '/UserHasAgenda/' + auth.uid;
        console.log("getAgendas", userHasAgendaPath)
        this.userHasAgendasRaw = this.af.database.list(userHasAgendaPath);
      }
    });
    //this.af.auth.subscribe(auth => console.log(auth));
    // var uid = this.authService.getUidOrThrow();
    // if ( ! uid ) {
      // console.log(" ! this.authService.uid ",  uid );
    // }
  }

  public addNewAgenda() {
    /*
    This function adds newAgenda object to the database.

    */
    var userHasAgendasList = this.af.database.list('/UserHasAgenda/' + this.authService.getUidOrThrow() /* FIXME */);
    var agendasList = this.af.database.list('/Agenda/');
    var newAgendaKey: string;
    var newTaskKey: string;

    newAgendaKey = agendasList.push({
      title: "NEW AGENDA TITLE - click to edit",
      users: "",
      active: true,
      startTime:this.tasksService.timeNow()
    }).key;
    console.log('In agenda: ' + newAgendaKey);
    userHasAgendasList.update(newAgendaKey, {"read" : true});

    // var newAgenda = this.tasksService.af.database.list('/agenda_tasks/'+newAgendaKey);
    // newTaskKey = newAgenda.push({
    //   order:1,
    //   type:"general",
    //   duration:10,
    //   title:"FIRST TASK",
    //   description:"This is your first task in this agenda. You can edit it as you please.",
    //   completed:false
    // }).key;
    // console.log('new task added: '+newTaskKey);

    // add initial task to the new agenda:
    this.tasksService.getTasks(newAgendaKey); // FIXME: hack to initialize
    this.tasksService.addNewTask(newAgendaKey, null, true);
  }

  public getAgendas(): Observable<any[]> {

    var uid = this.authService.getUidOrThrow();
    var userHasAgendaPath = '/UserHasAgenda/' + this.authService.getUidOrThrow();
    console.log("getAgendas", userHasAgendaPath)

    const userHasAgendaList = this.af.database.list(userHasAgendaPath);
    userHasAgendaList.subscribe((lll) => {
      console.log("userHasAgendaList.subscribe", lll);
    });

    // userHasAgendaList.switchMap(u => {
    //   console.log("switchMap", u);

    //   return "dafd"
    // }).subscribe(k => {});
    this.userHasAgendas = userHasAgendaList.map(userHasAgendas => {
      console.log("list(userHasAgendaPath).map(userHasAgendas: ", userHasAgendas);
      userHasAgendas.map(userHasAgenda => {
        console.log("userHasAgenda: ", userHasAgenda)
        var itemPath = '/Agenda/' + userHasAgenda.$key
        console.log("itemPath: ", itemPath);
        this.af.database.object(itemPath)
          .subscribe(agenda => {
            console.log("agenda", agenda)
            userHasAgenda.agenda = agenda;
          })
        return userHasAgenda;
      })
      return userHasAgendas;
    });
    return this.userHasAgendas;
    // this.userHasAgendas.subscribe(kk=>{});

    // if ( ! uid ) {
      // console.log(" ! this.authService.uid ", uid );
    // if( ! this.AGENDAS_ ) {
    //   this.AGENDAS_ = this.af.database.list('/agendas/' + uid); // FIXME: use agendas list service
    // }
    // return this.AGENDAS_;
  }
}
