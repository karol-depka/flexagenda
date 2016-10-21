import { Component,
         Input,
         trigger,
         state,
         animate,
         transition,
         style,
         AnimationTransitionEvent,
         ViewContainerRef  } from '@angular/core';
import { GeneralTasksComponent } from './generaltasks.component';
import { TasksService } from './shared/tasks.service';
import {MdSnackBar, MdSnackBarConfig} from '@angular/material';

@Component({
  selector:'task-form',
  templateUrl: './taskform.component.html',
  //styleUrls: ['./taskform.component.css'] TODO later
animations: [
  trigger('visibilityChanged', [
  state("true" , style({
    opacity: 1,
    transform: 'scale(1.0)'
  })),
  state("false", style({
    opacity: 0,
    transform: 'scale(0.0)'
  })),
  transition('* => *', animate('0.5s'))
  ])
],
providers: [TasksService]
})
export class TaskFormComponent{
  @Input() tasks: any[];
  formCaption: string="Add New task:"
  isVisible: boolean = false;
  visibility: boolean = this.isVisible;

  newIdDefault: number = 0;
  newTypeDefault: string = "general";
  newStartDefault: string = "12:00";
  newDurationDefault: number = 60;
  newTitleDefault: string = "New title";
  newDescriptionDefault: string = "New description";


  constructor(
    public tasksService: TasksService,
    public snackBar: MdSnackBar,
    public viewContainerRef: ViewContainerRef) { }


  showTaskForm(task){
    this.isVisible=true;
    this.visibility=this.isVisible;
    let config = new MdSnackBarConfig(this.viewContainerRef);
    setTimeout(this.snackBar.open("Item added.", "DISMISS",config),5000);
    console.log(this.tasksService.getTasksCount());
    //this.tasksService.getTasksOrder();
  }
  animationDone(event: AnimationTransitionEvent) {
    //implement later, not working as expected
    //console.warn('Animation done: ', event);
    console.warn(this.visibility); //should be 'true'
    setTimeout( ()=>this.visibility=false,500);
  }
  hideTaskForm(){
    this.isVisible=false;
    setTimeout( ()=>this.visibility=false,500);
  }
  addTask(newStart,newDuration,newType,newTitle,newDescription){
    //console.log(this.tasks.length);
    this.hideTaskForm();
    this.tasks.push({
      order:this.tasksService.getTasksCount(),
      type:newType,
      start:newStart,
      duration:newDuration,
      title:newTitle,
      description:newDescription
    });
             }
}
