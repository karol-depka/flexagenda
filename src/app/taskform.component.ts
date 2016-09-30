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
  template:`
<div [hidden]="!visibility"
     [@visibilityChanged]="isVisible">
<h3>Add New Task:</h3>
<input #newStart placeholder="start" value="00:00"/>
<input #newDuration placeholder="duration" value="60"/>
<input #newTitle placeholder="title" value="Title"/>
<input #newType placeholder="type" value="normal"/>
<input #newDescription placeholder="description" value="desciption"/>
<button md-raised-button (click)="addTask(newStart.value,
                        newDuration.value,
                        newType.value,
                        newTitle.value,
                        newDescription.value)">Confirm</button>
<button md-raised-button (click)="hideTaskForm()">Cancel</button>
</div>
`,
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
  showTaskForm(){
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
