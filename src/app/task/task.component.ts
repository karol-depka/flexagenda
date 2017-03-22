import { Component, ElementRef, Input, OnInit, Renderer, ViewChild } from '@angular/core';
import { TasksService } from '../shared/tasks.service';
import { SnackBarComponent } from '../shared/snackbar/snackbar.component';
import { TasksListComponent } from "../taskslist/taskslist.component";

@Component({
  selector: 'task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  providers: [TasksService, TasksListComponent]
})
export class TaskComponent implements OnInit {
  tasks;
  tasksService: TasksService;
  @Input() task;
  @Input() tasksListComponent: TasksListComponent;
  @Input() taskIndex;
  @Input() isFirst;
  @Input() isLast;
  @ViewChild('title') input: ElementRef;

  constructor(public renderer: Renderer, public snackBar: SnackBarComponent) { }

  ngOnInit() {
    this.tasksService = this.tasksListComponent.tasksService;
   }

  ngAfterViewInit() {
    if (this.tasksListComponent.shallFocusNewTask) {
      this.renderer.invokeElementMethod(this.input.nativeElement, 'focus');
      this.tasksListComponent.shallFocusNewTask = false;
    }
  }

  updateObject(key, property, value, type): void {
    var message = "Task updated"
    this.tasksService.updateObject(key, property, value, type);
    if (message != null) this.snackBar.showSnackBar(message);
  }
}
