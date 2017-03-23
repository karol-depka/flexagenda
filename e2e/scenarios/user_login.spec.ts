import { browser } from 'protractor';

import { FlexAgendaAssertions } from '../support/assertions.e2e';
import { Support }              from '../support/support.e2e';
import { LoginTest }            from '../view_objects/login.view_object';

browser.ignoreSynchronization = true;

describe('User', () => {
  var support: Support;
  var assert: FlexAgendaAssertions;
  var loginPage: LoginTest;

  beforeAll(() => {
    support = new Support();
    assert = new FlexAgendaAssertions();
    loginPage = new LoginTest();
  });

  it('should display message saying to login', (done) => {
  loginPage.navigateToLogin().then(() => {
    assert.onLoginPage();
    done();
  });
});

  it('should login', () => {
    loginPage.login();

    assert.notOnLoginPage();
    assert.userIsLoggedIn();
  });
});