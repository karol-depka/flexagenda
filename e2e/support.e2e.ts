// import { ElementFinder } from 'protractor/built/element';
import { browser, element, by, protractor, $ } from 'protractor';

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
    $(this.locator.LOGIN_INPUT_CSS).sendKeys(this.userLogin);
    $(this.locator.LOGIN_PASSWORD_CSS).sendKeys(this.userPassword);
    $(this.locator.LOGIN_BUTTON_CSS).click(); 
    this.waitForPageToLoadAfterLogin();

    browser.get('/agendas/' + agendaId);
    this.waits.waitForElementPresent('task');
  }

  private waitForPageToLoadAfterLogin() {
    return browser.wait(this.ec.presenceOf($(this.locator.AGENDA_ADD_NEW_CSS)));
  }

  addEmptyTaskFirst() {
    $(this.locator.TASK_ADD_NEW_ABOVE_CSS).click();
  }

  addEmptyTask() {
    $(this.locator.TASK_ADD_NEW_LAST_CSS).click();
  }

  deleteTask() {
    $(this.locator.TASK_DELETE_CSS).click();
    
    var confirmDelete = $(this.locator.TASK_DELETE_CONFIRM_CSS);
    browser.wait(this.ec.presenceOf(confirmDelete));
    confirmDelete.click();
  }

  countTasks() {
   return this.allTasks().count();
  }

  allTaskStartTimes() {
    return element.all(by.id('taskStart'));
  }

  allTasks() {
    return element.all(by.css('task'));
  }

  updateTaskTitle() {
    var miliseconds = new Date().getMilliseconds();
    var newTitle = 'This is my new title at ' + miliseconds + ' miliseconds';

    var title = $(this.locator.TASK_TITLE_CSS);
    title.clear();
    title.sendKeys(newTitle);
    
    //change focus to save
    $(this.locator.TASK_DESCRIPTION_CSS).click();

    return newTitle;
  }

  updateTaskDescription() {
    var miliseconds = new Date().getMilliseconds();
    var newDescription = 'This is my new description at ' + miliseconds + ' miliseconds';
    
    var description = $(this.locator.TASK_DESCRIPTION_CSS);
    description.clear();
    description.sendKeys(newDescription);
    
    //change focus to save
    $(this.locator.TASK_TITLE_CSS).click();

    return newDescription;
  }

  updateTaskDuration() {
    var minutes = new Date().getMinutes();
    var taskDuration = $(this.locator.TASK_DURATION_CSS);
    taskDuration.clear();
    taskDuration.sendKeys(minutes);
    
    //change focus to save
    $(this.locator.TASK_TITLE_CSS).click();

    return minutes.toString();
  }

  allDurations() {
    return element.all($(this.locator.TASK_DURATION_CSS).getAttribute('value'));
  }

  updateTaskToDone() {     //fixme
    var taskComplete = $(this.locator.TASK_COMPLETE_CSS);
    taskComplete.click();
    browser.refresh();      //Workaround to see the checkbox is clicked
    browser.wait(this.ec.presenceOf(taskComplete)); //wait for checkbox to appear before it is checked by test
  }

  updateTaskToNotDone() {  //fixme
    this.updateTaskToDone();
  }

  updateStartTime(adjustMinutes: number) {
    var timeFormatted = this.timeNowAdjustedText(0, adjustMinutes);
    $(this.locator.AGENDA_START_TIME_INPUT_CSS).sendKeys(timeFormatted);

    return timeFormatted;
  }

  timeNowAdjustedText(hours: number, minutes: number) {   //not sure if it's working properly
    var time = this.timeNowAdjusted(hours, minutes);
    var timeFormatted = this.addZero(time.getHours()) + ':' + this.addZero(time.getMinutes());

    return timeFormatted;
  }

  timeNowAdjusted(hours: number, minutes: number) {      //not sure if it's working properly
    var time = new Date();
    time.setHours(time.getHours() + hours);
    time.setMinutes(time.getMinutes() + minutes);

    return time;
  }

  timeAdjustedTextBy(timeFormatted: string, minutes: number) { 
    var time = this.timeAdjustedBy(timeFormatted, minutes);
    var timeText = this.addZero(time.getHours()) + ':' + this.addZero(time.getMinutes());

    return timeText;
  }

  timeAdjustedBy(timeFormatted: string, minutes: number) {
    var timeSplit = timeFormatted.split(':');
    var time = new Date();
    time.setHours(+timeSplit[0]);
    time.setMinutes(+timeSplit[1] + minutes);

    return time;
  }

  addZero(input): string {
    return input < 10 ? ("0" + input) : input;
  }
}




