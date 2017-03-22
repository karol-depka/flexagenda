import { $, $$ }  from 'protractor';

import { Support }            from '../support/support.e2e';
import { WaitHelpers }        from '../support/waits.e2e';
import { FlexAgendaLocators } from '../support/elementLocators.e2e';

export class AgendasListTest {
  private waits = new WaitHelpers();
  private locator = new FlexAgendaLocators();
  private support = new Support();

  addNewAgenda() {
 //   this.countAgendas().then((count) => {
    $(this.locator.AGENDA_ADD_NEW_SELECTOR).click();
      //expect(this.countAgendas()).toEqual(count+1);
 //   });
  }

  displayNewTestAgenda(done?) {
    this.addNewAgenda();
    return this.waits.forElementPresent($(this.locator.AGENDA_OPEN_SELECTOR)).then(() => {
      // console.log('before it clicks to open new agenda');
      $$(this.locator.AGENDA_OPEN_SELECTOR).last().click().then(() => {
        // console.log('after opening agenda, before wait for element not prersent');
        this.waits.forElementPresent($(this.locator.TASK_SELECTOR)).then(() => {
          // console.log('Not on agendas list, single agenda view');
          if (done) done();
        });
      });
    });
  }

  allAgendasStartTimes() {
    return $$(this.locator.AGENDA_START_TIME_INPUT_SELECTOR);
  }

  //TODO: check how it will behave when no agendas present
  allAgendas() {
    return $$(this.locator.AGENDA_SELECTOR);
  }

  countAgendas() {
    return this.allAgendas().count();
  }

  deleteFirstAgendaOnTheList() {
    $$(this.locator.AGENDA_DELETE_SELECTOR).first().click();

    this.support.confirmDelete();
  }

  deleteAllAgendas() {
    this.allAgendas().count().then((count) => {   //TODO: refactor to a new method?
      var i = count;
      while (i > 0) {
        this.deleteFirstAgendaOnTheList();
        i--;
      }
    });
  }
}