import { browser }            from 'protractor';

import { WaitHelpers }        from '../support/waits.e2e';
import { TaskListTest }       from '../view_objects/tasks_list.view_object';
import { AgendasListTest }    from '../view_objects/agendas_list.view_object';
import { LoginTest }          from '../view_objects/login.view_object';

browser.ignoreSynchronization = true;

describe('Add delete tasks: User', () => {
  var wait: WaitHelpers;
  var taskList: TaskListTest;
  var loginPage: LoginTest;
  var agendasList: AgendasListTest;

  beforeAll((done) => {
    wait = new WaitHelpers();
    taskList = new TaskListTest();
    loginPage = new LoginTest();
    agendasList = new AgendasListTest();

    loginPage.navigateToLogin().then(() => {
      loginPage.loginIfNeeded().then(() => {
        agendasList.addAndDisplayNewTestAgenda(done);
      });
    });
  });

  it('should be able to add one task', () => {
    taskList.countTasks().then((count) => {
      taskList.addEmptyTaskFirst();
      var tasks = taskList.allTasks();
      wait.forElementCount(tasks, 2).then(() => {
        expect(taskList.countTasks()).toEqual(count+1);
      });
    })
  });

  it('should be able to delete all tasks leaving one empty', () => {
    taskList.deleteAllTasksFromCurrentAgenda();

    expect(taskList.allTasks().count()).toEqual(1);
  });

  afterAll(() => {
    loginPage.logout();
  });
});
