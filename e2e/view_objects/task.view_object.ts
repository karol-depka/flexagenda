import { $$ } from 'protractor';

import { FlexAgendaLocators } from "../support/elementLocators.e2e";

export class TaskTest {
  private locator: FlexAgendaLocators;

  constructor() {
    this.locator = new FlexAgendaLocators();
  }

  updateTaskTitle() {
    var milliseconds = new Date().getMilliseconds();
    var newTitle = 'This is my new title at ' + milliseconds + ' milliseconds';

    var title = $$(this.locator.TASK_TITLE_SELECTOR).first();
    title.clear();
    title.sendKeys(newTitle);

    //change focus to save
    $$(this.locator.TASK_DESCRIPTION_SELECTOR).first().click();

    return newTitle;
  }

  updateTaskDescription() {
    var milliseconds = new Date().getMilliseconds();
    var newDescription = 'This is my new description at ' + milliseconds + ' milliseconds';

    var description = $$(this.locator.TASK_DESCRIPTION_SELECTOR).first();
    description.clear();
    description.sendKeys(newDescription);

    //change focus to save
    $$(this.locator.TASK_TITLE_SELECTOR).first().click();

    return newDescription;
  }

  updateTaskDuration() {
    var minutes = new Date().getMinutes();
    var taskDuration = $$(this.locator.TASK_DURATION_SELECTOR).first();
    taskDuration.clear();
    taskDuration.sendKeys(minutes);

    //change focus to save
    $$(this.locator.TASK_TITLE_SELECTOR).first().click();

    return minutes.toString();
  }
}
