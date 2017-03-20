import { TasksService } from './tasks.service';
import { AuthService } from './auth.service';
import { Injectable, ViewContainerRef } from '@angular/core';
import { AngularFire,
         FirebaseListObservable,
         FirebaseObjectObservable } from 'angularfire2';

@Injectable()
export class AgendasService {
  AGENDAS_: FirebaseListObservable<any[]>; // lazy

  constructor(
      public af:AngularFire,
      public authService : AuthService,
      public tasksService : TasksService
      ) {
    //this.af.auth.subscribe(auth => console.log(auth));
    var uid = this.authService.uid
    // if ( ! uid ) {
      console.log(" ! this.authService.uid ",  uid );
    // }
  }



  public getAgendas(): FirebaseListObservable<any[]> {
    var uid = this.authService.uid
    if ( ! uid ) {
      throw new Error("uid cannot be: " + uid);
    }
    // if ( ! uid ) {
      console.log(" ! this.authService.uid ", uid );
    if( ! this.AGENDAS_ ) {
      this.AGENDAS_ = this.af.database.list('/agendas/' + uid); // FIXME: use agendas list service
    }
    return this.AGENDAS_;
  }

  public getAgenda(agendaKey : string): FirebaseObjectObservable<any[]> {
    var agenda: FirebaseObjectObservable<any[]>;
    agenda = this.af.database.object('/agendas/' + this.authService.uid + "/" + agendaKey); // FIXME: duplication

    return agenda;
  }

  updateObject(object, key, updateKey, updateValue, type): void {
    // if (type == 'number') updateValue = this.guardPositiveValue(updateValue,type);

    console.log("updateObject: this.getAgendas().$ref.toString(): ", this.getAgendas().$ref.toString());
    switch (object) {
      case 'agenda':
          this.getAgendas().update(key, {[updateKey]:updateValue}).then(_ => console.log('Agenda updated!'));
          break;
    }
  }

  public addNewAgenda() {
    /*
    This function adds newAgenda object to the database.

    */
    var userHasAgendasList = this.af.database.list('/UserHasAgenda/' + this.authService.uid /* FIXME */);
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
    userHasAgendasList.update(newAgendaKey, true);

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
  }
}
