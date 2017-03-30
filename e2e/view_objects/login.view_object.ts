import { TestData }                   from '../support/testData.e2e'
import { AgendasListTest }            from './agendas_list.view_object';

import { browser, protractor, $, $$ } from 'protractor';

export class LoginTest {
  ec = protractor.ExpectedConditions;
  private agendasList = new AgendasListTest();

  readonly LOGIN_INPUT_SELECTOR             = '#md-input-0-input';
  readonly LOGIN_PASSWORD_SELECTOR          = '#md-input-1-input';
  readonly LOGIN_BUTTON_SELECTOR            = '#login';
  readonly LOGIN_TEXT_ELEMENT_SELECTOR      = 'app-login > p';

  readonly LOGOUT_BUTTON_SELECTOR           = '#logout';
  readonly LOGGED_IN_USER_TEXT_SELECTOR     = 'flexagenda-app > span';

  loginIfNeeded() {
    return this.navigateToLogin().then(() => {
      browser.sleep(2000);   //FIXME
       $(this.LOGIN_BUTTON_SELECTOR).isPresent().then((isPresent) => {
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
    $(this.LOGIN_INPUT_SELECTOR).sendKeys(login);
    $(this.LOGIN_PASSWORD_SELECTOR).sendKeys(password);
    $$(this.LOGIN_BUTTON_SELECTOR).first().click();
    this.waitForPageToLoadAfterLogin();
  }

  logout() {
    $(this.LOGOUT_BUTTON_SELECTOR).click();
  }

  waitForPageToLoadAfterLogin() {
    return browser.wait(this.ec.presenceOf($(this.agendasList.AGENDA_ADD_NEW_SELECTOR)));
  }
  
  waitForPageToLoadLoginPage() {
    return browser.wait(this.ec.presenceOf($(this.LOGIN_INPUT_SELECTOR)));
  }
}