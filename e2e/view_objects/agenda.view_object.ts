import { $, $$ }  from 'protractor';

import { FlexAgendaLocators } from '../support/elementLocators.e2e';
import { Support }            from '../support/support.e2e';
import { WaitHelpers }        from '../support/waits.e2e';

export class AgendaTest {
  private locator = new FlexAgendaLocators();
  private support = new Support();
  private wait = new WaitHelpers();

  openNewlyCreatedAgenda() {
    $$(this.locator.AGENDA_SELECTOR).last().$(this.locator.AGENDA_OPEN_SELECTOR).click();
    return this.wait.forElementCount($$(this.locator.AGENDA_TITLE_SELECTOR), 1);
  }

  startTime() {
    return $(this.locator.AGENDA_START_TIME_INPUT_SELECTOR).getAttribute('value');
  }

  title() {
    return $(this.locator.AGENDA_TITLE_SELECTOR).getAttribute('value');
  }

  clickStartNow() {
    $(this.locator.AGENDA_START_TIME_NOW_SELECTOR).click();
  }

  updateTitle() {
    var milliseconds = new Date().getMilliseconds();
    var newTitle = 'This is a title of an agenda at ' + milliseconds + ' milliseconds';

    var title = $(this.locator.AGENDA_TITLE_SELECTOR);
    title.clear();
    title.sendKeys(newTitle);

    return newTitle;
  }

  updateStartTime(adjustMinutes?: number):string {
    if(adjustMinutes == undefined) {
      adjustMinutes = 0;
    }

    var timeFormatted = this.support.timeNowAdjustedText(0, adjustMinutes);
    $(this.locator.AGENDA_START_TIME_INPUT_SELECTOR).sendKeys(timeFormatted);

    return timeFormatted;
  }
}
