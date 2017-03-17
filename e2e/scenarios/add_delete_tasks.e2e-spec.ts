import { $, browser } from 'protractor'

import { FlexAgendaLocators } from '../support/elementLocators.e2e';
import { Support }            from '../support/support.e2e';
import { WaitHelpers }        from '../support/waits.e2e';

describe('User', function() {
  var support: Support;
  var locator: FlexAgendaLocators;
  var wait: WaitHelpers;

  beforeAll(() => {
    support = new Support();
    wait = new WaitHelpers();
    locator = new FlexAgendaLocators();

    support.loginIfNeeded();
    support.displayTestAgenda();
  });

  it('should be able to add one task', () => {
    var initialTaskCount = 0;
    var initialTaskCountPromise = support.countTasks();
    initialTaskCountPromise.then((value) => {
      initialTaskCount = value;
      support.addEmptyTaskFirst();

      expect(support.countTasks()).toEqual(initialTaskCount+1);
    })
  });

  it('should be able to delete all tasks leaving one empty', () => {
    support.deleteAllTasksFromCurrentAgenda();

    expect(support.allTasks().count()).toEqual(1);
  }); 

  afterAll(() => {
    support.logout();
  });
});