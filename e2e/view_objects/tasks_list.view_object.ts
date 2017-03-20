import { $, $$, browser, protractor }  from 'protractor';

import { FlexAgendaLocators } from "../support/elementLocators.e2e";
import { Support }            from "../support/support.e2e";

export class TaskListTest {
  ec = protractor.ExpectedConditions;
  locator = new FlexAgendaLocators();
  support = new Support();

  addEmptyTask() {
    $(this.locator.TASK_ADD_NEW_LAST_SELECTOR).click();
  }

  addTasks(count: number) {
    var i = 0;
    while (i <= count) {
      this.addEmptyTask();
      i++;
    }
  }

  addEmptyTaskFirst() {
    return $$(this.locator.TASK_ADD_NEW_ABOVE_SELECTOR).first().click();
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

  allTaskStartTimes() {
    return $$(this.locator.TASK_START_TIME_SELECTOR);
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
    });
    browser.wait(this.ec.presenceOf(taskComplete)); //wait for checkbox to appear before it is checked by test
  }

  unmarkFirstTaskAsDone() {  //fixme
    this.markFirstTaskAsDone();
  }
}
