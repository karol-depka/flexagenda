import { $, $$ }  from 'protractor';

import { FlexAgendaLocators } from '../support/elementLocators.e2e';
import { Support }            from '../support/support.e2e';
import { WaitHelpers }        from '../support/waits.e2e';

export class AgendaTest {
  private support = new Support();
  private wait = new WaitHelpers();

  openNewlyCreatedAgenda() {
    $$(FlexAgendaLocators.AGENDA_SELECTOR).last().$(FlexAgendaLocators.AGENDA_OPEN_SELECTOR).click();
    return this.wait.forElementCount($$(FlexAgendaLocators.AGENDA_TITLE_SELECTOR), 1);
  }

  startTime() {
    return $(FlexAgendaLocators.AGENDA_START_TIME_INPUT_SELECTOR).getAttribute('value');
  }

  title() {
    return $(FlexAgendaLocators.AGENDA_TITLE_SELECTOR).getAttribute('value');
  }

  clickStartNow() {
    $(FlexAgendaLocators.AGENDA_START_TIME_NOW_SELECTOR).click();
  }

  updateTitle(): string {
    var milliseconds = new Date().getMilliseconds();
    var newTitle = 'This is a title of an agenda at ' + milliseconds + ' milliseconds';

    var title = $(FlexAgendaLocators.AGENDA_TITLE_SELECTOR);
    title.clear();
    title.sendKeys(newTitle);

    return newTitle;
  }

  updateStartTime(adjustMinutes?: number): string {
    if(adjustMinutes == undefined) {
      adjustMinutes = 0;
    }

    var timeFormatted = this.support.timeNowAdjustedText(0, adjustMinutes);
    $(FlexAgendaLocators.AGENDA_START_TIME_INPUT_SELECTOR).sendKeys(timeFormatted);

    return timeFormatted;
  }
}
