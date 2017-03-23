import { browser, protractor, $, $$ } from 'protractor';

import { FlexAgendaLocators } from '../support/elementLocators.e2e'
import { TestData }           from '../support/testData.e2e'

export class LoginPage {
  ec = protractor.ExpectedConditions;
  locator = new FlexAgendaLocators();
  data = new TestData();

  loginIfNeeded() {
    return this.navigateToLogin().then(() => {
      browser.sleep(2000);   //FIXME
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

  waitForPageToLoadAfterLogin() {
    return browser.wait(this.ec.presenceOf($(this.locator.AGENDA_ADD_NEW_SELECTOR)));
  }
  
  waitForPageToLoadLoginPage() {
    return browser.wait(this.ec.presenceOf($(this.locator.LOGIN_INPUT_SELECTOR)));
  }
}