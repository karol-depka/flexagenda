import { Support }            from '../support/support.e2e';
import { WaitHelpers }        from '../support/waits.e2e';

import { $, $$ }  from 'protractor';

export class AgendaTest {
  private support = new Support();
  private wait = new WaitHelpers();

  readonly AGENDA_TITLE_SELECTOR            = '#agendaTitle'
  readonly AGENDA_START_TIME_INPUT_SELECTOR = '#agendaStartTime';
  readonly AGENDA_START_TIME_NOW_SELECTOR   = '#agendaSetTimeToNow';

  startTime() {
    return $(this.AGENDA_START_TIME_INPUT_SELECTOR).getAttribute('value');
  }

  title() {
    return $(this.AGENDA_TITLE_SELECTOR).getAttribute('value');
  }

  clickStartNow() {
    $(this.AGENDA_START_TIME_NOW_SELECTOR).click();
  }

  updateTitle(): string {
    var milliseconds = new Date().getMilliseconds();
    var newTitle = 'This is a title of an agenda at ' + milliseconds + ' milliseconds';

    var title = $(this.AGENDA_TITLE_SELECTOR);
    title.clear();
    title.sendKeys(newTitle);

    return newTitle;
  }

  updateStartTime(adjustMinutes?: number): string {
    if(adjustMinutes == undefined) {
      adjustMinutes = 0;
    }

    var timeFormatted = this.support.timeNowAdjustedText(0, adjustMinutes);
    $(this.AGENDA_START_TIME_INPUT_SELECTOR).sendKeys(timeFormatted);

    return timeFormatted;
  }
}
