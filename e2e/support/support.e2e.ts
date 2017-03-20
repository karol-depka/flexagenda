import { browser, protractor, $, $$ } from 'protractor';

import { WaitHelpers }        from './waits.e2e'
import { FlexAgendaLocators } from './elementLocators.e2e'
import { TestData }           from './testData.e2e'

export class Support {
  ec = protractor.ExpectedConditions;
  waits = new WaitHelpers();
  locator = new FlexAgendaLocators();
  data = new TestData();

  loginIfNeeded() {
   return this.navigateToLogin().then(() => {
     browser.sleep(2000);
      $(this.locator.LOGIN_BUTTON_SELECTOR).isPresent().then((isPresent) => {
        if(isPresent) {
          // console.log('is user logged in: ' + isPresent);
          this.login();
        }
      });
    });
  }

  navigateToLogin() {
    browser.get('/');
     return this.waitForPageToLoadLoginPage();
  }

  login() {
    $(this.locator.LOGIN_INPUT_SELECTOR).sendKeys(this.data.USER_LOGIN);
    $(this.locator.LOGIN_PASSWORD_SELECTOR).sendKeys(this.data.USER_PASSWORD);
    $$(this.locator.LOGIN_BUTTON_SELECTOR).first().click();
    this.waitForPageToLoadAfterLogin();
  }

  logout() {
    $(this.locator.LOGOUT_BUTTON_SELECTOR).click();
  }

  addNewAgenda() {
    this.countAgendas().then((count) => {
      $(this.locator.AGENDA_ADD_NEW_SELECTOR).click();

      //expect(this.countAgendas()).toEqual(count+1);
    });
  }

  displayNewTestAgenda(done?) {
    this.addNewAgenda();
    return this.waits.forElementPresent($(this.locator.AGENDA_OPEN_SELECTOR)).then(() => {
      // console.log('before it clicks to open new agenda');
      $$(this.locator.AGENDA_OPEN_SELECTOR).last().click().then(() => {
        // console.log('after opening agenda, before wait for element not prersent');
        this.waits.forElementPresent($(this.locator.TASK_SELECTOR)).then(() => {
          // console.log('Not on agendas list, single agenda view');
          if (done) done();
        });
      });
    });
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
    $$(this.locator.AGENDA_DELETE_SELECTOR).first().click();

    this.confirmDelete();
  }

  countAgendas() {
    return this.allAgendas().count();
  }

  allAgendasStartTimes() {
    return $$(this.locator.AGENDA_START_TIME_INPUT_SELECTOR);
  }

  agendaStartTime() {
    return $(this.locator.AGENDA_START_TIME_INPUT_SELECTOR).getAttribute('value');
  }

  //TODO: check how it will behave when no agendas present
  allAgendas() {
    return $$(this.locator.AGENDA_SELECTOR);
  }

  updateStartTime(adjustMinutes: number):string {
    var timeFormatted = this.timeNowAdjustedText(0, adjustMinutes);
    $(this.locator.AGENDA_START_TIME_INPUT_SELECTOR).sendKeys(timeFormatted);

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

  clickStartNow() {
    $(this.locator.AGENDA_START_TIME_NOW_SELECTOR).click();
  }

  addZero(input): string {
    return input < 10 ? ("0" + input) : input;
  }

  waitForPageToLoadAfterLogin() {
    return browser.wait(this.ec.presenceOf($(this.locator.AGENDA_ADD_NEW_SELECTOR)));
  }

  waitForPageToLoadLoginPage() {
    return browser.wait(this.ec.presenceOf($(this.locator.LOGIN_INPUT_SELECTOR)));
  }

  confirmDelete() {
    var confirmDelete = $(this.locator.DELETE_CONFIRM_SELECTOR);
    browser.wait(this.ec.presenceOf(confirmDelete));
    confirmDelete.click();
  }
}




