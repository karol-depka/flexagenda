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

  deleteTask() {
    this.locator.TASK_DELETE.click();
    
    browser.wait(this.ec.presenceOf(this.locator.TASK_DELETE_CONFIRM));
    this.locator.TASK_DELETE_CONFIRM.click();
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

  allDurations() {
    return element.all(this.locator.TASK_DURATION.getAttribute('value'));
  }

  updateTaskToDone() {     //fixme
    this.locator.TASK_COMPLETE.click();
    browser.refresh();      //Workaround to see the checkbox is clicked
    browser.wait(this.ec.presenceOf(this.locator.TASK_COMPLETE)); //wait for checkbox to appear before it is checked by test
  }

  updateTaskToNotDone() {  //fixme
    this.updateTaskToDone();
  }

  updateStartTime(adjustMinutes: number) {
    var timeFormatted = this.timeNowAdjustedText(0, adjustMinutes);
    this.locator.AGENDA_START_TIME_INPUT.sendKeys(timeFormatted);

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




