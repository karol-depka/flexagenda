import { $, $$, browser }    from 'protractor';

import { FlexAgendaLocators }   from '../support/elementLocators.e2e';
import { WaitHelpers }          from '../support/waits.e2e';
import { Support }              from '../support/support.e2e';
import { FlexAgendaAssertions } from '../support/assertions.e2e';
import { AgendasListTest }      from '../view_objects/agendas_list.view_object';
import { AgendaTest }           from '../view_objects/agenda.view_object';
import { LoginTest }            from '../view_objects/login.view_object';

browser.ignoreSynchronization = true;

describe('User', () => {
  var support:      Support;
  var wait:         WaitHelpers;
  var locator:      FlexAgendaLocators;
  var assert:       FlexAgendaAssertions;
  var agenda:       AgendaTest;
  var agendasList:  AgendasListTest;
  var loginPage:    LoginTest;
  
  beforeAll((done) => {
    support = new Support();
    wait = new WaitHelpers();
    locator = new FlexAgendaLocators();
    assert = new FlexAgendaAssertions();
    agenda = new AgendaTest();
    agendasList = new AgendasListTest();
    loginPage = new LoginTest();

    loginPage.loginIfNeeded().then(() => {
      // console.log('login if needed in agenda tests');
      done();
    });
  });

  it('should be able to add a new agenda to the list', () => {
    wait.forElementPresent($(locator.AGENDA_ADD_NEW_SELECTOR)).then(() => {
      browser.sleep(3000);    //FIXME: arbitrary waiting; not sure why count is incorrect
      agendasList.countAgendas().then((count) => {
       // console.log('c'+count);
        agendasList.addNewAgenda();
        expect(agendasList.countAgendas()).toEqual(count+1);
      });

      expect(agendasList.allAgendasStartTimes().last().getAttribute('value'))
        .toEqual(support.timeNowAdjustedText(0,0));
      expect($$(locator.AGENDA_TITLE_SELECTOR).last().getAttribute('value'))
        .toEqual('NEW AGENDA TITLE - click to edit');
    });
  });

  it('should be able to display agenda', () => {
     agendasList.addNewAgenda();
     agenda.openNewlyCreatedAgenda().then(() => {
       assert.singleAgendaIsOpen();
     }); 
  });

  it('should be able to rename agenda', () => {
    browser.sleep(3000);  //FIXME: title can't recieve clear signal although last step is waiting for title field
    var expectedTitle = agenda.updateTitle();

    assert.agendaTitleIs(expectedTitle);
  });

  it('should be able to change start time of an agenda', () => {
    var expectedStartTime = agenda.updateStartTime();

    assert.agendaStartTimeIs(expectedStartTime);
  });
  
  it('should be able to delete all agendas from the list', () => {
    agendasList.deleteAllAgendas();

    assert.agendasListEmpty();
  });

  afterAll(() => {
    loginPage.logout();
  });
});