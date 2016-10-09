import { Component,
         Input,
         trigger,
         state,
         animate,
         transition,
         style,
         AnimationTransitionEvent  } from '@angular/core';
import { GeneralTasksComponent } from './generaltasks.component';


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
]
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

  showTaskForm(task){
    this.isVisible=true;
    this.visibility=this.isVisible;
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
    //console.log(this.tasks);
    this.hideTaskForm();
    this.tasks.push({
      type:newType,
      start:newStart,
      duration:newDuration,
      title:newTitle,
      description:newDescription
    });
             }
}
