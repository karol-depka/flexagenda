import { Support }              from '../support/support.e2e';
import { FlexAgendaAssertions } from '../support/assertions.e2e';
import { TaskListTest }         from '../view_objects/tasks_list.view_object';
import { AgendaTest }           from '../view_objects/agenda.view_object';
import { LoginTest }            from '../view_objects/login.view_object';
import { AgendasListTest }      from '../view_objects/agendas_list.view_object';

import { browser }              from 'protractor';

browser.ignoreSynchronization = true;

describe('Durations calculation: Agenda', () => {
  var taskList: TaskListTest;
  var agenda: AgendaTest;
  var support: Support;
  var assert: FlexAgendaAssertions;
  var loginPage: LoginTest;
  var agendasList: AgendasListTest;

  beforeAll((done) => {
    support = new Support();
    assert = new FlexAgendaAssertions();
    taskList = new TaskListTest();
    agenda = new AgendaTest();
    loginPage = new LoginTest();
    agendasList = new AgendasListTest();

    loginPage.navigateToLogin().then(() => {
      loginPage.loginIfNeeded().then(() => {
        agendasList.addAndDisplayNewTestAgenda(done);
      });
    });
  });

  it('should calculate end time of all tasks based on duration', () => {
    taskList.addTasks(10);
    taskList.updateAllDurations();

    var startTime = agenda.startTime();

    taskList.sumOfDurations().then((agendaDuration) => {
      // workaround as we don't have the END row to show the end time, yet
      taskList.allDurationsElements().last().getAttribute('value').then((lastTaskDuration) => {
        agendaDuration -= +lastTaskDuration;
        startTime.then((time) => {
          var agendaStartTime = support.timeAdjustedTextBy(time, 0);
          var expectedEndTime = support.timeAdjustedTextBy(agendaStartTime, agendaDuration);

          assert.agendaEndTimeIs(expectedEndTime);
        });
      });
    });
  });

  afterAll(() => {
    loginPage.logout();
  });
});
