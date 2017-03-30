import { ElementFinder }  from 'protractor/built/element';

import { $, $$ }          from 'protractor';

export class TaskTest {
  readonly TASK_TITLE_SELECTOR              = '#taskTitle';
  readonly TASK_DESCRIPTION_SELECTOR        = '#taskDescription';
  readonly TASK_DURATION_SELECTOR           = '#taskDuration';
  readonly TASK_COMPLETE_SELECTOR           = '#taskComplete';
  readonly TASK_START_TIME_SELECTOR         = '#taskStart';

  allTitles() {
    return $$(this.TASK_TITLE_SELECTOR);
  }

  updateTaskTitle() {
    var milliseconds = new Date().getMilliseconds();
    var newTitle = 'This is my new title at ' + milliseconds + ' milliseconds';
    var title = $$(this.TASK_TITLE_SELECTOR).first();

    this.updateElementValue(title, newTitle);

    //change focus to save
    $$(this.TASK_DESCRIPTION_SELECTOR).first().click();

    return newTitle;
  }

  updateTaskDescription() {
    var milliseconds = new Date().getMilliseconds();
    var newDescription = 'This is my new description at ' + milliseconds + ' milliseconds';

    var description = $$(this.TASK_DESCRIPTION_SELECTOR).first();
    description.clear();
    description.sendKeys(newDescription);

    //change focus to save
    $$(this.TASK_TITLE_SELECTOR).first().click();

    return newDescription;
  }

  updateTaskDuration(taskElement?: ElementFinder) {
    var taskDurationField;
    if(taskElement) {
      taskDurationField = taskElement;
    }
    else {
      taskDurationField = $$(this.TASK_DURATION_SELECTOR).first();
    }

    var minutes = this.updateElementNumberValue(taskDurationField);

    //change focus to save
    $$(this.TASK_TITLE_SELECTOR).first().click();

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
