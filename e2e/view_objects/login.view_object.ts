import { browser, protractor, $, $$ } from 'protractor';

import { FlexAgendaLocators } from '../support/elementLocators.e2e'
import { TestData }           from '../support/testData.e2e'

export class LoginTest {
  ec = protractor.ExpectedConditions;
  locator = new FlexAgendaLocators();

  loginIfNeeded() {
    return this.navigateToLogin().then(() => {
      browser.sleep(2000);   //FIXME
       $(this.locator.LOGIN_BUTTON_SELECTOR).isPresent().then((isPresent) => {
         if(isPresent) {
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
    this.loginAs(TestData.USER_LOGIN, TestData.USER_PASSWORD);
  }

  loginAs(login: string, password: string) {
    $(this.locator.LOGIN_INPUT_SELECTOR).sendKeys(login);
    $(this.locator.LOGIN_PASSWORD_SELECTOR).sendKeys(password);
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