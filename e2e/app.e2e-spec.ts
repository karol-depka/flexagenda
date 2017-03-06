import { browser, by } from 'protractor';

import { FlexagendaCliPage }  from './support.e2e';
import { WaitHelpers }        from './waits.e2e'
import { FlexAgendaLocators } from './elementLocators.e2e'

browser.ignoreSynchronization = true;

describe('Flexagenda', function() {
  let agendaId = '-KdSBN0xRC0A62t_TzNm';
  let agenda: FlexagendaCliPage;
  let waits: WaitHelpers;
  let taskCount = 0;
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

  // it('should be able to add an empty task', () => {
  //   agenda.countTasks().then(function(count) {
  //       taskCount = count;
  //   });

  //   agenda.addEmptyTask();

  //   expect(agenda.countTasks()).toEqual(taskCount+1);
  // });

  it('should be able to see updated agenda start time in first task', () => {
    agenda.updateStartTime();

    //expect(element(by.id('agendaStartTime'))).toEqual('11:11');
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

  it('should be able to move task up', () => {

  });

  it('should be able to move task down', () => {

  });

  it('should move up arrow NOT show for first task', () => {

  });

  it('should move down arrow NOT show for last task', () => {

  });

  it('should be possible to remove all tasks except one empty', () => {

  });
});