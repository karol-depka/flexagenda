// import { ElementFinder } from 'protractor/built/element';
import { browser, element, by, protractor, $, $$ } from 'protractor';

import { WaitHelpers }        from './waits.e2e' 
import { FlexAgendaLocators } from './elementLocators.e2e'

export class Support {
  agendaId = '-KfBt0kJmWlouYn8Mdjn';    //add dynamic agenda ID: create agenda, get the ID, use the ID
  userLogin = 'anna.bckwabb@gmail.com';
  userPassword = 'T3st3r!';

  ec = protractor.ExpectedConditions;
  waits = new WaitHelpers();
  locator = new FlexAgendaLocators();

  loginIfNeeded() {
    !$(this.locator.TASK_CSS).isPresent().then(() => {
      this.navigateToLogin();
      this.login();
    });
  }

  navigateToLogin() {
    browser.get('/');
    this.waitForPageToLoadLoginPage();
  }

  login() {
    $(this.locator.LOGIN_INPUT_CSS).sendKeys(this.userLogin);
    $(this.locator.LOGIN_PASSWORD_CSS).sendKeys(this.userPassword);
    $$(this.locator.LOGIN_BUTTON_CSS).first().click(); 
    this.waitForPageToLoadAfterLogin();
  }

  logout() {
    $(this.locator.LOGOUT_BUTTON_CSS).click();
  }

  displayTestAgenda() {
    browser.get('/agendas/' + this.agendaId);
    this.waits.waitForElementPresent($(this.locator.TASK_CSS));
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
  
  deleteFirstTaskOnAList() {
    $$(this.locator.TASK_DELETE_CSS).first().click();
    
    this.confirmDelete();
  }

  addEmptyTaskFirst() {
    $$(this.locator.TASK_ADD_NEW_ABOVE_CSS).first().click();
  }

  addEmptyTask() {
    $(this.locator.TASK_ADD_NEW_LAST_CSS).click();
  }

  addNewAgenda() {
    $(this.locator.AGENDA_ADD_NEW_CSS).click();
  }

  deleteAllAgendas() {
    this.allAgendas().count().then((count) => {   //TODO: refactor to a new method?
      var i = count;
      while (i > 0) {
        this.deleteFirstAgendaOnTheList();
        i--;
      }
    });
  }

  deleteFirstAgendaOnTheList() {
    $$(this.locator.AGENDA_DELETE_CSS).first().click();

    this.confirmDelete();
  }

  countTasks() {
   return this.allTasks().count();
  }

  countAgendas() {
    return this.allAgendas().count();
  }

  allTaskStartTimes() {
    return $$(this.locator.TASK_START_TIME_CSS);
  }

  allTasks() {
    return $$(this.locator.TASK_CSS);
  }

  allAgendasStartTimes() {
    return $$(this.locator.AGENDA_START_TIME_INPUT_CSS);
  }

  //TODO: check how it will behave when no agendas present
  allAgendas() {
    return $$(this.locator.AGENDA_CSS);
  }

  updateTaskTitle() {
    var miliseconds = new Date().getMilliseconds();
    var newTitle = 'This is my new title at ' + miliseconds + ' miliseconds';

    var title = $$(this.locator.TASK_TITLE_CSS).first();
    title.clear();
    title.sendKeys(newTitle);
    
    //change focus to save
    $$(this.locator.TASK_DESCRIPTION_CSS).first().click();

    return newTitle;
  }

  updateTaskDescription() {
    var miliseconds = new Date().getMilliseconds();
    var newDescription = 'This is my new description at ' + miliseconds + ' miliseconds';
    
    var description = $$(this.locator.TASK_DESCRIPTION_CSS).first();
    description.clear();
    description.sendKeys(newDescription);
    
    //change focus to save
    $$(this.locator.TASK_TITLE_CSS).first().click();

    return newDescription;
  }

  updateTaskDuration() {
    var minutes = new Date().getMinutes();
    var taskDuration = $$(this.locator.TASK_DURATION_CSS).first();
    taskDuration.clear();
    taskDuration.sendKeys(minutes);
    
    //change focus to save
    $$(this.locator.TASK_TITLE_CSS).first().click();

    return minutes.toString();
  }

  allDurations() {
    return $$(this.locator.TASK_DURATION_CSS).getAttribute('value');
  }

  updateTaskToDone() {     //fixme
    var taskComplete = $$(this.locator.TASK_COMPLETE_CSS).first();
    taskComplete.click();
    browser.refresh();      //Workaround to see the checkbox is clicked
    browser.wait(this.ec.presenceOf(taskComplete)); //wait for checkbox to appear before it is checked by test
  }

  updateTaskToNotDone() {  //fixme
    this.updateTaskToDone();
  }

  updateStartTime(adjustMinutes: number):string {
    var timeFormatted = this.timeNowAdjustedText(0, adjustMinutes);
    $(this.locator.AGENDA_START_TIME_INPUT_CSS).sendKeys(timeFormatted);

    return timeFormatted;
  }

  timeNowAdjustedText(hours: number, minutes: number): string {   //not sure if it's working properly
    var time = this.timeNowAdjusted(hours, minutes);
    var timeFormatted = this.addZero(time.getHours()) + ':' + this.addZero(time.getMinutes());

    return timeFormatted;
  }

  timeNowAdjusted(hours: number, minutes: number): Date {      //not sure if it's working properly
    var time = new Date();
    time.setHours(time.getHours() + hours);
    time.setMinutes(time.getMinutes() + minutes);

    return time;
  }

  timeAdjustedTextBy(timeFormatted: string, minutes: number): string { 
    var time = this.timeAdjustedBy(timeFormatted, minutes);
    var timeText = this.addZero(time.getHours()) + ':' + this.addZero(time.getMinutes());

    return timeText;
  }

  timeAdjustedBy(timeFormatted: string, minutes: number): Date {
    var timeSplit = timeFormatted.split(':');
    var time = new Date();
    time.setHours(+timeSplit[0]);
    time.setMinutes(+timeSplit[1] + minutes);

    return time;
  }

  addZero(input): string {
    return input < 10 ? ("0" + input) : input;
  }

  private waitForPageToLoadAfterLogin() {
    return browser.wait(this.ec.presenceOf($(this.locator.AGENDA_ADD_NEW_CSS)));
  }

  private waitForPageToLoadLoginPage() {
    return browser.wait(this.ec.presenceOf($(this.locator.LOGIN_INPUT_CSS)));
  }

  private confirmDelete() {
    var confirmDelete = $(this.locator.DELETE_CONFIRM_CSS);
    browser.wait(this.ec.presenceOf(confirmDelete));
    confirmDelete.click();
  }
}




