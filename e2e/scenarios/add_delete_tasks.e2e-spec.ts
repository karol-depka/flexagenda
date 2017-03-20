import { $$, browser } from 'protractor'

import { FlexAgendaLocators } from '../support/elementLocators.e2e';
import { Support }            from '../support/support.e2e';
import { WaitHelpers }        from '../support/waits.e2e';
import { TaskListTest }       from '../view_objects/tasks_list.view_object';
import { AgendasListTest }    from '../view_objects/agendas_list.view_object';

//fdescribe
describe('User', () => {
  var support: Support;
  var locator: FlexAgendaLocators;
  var wait: WaitHelpers;
  var taskList: TaskListTest;
  var agendasList: AgendasListTest;

  beforeAll((done) => {
    // console.log('Before all starting');
    support = new Support();
    wait = new WaitHelpers();
    locator = new FlexAgendaLocators();
    taskList = new TaskListTest();
    agendasList = new AgendasListTest();

    // console.log('Before login');
    browser.get('/');
    support.loginIfNeeded().then(() => {
      agendasList.displayNewTestAgenda(done);
    });
  });

//fit
  it('should be able to add one task', () => {
    // console.log('Started test: should be able to add one task');
    taskList.countTasks().then((count) => {
      // console.log('initial count: ' + count);
      taskList.addEmptyTaskFirst().then(() => {
        // console.log('initial count after adding task: ' + count_two);
        var tasks = $$(locator.TASK_SELECTOR);
        wait.forElementCount(tasks, 2).then(() => {
          expect(taskList.countTasks()).toEqual(count+1);
        });
      });
    })
  });

  it('should be able to delete all tasks leaving one empty', () => {
    taskList.deleteAllTasksFromCurrentAgenda();

    expect(taskList.allTasks().count()).toEqual(1);
  });

  afterAll(() => {
    support.logout();
  });
});
