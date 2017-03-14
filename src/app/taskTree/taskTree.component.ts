import { SnackBarComponent } from './../shared/snackbar/snackbar.component';
import { MdDialog } from '@angular/material';
import { TasksService } from './../shared/tasks.service';
import { Component } from '@angular/core';
import { TasksListComponent } from './../taskslist/taskslist.component';

@Component({
  selector: 'task-tree',
    templateUrl: './taskTree.component.html',
    styleUrls: ['./taskTree.component.css'],
    // animations: [
    //   trigger('flyInOut', [
    //     state('*', style({transform: 'translateY(0)'})),
    //     transition('void => *',[
    //       style({transform: 'translateY(-100%)'}),
    //       animate(200)
    //     ]),
    //     transition('* => void', [
    //       animate(200, style({transform: 'translateY(-100%)'}))
    //     ])
    //   ])
    // ],
    providers: [TasksService]
})
export class TaskTreeComponent extends TasksListComponent {

  customTemplateStringOptions = {
    // displayField: 'subTitle',
    isExpandedField: 'expanded',
    idField: 'uuid',
    // getChildren: this.getChildren.bind(this),
    // actionMapping,
    nodeHeight: 23,
    allowDrag: true,
    useVirtualScroll: true
  }

  nodes = [
    {
      id: 1,
      name: 'root1',
      children: [
        { id: 2, name: 'child1' },
        { id: 3, name: 'child2' }
      ]
    },
    {
      id: 4,
      name: 'root2',
      children: [
        { id: 5, name: 'child2.1' },
        {
          id: 6,
          name: 'child2.2',
          children: [
            { id: 7, name: 'subsub' }
          ]
        }
      ]
    }
  ];

  constructor(
      tasksService: TasksService,
      dialog: MdDialog,
      snackBar: SnackBarComponent,
      /*private dragulaService: DragulaService*/) {
    super(tasksService, dialog, snackBar);
  }

}
