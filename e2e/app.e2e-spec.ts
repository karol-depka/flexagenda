import { browser, element, by } from 'protractor';

import { FlexagendaCliPage }  from './support.e2e';
import { WaitHelpers }              from './waits.e2e'

browser.ignoreSynchronization = true;

describe('Flexagenda', function() {
  let agendaId = '-KdSBN0xRC0A62t_TzNm';
  let agenda: FlexagendaCliPage;
  let waits: WaitHelpers;
  let taskCount = 0;

//  beforeEach(() => {
    agenda = new FlexagendaCliPage();
    waits = new WaitHelpers();
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

  it('should be able to edit task title to a text', () =>{
    var title = agenda.updateTaskTitle();

    expect(element(by.id('taskTitle')).getAttribute('value')).toEqual(title);
  });

  it('should be able to edit task description to a text', () =>{
    var title = agenda.updateTaskDescription();

    expect(element(by.id('taskDescription')).getAttribute('value')).toEqual(title);
  });

  it('should be able to edit task duration to 25', () =>{
    var duration = 25;
    agenda.updateTaskDurationTo(duration);

    expect(element(by.id('taskDuration')).getAttribute('value')).toEqual(duration.toString());
  });

  it('should be able to mark task as done', () =>{

  });

  it('should be able to unmark task from done', () =>{

  });

  it('should be able to move task up', () =>{

  });

  it('should be able to move task down', () =>{

  });
});