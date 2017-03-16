import { $, browser } from 'protractor'

import { FlexAgendaLocators } from '../support/elementLocators.e2e';
import { FlexagendaCliPage }  from '../support/support.e2e';
import { WaitHelpers } from '../support/waits.e2e';

describe('User', function() {
  var agendaId = '-KfBt0kJmWlouYn8Mdjn';
  var agenda: FlexagendaCliPage;
  var locator: FlexAgendaLocators;
  var wait: WaitHelpers;

  beforeAll(() => {
    agenda = new FlexagendaCliPage();
    wait = new WaitHelpers();
    locator = new FlexAgendaLocators();

    agenda.navigateToLogin();

    wait.waitForExpectedTextInElement('Please login', locator.LOGIN_TEXT_ELEMENT_CSS);
    agenda.loginAndDisplayAgenda(agendaId);
    wait.waitForElementNotPresent(locator.LOGIN_TEXT_ELEMENT_CSS);
  });

  it('should be able to add one task', () => {
    var initialTaskCount = 0;
    var initialTaskCountPromise = agenda.countTasks();
    initialTaskCountPromise.then(function(value) {
      initialTaskCount = value;
      agenda.addEmptyTaskFirst();

      expect(agenda.countTasks()).toEqual(initialTaskCount+1);
    })
  });

  it('should be able to delete all tasks leaving one', () => {
    agenda.allTasks().count().then(function(count) {
        var i = count;
        while (i > 0) {
          agenda.deleteTask();
          i--;
        }
      });

    expect(agenda.allTasks().count()).toEqual(1);
  }); 

  afterAll(() => {
    $(locator.LOGOUT_BUTTON_CSS).click();
  });
});