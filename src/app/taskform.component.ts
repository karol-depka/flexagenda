import { Component,
         Input,
         trigger,
         state,
         animate,
         transition,
         style,
         AnimationTransitionEvent  } from '@angular/core';
import { Task } from './shared/task';
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
  @Input() tasks: Task[];
  isVisible=false;
  visibility=this.isVisible;
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
          id:this.tasks.length+1,
          type:newType,
          start:newStart,
          duration:newDuration,
          title:newTitle,
          description:newDescription
        });
             }
}
