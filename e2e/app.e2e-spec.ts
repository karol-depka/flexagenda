import { browser, by, $$ } from 'protractor';

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
      
      expect(locator.TASK_TITLE.getAttribute('value')).toEqual('');
      expect(locator.TASK_DESCRIPTION.getAttribute('value')).toEqual('');
      expect(locator.TASK_DURATION.getAttribute('value')).toEqual('10');
      expect(locator.TASK_COMPLETE.getAttribute('ng-reflect-checked')).toBeNull();
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
    var setTime = locator.AGENDA_START_TIME_INPUT.getAttribute('value');

    expect(locator.TASK_START_TIME.getText()).toEqual(setTime);
  });

  it('should be able to see updated agenda start time in first task', () => {
    var startTime = agenda.updateStartTime(3);

    expect(locator.AGENDA_START_TIME_INPUT.getAttribute('value')).toEqual(startTime);
    expect(locator.TASK_START_TIME.getText()).toEqual(startTime);
  });

  it('should be able to set time to Now', () => {
    var startTime = agenda.updateStartTime(0);
    locator.AGENDA_START_TIME_NOW.click();

    expect(locator.AGENDA_START_TIME_INPUT.getAttribute('value')).toEqual(startTime);
    expect(locator.TASK_START_TIME.getText()).toEqual(startTime);
  });

  it('should be able calculate end time of all tasks based on duration', () => {
    var i = 0;
    while (i <= 10) {
      agenda.addEmptyTask();
      i++;
    }

    agenda.updateStartTime(0);    //just a workaround for a bug with displaying task start time

    var startTime = locator.AGENDA_START_TIME_INPUT.getAttribute('value');
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

  it('should be able to edit task title to a text', () => {
    var title = agenda.updateTaskTitle();

    expect(locator.TASK_TITLE.getAttribute('value')).toEqual(title);
  });

  it('should be able to edit task description to a text', () => {
    var title = agenda.updateTaskDescription();

    expect(locator.TASK_DESCRIPTION.getAttribute('value')).toEqual(title);
  });

  it('should be able to edit task duration', () => {
    var duration = agenda.updateTaskDuration();

    expect(locator.TASK_DURATION.getAttribute('value')).toEqual(duration);
  });

  it('should be able to mark task as done', () => {   //FIXME: make me independent
    var successful = agenda.updateTaskToDone();
    
    expect(locator.TASK_COMPLETE.getAttribute('ng-reflect-checked')).toEqual('true');
  });

  it('should be able to unmark task from done', () => {  //FIXME: make me independent
    agenda.updateTaskToNotDone();

    expect(locator.TASK_COMPLETE.getAttribute('ng-reflect-checked')).toBeNull();
  });

  // it('should be able to move task up', () => {
  //   // secondTask = ....locator.TASK_MOVE_UP.click();
  //   // secondTask.click();

  // });

  // it('should be able to move task down', () => {
  //   // locator.TASK_MOVE_DOWN.click();

  // });

  it('should only show arrow to move down for first task', () => {
    expect(agenda.allTasks().first().element(by.id('taskMoveDown')).isPresent()).toBeTruthy();
    expect(agenda.allTasks().first().element(by.id('taskMoveUp')).isPresent()).toBeFalsy();
  });

  it('should only show arrow to move up for last task', () => {
    expect(agenda.allTasks().last().element(by.id('taskMoveUp')).isPresent()).toBeTruthy();
    expect(agenda.allTasks().last().element(by.id('taskMoveDown')).isPresent()).toBeFalsy();
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
      expect(locator.TASK_TITLE.getAttribute('value')).toEqual('');
      expect(locator.TASK_DESCRIPTION.getAttribute('value')).toEqual('');
      expect(locator.TASK_DURATION.getAttribute('value')).toEqual('10');
      expect(locator.TASK_COMPLETE.getAttribute('ng-reflect-checked')).toBeNull();
  }); 
});
