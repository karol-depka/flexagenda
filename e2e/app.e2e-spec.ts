import { browser, by, $ } from 'protractor';

import { FlexagendaCliPage }  from './support.e2e';
import { WaitHelpers }        from './waits.e2e'
import { FlexAgendaLocators } from './elementLocators.e2e'

browser.ignoreSynchronization = true;

describe('Flexagenda', function() {
  var agendaId = '-KdSBN0xRC0A62t_TzNm';
  var agenda: FlexagendaCliPage;
  var waits: WaitHelpers;
  var locator: FlexAgendaLocators;

//  beforeEach(() => {
    agenda = new FlexagendaCliPage();
    waits = new WaitHelpers();
    locator = new FlexAgendaLocators();

//});

  it('should display message saying to login', () => {
    agenda.navigateToLogin();

    expect(waits.waitForExpectedTextInElement('Please login', 'app-login > p'))
        .toEqual(true);
  });

  it('should login', () => {
    agenda.loginAndDisplayAgenda(agendaId);

    expect(waits.waitForElementNotPresent('app-login > p'))
        .toEqual(true);
    expect(waits.waitForExpectedTextInElement('Logged in as ' + agenda.userLogin, 'flexagenda-app > span'))
        .toEqual(true);
  });

  it('should be able to add an empty task', () => {
    var initialTaskCount = 0;
    var initialTaskCountPromise = agenda.countTasks();
    initialTaskCountPromise.then(function(value) {
      initialTaskCount = value;
      agenda.addEmptyTaskFirst();

      expect(agenda.countTasks()).toEqual(initialTaskCount+1);
    })
      
      expect($(locator.TASK_TITLE_CSS).getAttribute('value')).toEqual('');
      expect($(locator.TASK_DESCRIPTION_CSS).getAttribute('value')).toEqual('');
      expect($(locator.TASK_DURATION_CSS).getAttribute('value')).toEqual('10');
      expect($(locator.TASK_COMPLETE_CSS).getAttribute('ng-reflect-checked')).toBeNull();
  });

  it('should be able to delete a task', () => {
    var initialTaskCount = 0;
    var initialTaskCountPromise = agenda.countTasks();
    initialTaskCountPromise.then(function(value) {
      initialTaskCount = value;
      agenda.deleteTask();

      expect(agenda.countTasks()).toEqual(initialTaskCount-1);
    })
  });

  it('should be able to show start time for all tasks', () => {
    var setTime = $(locator.AGENDA_START_TIME_INPUT_CSS).getAttribute('value');

    expect($(locator.TASK_START_TIME_CSS).getText()).toEqual(setTime);
  });

  it('should be able to see updated agenda start time in first task', () => {
    var startTime = agenda.updateStartTime(3);

    expect($(locator.AGENDA_START_TIME_INPUT_CSS).getAttribute('value')).toEqual(startTime);
    expect($(locator.TASK_START_TIME_CSS).getText()).toEqual(startTime);
  });

  it('should be able to set time to Now', () => {
    var startTime = agenda.updateStartTime(0);
    $(locator.AGENDA_START_TIME_NOW_CSS).click();

    expect($(locator.AGENDA_START_TIME_INPUT_CSS).getAttribute('value')).toEqual(startTime);
    expect($(locator.TASK_START_TIME_CSS).getText()).toEqual(startTime);
  });

  it('should be able to update task title', () => {
    var title = agenda.updateTaskTitle();

    expect($(locator.TASK_TITLE_CSS).getAttribute('value')).toEqual(title);
  });

  it('should be able to update task description', () => {
    var description = agenda.updateTaskDescription();

    expect($(locator.TASK_DESCRIPTION_CSS).getAttribute('value')).toEqual(description);
  });

  it('should be able to update task duration', () => {
    var duration = agenda.updateTaskDuration();

    expect($(locator.TASK_DURATION_CSS).getAttribute('value')).toEqual(duration);
  });

  it('should be able to mark task as done', () => {   //FIXME: make me independent
    var successful = agenda.updateTaskToDone();
    
    expect($(locator.TASK_COMPLETE_CSS).getAttribute('ng-reflect-checked')).toEqual('true');
  });

  it('should be able to unmark task from done', () => {  //FIXME: make me independent
    agenda.updateTaskToNotDone();

    expect($(locator.TASK_COMPLETE_CSS).getAttribute('ng-reflect-checked')).toBeNull();
  });

  it('should be able to move task down', () => {
    agenda.addEmptyTask();
    var title = agenda.updateTaskTitle();
    $(locator.TASK_MOVE_DOWN_CSS).click();

    expect($(locator.TASK_TITLE_CSS).getAttribute('value')).not.toEqual(title);
    expect(agenda.allTasks().last().$(locator.TASK_TITLE_CSS).getAttribute('value')).toEqual(title);
  });

  it('should be able to move task up', () => {
    var title = agenda.updateTaskTitle();
    agenda.allTasks().last().element(by.id('taskMoveUp')).click();

    expect($(locator.TASK_TITLE_CSS).getAttribute('value')).not.toEqual(title);
    expect(agenda.allTasks().last().$('#taskTitle').getAttribute('value')).toEqual(title);
  });

  it('should only show arrow to move down for first task', () => {
    expect(agenda.allTasks().first().$('#taskMoveDown').isPresent()).toBeTruthy();
    expect(agenda.allTasks().first().$('#taskMoveUp').isPresent()).toBeFalsy();
  });

  it('should only show arrow to move up for last task', () => {
    expect(agenda.allTasks().last().$('#taskMoveUp').isPresent()).toBeTruthy();
    expect(agenda.allTasks().last().$('#taskMoveDown').isPresent()).toBeFalsy();
  });

  it('should be able calculate end time of all tasks based on duration', () => {
    var i = 0;
    while (i <= 10) {
      agenda.addEmptyTask();
      i++;
    }

    agenda.updateStartTime(0);    //just a workaround for a bug with displaying task start time

    var startTime = $(locator.AGENDA_START_TIME_INPUT_CSS).getAttribute('value');
    var tasksCount = agenda.countTasks();   //assumption: last task is the final (END) task

    tasksCount.then(function(count) {
      var agendaDuration = (count - 1) * 10;   //TODO: remove -1 when final (END) task is added
      console.log('--------- agedaDuration: ' + agendaDuration);

      startTime.then(function(time) {
          var agendaStartTime = agenda.timeAdjustedTextBy(time, 0);
          console.log('agendaStartTime: ' + agendaStartTime);
          var expectedEndTime = agenda.timeAdjustedTextBy(agendaStartTime, agendaDuration);
          console.log('expectedEndTime: ' + expectedEndTime);

          expect(agenda.allTaskStartTimes().last().getText()).toEqual(expectedEndTime);
      });
    });
  });

  it('should be able to delete all tasks leaving one empty', () => {
      agenda.allTasks().count().then(function(count) {
        var i = count;
        while (i > 0) {
          agenda.deleteTask();
          i--;
        }
      });

      expect(agenda.allTasks().count()).toEqual(1);
      expect($(locator.TASK_TITLE_CSS).getAttribute('value')).toEqual('');
      expect($(locator.TASK_DESCRIPTION_CSS).getAttribute('value')).toEqual('');
      expect($(locator.TASK_DURATION_CSS).getAttribute('value')).toEqual('10');
      expect($(locator.TASK_COMPLETE_CSS).getAttribute('ng-reflect-checked')).toBeNull();
  }); 
});
