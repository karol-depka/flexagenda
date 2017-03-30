import { Support }         from '../support/support.e2e';
import { WaitHelpers }     from '../support/waits.e2e';
import { AgendaTest }      from './agenda.view_object';
import { TaskListTest }    from './tasks_list.view_object';

import { $, $$, browser }  from 'protractor';

export class AgendasListTest {
  // constructor(
  //   public wait: WaitHelpers,
  //   public support: Support
  // ) {}
  private wait = new WaitHelpers();
  private support = new Support();
  private agenda = new AgendaTest();
  private taskList = new TaskListTest();

  readonly AGENDA_SELECTOR                  = '#agenda';
  readonly AGENDA_ADD_NEW_SELECTOR          = '#agendaAddNew';
  readonly AGENDA_DELETE_SELECTOR           = '#agendaDelete';
  readonly AGENDA_OPEN_SELECTOR             = '#openAgenda';
  readonly AGENDA_LIST_SELECTOR             = 'agendas-list';

  addAgendaButton() {
    return $(this.AGENDA_ADD_NEW_SELECTOR);
  }

  addNewAgenda() {
    var addAgendaElement = this.addAgendaButton();
    this.wait.forElementPresent(addAgendaElement);
     addAgendaElement.click().then(() => {
       this.wait.forElementPresent($(this.agenda.AGENDA_TITLE_SELECTOR));
    });
  }

  addAndDisplayNewTestAgenda(done?) {
    this.addNewAgenda();
    return this.wait.forElementPresent($(this.AGENDA_OPEN_SELECTOR)).then(() => {
      // console.log('before it clicks to open new agenda');
      $$(this.AGENDA_OPEN_SELECTOR).last().click().then(() => {
        // console.log('after opening agenda, before wait for element not prersent');
        this.wait.forElementPresent($(this.taskList.TASK_SELECTOR)).then(() => {
          // console.log('Not on agendas list, single agenda view');
          if (done) done();
        });
      });
    });
  }

  openNewlyCreatedAgenda() {    //FIXME: move this part from method above, here
    $$(this.AGENDA_SELECTOR).last().$(this.AGENDA_OPEN_SELECTOR).click();
    return this.wait.forElementCount($$(this.agenda.AGENDA_TITLE_SELECTOR), 1);
  }

  allStartTimes() {
    return $$(this.agenda.AGENDA_START_TIME_INPUT_SELECTOR);
  }

  allAgendas() {
    return $$(this.AGENDA_SELECTOR);
  }

  allTitleElements() {
    return $$(this.agenda.AGENDA_TITLE_SELECTOR);
  }

  countAgendas() {
    return this.allAgendas().count();
  }

  deleteFirstAgendaOnTheList() {
    $$(this.AGENDA_DELETE_SELECTOR).first().click();

    this.support.confirmDelete();
  }

  deleteAll() {
    browser.sleep(3000);
    browser.get('/agendas');
    this.wait.forElementPresent($(this.AGENDA_DELETE_SELECTOR));

    this.allAgendas().count().then((count) => {
      while (count > 0) {
        browser.sleep(1000);    //FIXME: remove or update after fix for nuking all agendas is in place
        this.deleteFirstAgendaOnTheList();
        count--;
      }
    });
  }
}
