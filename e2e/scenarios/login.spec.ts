import { browser } from 'protractor';

import { FlexAgendaAssertions } from '../support/assertions.e2e';
import { Support }              from '../support/support.e2e';

browser.ignoreSynchronization = true;

describe('User', () => {
  var support: Support;
  var assert: FlexAgendaAssertions;

  beforeAll(() => {
    support = new Support();
    assert = new FlexAgendaAssertions();
  });

  it('should display message saying to login', (done) => {
  support.navigateToLogin().then(() => {
    assert.onLoginPage();
    done();
  });
});

  it('should login', () => {
    support.login();

    assert.notOnLoginPage();
    assert.userIsLoggedIn();
  });
});