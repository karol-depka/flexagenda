import { WaitHelpers } from '../support/waits.e2e';
import { $, $$, browser, protractor }  from 'protractor';

import { FlexAgendaLocators } from "../support/elementLocators.e2e";
import { Support }            from "../support/support.e2e";
import { TaskTest }           from './task.view_object';

export class TaskListTest {
  private ec = protractor.ExpectedConditions;
  private locator = new FlexAgendaLocators();
  private support = new Support();
  private task = new TaskTest();
  private wait = new WaitHelpers();

  addEmptyTask() {
    $(this.locator.TASK_ADD_NEW_LAST_SELECTOR).click();
  }

  addTasks(count: number) {
    this.wait.forElementPresent($(this.locator.TASK_ADD_NEW_LAST_SELECTOR));
    var i = 0;
    while (i <= count) {
      this.addEmptyTask();
      i++;
    }
  }

  addEmptyTaskFirst() {
    var addTask = $$(this.locator.TASK_ADD_NEW_ABOVE_SELECTOR).first();
    this.wait.forElementPresent(addTask);
    addTask.click();
  }

  allTasks() {
    return $$(this.locator.TASK_SELECTOR);
  }

  countTasks() {
    return this.allTasks().count();
  }

  deleteFirstTaskOnAList() {
    $$(this.locator.TASK_DELETE_SELECTOR).first().click();

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
    return $$(this.locator.TASK_START_TIME_SELECTOR);
  }

  // allDurations() {
  //   return this.allDurationsElements().getAttribute('value').then((valuesString) => {
  //     valuesString = valuesString + '';
  //     return valuesString.split(',');
  //   });
  // }

  allDurationsElements() {
    return $$(this.locator.TASK_DURATION_SELECTOR);
  }

  updateAllDurations() {    //FIXME
    this.allDurationsElements().each((duration) => {
      this.task.updateTaskDuration(duration);
    });
  }

  sumOfDurations() {
    return $$(this.locator.TASK_DURATION_SELECTOR).getAttribute('value').then((valuesString) => {
      valuesString = valuesString + '';
      var values = valuesString.split(',').map(Number);
      return values.reduce((a, b) => { return a + b; });
    });
  }

  moveFirstTaskDown() {
    $$(this.locator.TASK_MOVE_DOWN_SELECTOR).first().click();
  }

  moveSecondTaskUp() {
    this.allTasks().last().$(this.locator.TASK_MOVE_UP_SELECTOR).click()
  }

  markFirstTaskAsDone() {     //fixme
    var taskComplete = $$(this.locator.TASK_COMPLETE_SELECTOR).first();
    taskComplete.click().then(() => {
      browser.refresh();      //Workaround to see the checkbox is clicked
      this.wait.forElementPresent(taskComplete); //wait for checkbox to appear before it is checked by test
    });
  }

  unmarkFirstTaskAsDone() {  //fixme
    this.markFirstTaskAsDone();
  }
}
