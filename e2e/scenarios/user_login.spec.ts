import { TestData } from '../support/testData.e2e';
import { browser }              from 'protractor';

import { FlexAgendaAssertions } from '../support/assertions.e2e';
import { LoginTest }            from '../view_objects/login.view_object';

browser.ignoreSynchronization = true;

fdescribe('User login:', () => {
  var assert: FlexAgendaAssertions;
  var loginPage: LoginTest;

  beforeAll(() => {
    assert = new FlexAgendaAssertions();
    loginPage = new LoginTest();
  });

  it('should display message saying to login', (done) => {
    loginPage.navigateToLogin().then(() => {
      assert.onLoginPage();
      done();
    });
  });

  it('User should be able to login', () => {
    loginPage.login();

    assert.notOnLoginPage();
    assert.userIsLoggedIn(TestData.USER_LOGIN);
  });

  it('User should be able to logout', () => {
    loginPage.logout();

    assert.userIsLoggedOut(TestData.USER_LOGIN);
  });

  it('Second user should be able to login after the first one is logged out', () => {
    loginPage.navigateToLogin();
    loginPage.loginAs(TestData.USER_2_LOGIN, TestData.USER_2_PASSWORD);
    
    assert.userIsLoggedIn(TestData.USER_2_LOGIN);
  });
});
