import { AgendasListTest } from '../view_objects/agendas_list.view_object';
import { TaskTest } from '../view_objects/task.view_object';
import { browser } from 'protractor';

import { Support }              from '../support/support.e2e';
import { TestData }             from '../support/testData.e2e';
import { FlexAgendaAssertions } from '../support/assertions.e2e';
import { TaskListTest }         from '../view_objects/tasks_list.view_object';
import { AgendaTest }           from '../view_objects/agenda.view_object';
import { LoginTest }            from '../view_objects/login.view_object';

browser.ignoreSynchronization = true;

fdescribe('Agenda', () => {
  var taskList: TaskListTest;
  var agenda: AgendaTest;
  var support: Support;
  var assert: FlexAgendaAssertions;
  var loginPage: LoginTest;
  var task: TaskTest;
  var agendasList: AgendasListTest;

  beforeAll((done) => {
    support = new Support();
    assert = new FlexAgendaAssertions();
    taskList = new TaskListTest();
    agenda = new AgendaTest();
    loginPage = new LoginTest();
    agendasList = new AgendasListTest();

    browser.get('/');
    loginPage.loginIfNeeded().then(() => {
      agendasList.addAndDisplayNewTestAgenda(done);
    });
  });

  it('should calculate end time of all tasks based on duration', () => {
    taskList.addTasks(10);
    taskList.updateAllDurations();

    var startTime = agenda.grabStartTime();

    taskList.sumOfDurations().then((agendaDuration) => {
      // workaround as we don't have the END row to show the end time, yet
      taskList.allDurationsElements().last().getAttribute('value').then((lastTaskDuration) => {
        agendaDuration -= +lastTaskDuration;
        // console.log('lastTaskDuration '+lastTaskDuration);
        startTime.then((time) => {
          var agendaStartTime = support.timeAdjustedTextBy(time, 0);
          var expectedEndTime = support.timeAdjustedTextBy(agendaStartTime, agendaDuration);
          // console.log('expectedEndTime '+expectedEndTime);

          assert.agendaEndTimeIs(expectedEndTime);
        });    
      });
    });
  });

  afterAll(() => {
    loginPage.logout();
  });
});