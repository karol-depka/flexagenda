import { $, $$, browser }  from 'protractor';

import { Support }            from '../support/support.e2e';
import { WaitHelpers }        from '../support/waits.e2e';
import { FlexAgendaLocators } from '../support/elementLocators.e2e';

export class AgendasListTest {
  private waits = new WaitHelpers();
  private locator = new FlexAgendaLocators();
  private support = new Support();

  addNewAgenda() {
    var addAgendaElement = $(this.locator.AGENDA_ADD_NEW_SELECTOR);
    this.waits.forElementPresent(addAgendaElement);
     addAgendaElement.click().then(() => {
       this.waits.forElementPresent($(this.locator.AGENDA_TITLE_SELECTOR));
    });
  }

  addAndDisplayNewTestAgenda(done?) {
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
    browser.sleep(3000);
    browser.get('/agendas');
    this.waits.forElementPresent($(this.locator.AGENDA_DELETE_SELECTOR));

    this.allAgendas().count().then((count) => {
      var i = count;
      while (i > 0) {
        this.deleteFirstAgendaOnTheList();
        i--;
      }
    });
  }
}
