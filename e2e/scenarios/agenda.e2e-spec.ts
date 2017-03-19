import { $, $$ }    from 'protractor'

import { FlexAgendaLocators }   from '../support/elementLocators.e2e';
import { WaitHelpers }          from '../support/waits.e2e';
import { Support }    from '../support/support.e2e';

describe('User', () => {
  var support: Support;
  var wait: WaitHelpers;
  var locator: FlexAgendaLocators;
  
  beforeAll((done) => {
    support = new Support();
    wait = new WaitHelpers();
    locator = new FlexAgendaLocators();

    support.loginIfNeeded().then(() => {
      // console.log('login if needed in agenda tests');
      done();
    });
  });

  it('should be able to add a new agenda to the list', () => {
    wait.waitForElementPresent($(locator.AGENDA_CSS)).then(() => {
      var initialAgendasCount = 0;
      var initialAgednasCountPromise = support.countAgendas();
      //add new agenda and check if added
      initialAgednasCountPromise.then((count) => {
        initialAgendasCount = count;
        support.addNewAgenda();

        expect(support.countAgendas()).toEqual(initialAgendasCount+1);
      });

      expect(support.allAgendasStartTimes().last().getAttribute('value'))
        .toEqual(support.timeNowAdjustedText(0,0));
      expect($$(locator.AGENDA_TITLE_CSS).last().getAttribute('value'))
        .toEqual('NEW AGENDA TITLE - click to edit'); //create timeNowFormatted()

    });
  });

  it('should be able to rename agenda', () => {
    console.log('Test in preparation');
  });

  it('should be able to change start time of an agenda', () => {
    console.log('Test in preparation');
  });
  
  it('should be able to enter agenda', () => {
    console.log('Test in preparation');
  });

  it('should be able to delete all agendas from the list', () => {
   support.deleteAllAgendas();

   expect(support.allAgendas().count()).toEqual(0);
  });

  afterAll(() => {
    support.logout();
  });
});