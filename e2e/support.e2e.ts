import { ElementFinder } from 'protractor/built/element';
import { browser, element, by, protractor } from 'protractor';

import { WaitHelpers } from './waits.e2e' 

export class FlexagendaCliPage {
  userLogin = 'anna.bckwabb@gmail.com';
  userPassword = 'T3st3r!';

  ec = protractor.ExpectedConditions;
  waits = new WaitHelpers();

  navigateToLogin() {
    browser.get('/');
  }

  loginAndDisplayAgenda(agendaId: string) {
    element(by.css('#md-input-0-input')).sendKeys(this.userLogin);
    element(by.css('#md-input-1-input')).sendKeys(this.userPassword);
    element(by.id('login')).click(); 
    this.waitForPageToLoadAfterLogin();

    browser.get('/agendas/' + agendaId);
    this.waits.waitForElementPresent('task');
  }

  private waitForPageToLoadAfterLogin() {

    return browser.wait(this.ec.presenceOf(element(by.id('agendaAddNew'))));
  }

  addEmptyTask() {
    element(by.id('taskAddNewLast')).click();
  }

  countTasks() {
    return element.all(by.css('task')).count();
  }

  updateTaskTitle() {
    var miliseconds = new Date().getMilliseconds();
    var newTitle = 'This is my new title at ' + miliseconds + ' miliseconds';
    
    var title = element(by.id('taskTitle'));
    title.clear();
    title.sendKeys(newTitle);
    
    //change focus to save
    element(by.id('taskDescription')).click();

    return newTitle;
  }

  updateTaskDescription() {
    var miliseconds = new Date().getMilliseconds();
    var newDescription = 'This is my new description at ' + miliseconds + ' miliseconds';
    
    var title = element(by.id('taskDescription'));
    title.clear();
    title.sendKeys(newDescription);
    
    //change focus to save
    element(by.id('taskTitle')).click();

    return newDescription;
  }

  updateTaskDurationTo(duration: number) {
    var taskDuration = element(by.id('taskDuration'));
    taskDuration.clear();
    taskDuration.sendKeys(duration);
    
    //change focus to save
    element(by.id('taskTitle')).click();
  }
}




