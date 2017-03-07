import { browser, by, $ } from 'protractor';

import { FlexagendaCliPage }  from './support.e2e';
import { WaitHelpers }        from './waits.e2e'
import { FlexAgendaLocators } from './elementLocators.e2e'

browser.ignoreSynchronization = true;

describe('Flexagenda', function() {
  let agendaId = '-KdSBN0xRC0A62t_TzNm';
  let agenda: FlexagendaCliPage;
  let waits: WaitHelpers;
  let locator: FlexAgendaLocators;

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
      agenda.addEmptyTask();

      expect(agenda.countTasks()).toEqual(initialTaskCount+1);
    })
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

  // it('should be able to mark task as done', () =>{   //FIXME: make me independent
  //   agenda.updateTaskToDone();

  //   expect(locator.TASK_COMPLETE.getAttribute('ng-reflect-checked')).toEqual('true');
  // });

  // it('should be able to unmark task from done', () => {  //FIXME: make me independent
  //   agenda.updateTaskToNotDone();

  //   expect(locator.TASK_COMPLETE.getAttribute('ng-reflect-checked')).toEqual('false');
  // });

  // it('should be able to move task up', () => {
  //   // secondTask = ....locator.TASK_MOVE_UP.click();
  //   // secondTask.click();

  // });

  // it('should be able to move task down', () => {
  //   // locator.TASK_MOVE_DOWN.click();


  // });

  // it('should move up arrow NOT show for first task', () => {
    
  // });

  // it('should move down arrow NOT show for last task', () => {

  // });

  // it('should be possible to remove all tasks except one empty', () => {
  //  //  expect(agenda.countTasks()).toEqual(1);
  //  //expect description empty
  //  //expect title empty
  //  //excpect duration default
  //  //expect done false
  // });  

  // it('should be able calculate end time of all tasks based on duration', () => {

  // });
});