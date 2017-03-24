
import { $$ } from 'protractor';

import { FlexAgendaLocators } from '../support/elementLocators.e2e';
import { ElementFinder } from 'protractor/built/element';

export class TaskTest {
  private locator = new FlexAgendaLocators();

  updateTaskTitle() {
    var milliseconds = new Date().getMilliseconds();
    var newTitle = 'This is my new title at ' + milliseconds + ' milliseconds';
    var title = $$(this.locator.TASK_TITLE_SELECTOR).first();

    this.updateElementValue(title, newTitle);

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

  updateTaskDuration(taskElement?: ElementFinder) {
    var taskDurationField;
    if(taskElement) {
      taskDurationField = taskElement;
    }
    else {
      taskDurationField = $$(this.locator.TASK_DURATION_SELECTOR).first();
    }

    var minutes = this.updateElementNumberValue(taskDurationField);

    //change focus to save
    $$(this.locator.TASK_TITLE_SELECTOR).first().click();

    return minutes;
  }

  private updateElementNumberValue(locator: ElementFinder): string {
    var minutes = new Date().getMinutes().toString();
    if(minutes == '0') {   //TODO: remove after setting 0 minutes for a task is made possible
      minutes = '1';
    }
    
    this.updateElementValue(locator, minutes);

    return minutes;
  }

  private updateElementValue(locator: ElementFinder, text: string) {
    locator.clear();
    locator.sendKeys(text);
  }
}
