import { FlexAgendaAssertions } from '../support/assertions.e2e';
import { Support }              from '../support/support.e2e';

describe('User', () => {
  var support: Support;
  var assert: FlexAgendaAssertions;

  beforeAll(() => {
    support = new Support();
    assert = new FlexAgendaAssertions();
  });

  it('should display message saying to login', () => {
  support.navigateToLogin();

  assert.onLoginPage();
});

  it('should login', () => {
    support.login();

    assert.notOnLoginPage();
    assert.userIsLoggedIn();
  });
});