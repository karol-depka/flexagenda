// import { ElementFinder } from 'protractor/built/element';
import { browser, element, by, protractor } from 'protractor';

import { WaitHelpers }        from './waits.e2e' 
import { FlexAgendaLocators } from './elementLocators.e2e'

export class FlexagendaCliPage {
  userLogin = 'anna.bckwabb@gmail.com';
  userPassword = 'T3st3r!';

  ec = protractor.ExpectedConditions;
  waits = new WaitHelpers();
  locator = new FlexAgendaLocators();

  navigateToLogin() {
    browser.get('/');
  }

  loginAndDisplayAgenda(agendaId: string) {
    this.locator.LOGIN_INPUT.sendKeys(this.userLogin);
    this.locator.LOGIN_PASSWORD.sendKeys(this.userPassword);
    this.locator.LOGIN_BUTTON.click(); 
    this.waitForPageToLoadAfterLogin();

    browser.get('/agendas/' + agendaId);
    this.waits.waitForElementPresent('task');
  }

  private waitForPageToLoadAfterLogin() {
    return browser.wait(this.ec.presenceOf(this.locator.AGENDA_ADD_NEW));
  }

  addEmptyTask() {
    this.locator.TASK_ADD_NEW_LAST.click();
  }

  countTasks() {
    return element.all(by.css('task')).count();
  }

  updateTaskTitle() {
    var miliseconds = new Date().getMilliseconds();
    var newTitle = 'This is my new title at ' + miliseconds + ' miliseconds';

    this.locator.TASK_TITLE.clear();
    this.locator.TASK_TITLE.sendKeys(newTitle);
    
    //change focus to save
    this.locator.TASK_DESCRIPTION.click();

    return newTitle;
  }

  updateTaskDescription() {
    var miliseconds = new Date().getMilliseconds();
    var newDescription = 'This is my new description at ' + miliseconds + ' miliseconds';
    
    this.locator.TASK_DESCRIPTION.clear();
    this.locator.TASK_DESCRIPTION.sendKeys(newDescription);
    
    //change focus to save
    this.locator.TASK_TITLE.click();

    return newDescription;
  }

  updateTaskDuration() {
    var minutes = new Date().getMinutes();
    var taskDuration = this.locator.TASK_DURATION;
    taskDuration.clear();
    taskDuration.sendKeys(minutes);
    
    //change focus to save
    this.locator.TASK_TITLE.click();

    return minutes.toString();
  }

  updateTaskToDone() {  //fixme
    this.locator.TASK_COMPLETE.click();
  }

  updateTaskToNotDone() {  //fixme
    this.updateTaskToDone();
  }

  updateStartTime() {
    var time = new Date();
    var timeFormatted = time.getHours() + ':' + time.getMinutes();
    this.locator.AGENDA_START_TIME_INPUT.sendKeys(timeFormatted);

    return timeFormatted;
  }
}




