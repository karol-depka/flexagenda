import { browser, by, $, $$ } from 'protractor';

import { Support }  from '../support/support.e2e';
import { WaitHelpers }        from '../support/waits.e2e'
import { FlexAgendaLocators } from '../support/elementLocators.e2e'

browser.ignoreSynchronization = true;

describe('It', function() {
  var support: Support;
  var wait: WaitHelpers;
  var locator: FlexAgendaLocators;

  beforeAll(() => {
    support = new Support();
    wait = new WaitHelpers();
    locator = new FlexAgendaLocators();
  });

  it('should display message saying to login', () => {
    support.navigateToLogin();

    expect(wait.waitForExpectedTextInElement('Please login', 'app-login > p'))
        .toEqual(true);
  });

  it('should login', () => {
    support.login();

    expect(wait.waitForElementNotPresent($('app-login > p')))
        .toEqual(true);
    expect(wait.waitForExpectedTextInElement('Logged in as ' + support.userLogin, 'flexagenda-app > span'))
        .toEqual(true);
  });

  it('should be able to add an empty task', () => {
    support.displayNewTestAgenda();
    var initialTaskCount = 0;
    var initialTaskCountPromise = support.countTasks();
    initialTaskCountPromise.then((value) => {
      initialTaskCount = value;
      support.addEmptyTaskFirst();

      expect(support.countTasks()).toEqual(initialTaskCount+1);
    })
      
      expect($(locator.TASK_TITLE_CSS).getAttribute('value')).toEqual('');
      expect($(locator.TASK_DESCRIPTION_CSS).getAttribute('value')).toEqual('');
      expect($(locator.TASK_DURATION_CSS).getAttribute('value')).toEqual('10');
      expect($(locator.TASK_COMPLETE_CSS).getAttribute('ng-reflect-checked')).toBeNull();
  });

  it('should be able to delete a task', () => {
    var initialTaskCount = 0;
    var initialTaskCountPromise = support.countTasks();
    initialTaskCountPromise.then((value) => {
      initialTaskCount = value;
      support.deleteFirstTaskOnAList();

      expect(support.countTasks()).toEqual(initialTaskCount-1);
    })
  });

  it('should be able to show start time for all tasks', () => {
    //FIXME
    var setTime = $(locator.AGENDA_START_TIME_INPUT_CSS).getAttribute('value');

    expect($$(locator.TASK_START_TIME_CSS).first().getText()).toEqual(setTime);   //was it getting last value, '00:00'? it's string
  });

  it('should be able to see updated agenda start time in first task', () => {
    var startTime = support.updateStartTime(3);

    expect($(locator.AGENDA_START_TIME_INPUT_CSS).getAttribute('value')).toEqual(startTime);
    expect($(locator.TASK_START_TIME_CSS).getText()).toEqual(startTime);
  });

  it('should be able to set time to Now', () => {
    var startTime = support.updateStartTime(0);
    $(locator.AGENDA_START_TIME_NOW_CSS).click();

    expect($(locator.AGENDA_START_TIME_INPUT_CSS).getAttribute('value')).toEqual(startTime);
    expect($(locator.TASK_START_TIME_CSS).getText()).toEqual(startTime);
  });

  it('should be able to update task title', () => {
    var title = support.updateTaskTitle();

    expect($(locator.TASK_TITLE_CSS).getAttribute('value')).toEqual(title);
  });

  it('should be able to update task description', () => {
    var description = support.updateTaskDescription();

    expect($(locator.TASK_DESCRIPTION_CSS).getAttribute('value')).toEqual(description);
  });

  it('should be able to update task duration', () => {
    var duration = support.updateTaskDuration();

    expect($(locator.TASK_DURATION_CSS).getAttribute('value')).toEqual(duration);
  });

  it('should be able to mark task as done', () => {   //FIXME: make me independent
    var successful = support.updateTaskToDone();
    
    expect($(locator.TASK_COMPLETE_CSS).getAttribute('ng-reflect-checked')).toEqual('true');
  });

  it('should be able to unmark task from done', () => {  //FIXME: make me independent
    support.updateTaskToNotDone();

    expect($(locator.TASK_COMPLETE_CSS).getAttribute('ng-reflect-checked')).toBeNull();
  });

  it('should be able to move task down', () => {
    support.addEmptyTask();
    var title = support.updateTaskTitle();
    $(locator.TASK_MOVE_DOWN_CSS).click();

    expect($(locator.TASK_TITLE_CSS).getAttribute('value')).not.toEqual(title);
    expect(support.allTasks().last().$(locator.TASK_TITLE_CSS).getAttribute('value')).toEqual(title);
  });

  it('should be able to move task up', () => {
    var title = support.updateTaskTitle();
    support.allTasks().last().element(by.id('taskMoveUp')).click();

    expect($(locator.TASK_TITLE_CSS).getAttribute('value')).not.toEqual(title);
    expect(support.allTasks().last().$('#taskTitle').getAttribute('value')).toEqual(title);
  });

  it('should only show arrow to move down for first task', () => {
    expect(support.allTasks().first().$('#taskMoveDown').isPresent()).toBeTruthy();
    expect(support.allTasks().first().$('#taskMoveUp').isPresent()).toBeFalsy();
  });

  it('should only show arrow to move up for last task', () => {
    expect(support.allTasks().last().$('#taskMoveUp').isPresent()).toBeTruthy();
    expect(support.allTasks().last().$('#taskMoveDown').isPresent()).toBeFalsy();
  });

  it('should be able calculate end time of all tasks based on duration', () => {
    var i = 0;
    while (i <= 10) {
      support.addEmptyTask();
      i++;
    }

    support.updateStartTime(0);    //just a workaround for a bug with displaying task start time

    var startTime = $(locator.AGENDA_START_TIME_INPUT_CSS).getAttribute('value');
    var tasksCount = support.countTasks();   //assumption: last task is the final (END) task

    tasksCount.then((count) => {
      var agendaDuration = (count - 1) * 10;   //TODO: remove -1 when final (END) task is added
      console.log('--------- agedaDuration: ' + agendaDuration);

      startTime.then((time) => {
          var agendaStartTime = support.timeAdjustedTextBy(time, 0);
          console.log('agendaStartTime: ' + agendaStartTime);
          var expectedEndTime = support.timeAdjustedTextBy(agendaStartTime, agendaDuration);
          console.log('expectedEndTime: ' + expectedEndTime);

          expect(support.allTaskStartTimes().last().getText()).toEqual(expectedEndTime);
      });
    });
  });

  it('should be able to delete all tasks leaving one empty', () => {
      support.deleteAllTasksFromCurrentAgenda();

      expect(support.allTasks().count()).toEqual(1);
      expect($(locator.TASK_TITLE_CSS).getAttribute('value')).toEqual('');
      expect($(locator.TASK_DESCRIPTION_CSS).getAttribute('value')).toEqual('');
      expect($(locator.TASK_DURATION_CSS).getAttribute('value')).toEqual('10');
      expect($(locator.TASK_COMPLETE_CSS).getAttribute('ng-reflect-checked')).toBeNull();
  }); 

  afterAll(() => {
    support.logout();
  });
});
