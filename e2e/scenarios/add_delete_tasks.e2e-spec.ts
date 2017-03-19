import { $, $$, browser } from 'protractor'

import { FlexAgendaLocators } from '../support/elementLocators.e2e';
import { Support } from '../support/support.e2e';
import { WaitHelpers } from '../support/waits.e2e';

//fdescribe
describe('Add delete tasks', () => {
  var support: Support;
  var locator: FlexAgendaLocators;
  var wait: WaitHelpers;

  beforeAll((done) => {
    // console.log('Before all starting');
    support = new Support();
    wait = new WaitHelpers();
    locator = new FlexAgendaLocators();
    // console.log('Before login');
    browser.get('/');
    support.loginIfNeeded().then(() => {
      support.displayNewTestAgenda(done);
    });
  });

//fit
  it('should be able to add one task', () => {
    // console.log('Started test: should be able to add one task');
    support.countTasks().then((count) => {
      // console.log('initial count: ' + count);
      support.addEmptyTaskFirst().then(() => {
        var count_two = count + 1;
        // console.log('initial count after adding task: ' + count_two);

        function waitForCount(elementArrayFinder, expectedCount) {
          // console.log('start waiting for count');
          return () => {
            return elementArrayFinder.count().then((actualCount) => {
              // console.log('before condition is checked; expected: ' + expectedCount + ' actual count: ' + actualCount);
              return expectedCount === actualCount;  // or <= instead of ===, depending on the use case
            });
          };
        };

        var tasks = $$(locator.TASK_CSS);
        browser.wait(waitForCount(tasks, 2), 10000);

        expect(support.countTasks()).toEqual(count+1);
      });
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