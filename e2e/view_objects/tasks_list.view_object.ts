import { Support }                     from '../support/support.e2e';
import { TaskTest }                    from './task.view_object';
import { WaitHelpers }                 from '../support/waits.e2e';

import { $, $$, browser, protractor }  from 'protractor';

export class TaskListTest {
  private support = new Support();
  private task = new TaskTest();
  private wait = new WaitHelpers();

  readonly TASK_SELECTOR                    = 'task';
  readonly TASK_DELETE_SELECTOR             = '#taskDelete';
  readonly TASK_ADD_NEW_LAST_SELECTOR       = '#taskAddNewLast';
  readonly TASK_ADD_NEW_ABOVE_SELECTOR      = '#taskAddAbove';
  readonly TASK_MOVE_UP_SELECTOR            = '#taskMoveUp';
  readonly TASK_MOVE_DOWN_SELECTOR          = '#taskMoveDown';

  addEmptyTask() {
    $(this.TASK_ADD_NEW_LAST_SELECTOR).click();
  }

  addTasks(count: number) {
    this.wait.forElementPresent($(this.TASK_ADD_NEW_LAST_SELECTOR));
    var i = 0;
    while (i <= count) {
      this.addEmptyTask();
      i++;
    }
  }

  addEmptyTaskFirst() {
    var addTask = $$(this.TASK_ADD_NEW_ABOVE_SELECTOR).first();
    this.wait.forElementPresent(addTask);
    addTask.click();
  }

  allTasks() {
    return $$(this.TASK_SELECTOR);
  }

  allTitles() {
    return $$(this.task.TASK_TITLE_SELECTOR);
  }

  countTasks() {
    return this.allTasks().count();
  }

  deleteFirstTaskOnAList() {
    $$(this.TASK_DELETE_SELECTOR).first().click();

    this.support.confirmDelete();
  }

  deleteAllTasksFromCurrentAgenda() {
    this.allTasks().count().then((count) => {
      var i = count;
      while (i > 0) {
        this.deleteFirstTaskOnAList();
        i--;
      }
    });
  }

  allStartTimes() {
    return $$(this.task.TASK_START_TIME_SELECTOR);
  }

  // allDurations() {
  //   return this.allDurationsElements().getAttribute('value').then((valuesString) => {
  //     valuesString = valuesString + '';
  //     return valuesString.split(',');
  //   });
  // }

  allDurationsElements() {
    return $$(this.task.TASK_DURATION_SELECTOR);
  }

  updateAllDurations() {    //FIXME
    this.allDurationsElements().each((duration) => {
      this.task.updateTaskDuration(duration);
    });
  }

  sumOfDurations() {
    return $$(this.task.TASK_DURATION_SELECTOR).getAttribute('value').then((valuesString) => {
      valuesString = valuesString + '';
      var values = valuesString.split(',').map(Number);
      return values.reduce((a, b) => { return a + b; });
    });
  }

  moveFirstTaskDown() {
    $$(this.TASK_MOVE_DOWN_SELECTOR).first().click();
  }

  moveLastTaskUp() {
    this.allTasks().last().$(this.TASK_MOVE_UP_SELECTOR).click()
  }

  moveFirstTaskDownWithKeys() {
    var taskElement = this.allTitles().first();  //needs element to focus on
    taskElement.sendKeys(protractor.Key.chord(protractor.Key.CONTROL, protractor.Key.ARROW_DOWN));
  }

  moveLastTaskUpWithKeys() {
    var taskElement = this.allTitles().last();  //needs element to focus on
    taskElement.sendKeys(protractor.Key.chord(protractor.Key.CONTROL, protractor.Key.ARROW_UP));
  }

  markFirstTaskAsDone() {     //fixme
    var taskComplete = $$(this.task.TASK_COMPLETE_SELECTOR).first();
    taskComplete.click().then(() => {
      browser.refresh();      //Workaround to see the checkbox is clicked
      this.wait.forElementPresent(taskComplete); //wait for checkbox to appear before it is checked by test
    });
  }

  unmarkFirstTaskAsDone() {  //fixme
    this.markFirstTaskAsDone();
  }
}
