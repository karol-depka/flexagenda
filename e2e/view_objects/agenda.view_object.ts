import { $ }  from 'protractor';

import { FlexAgendaLocators } from '../support/elementLocators.e2e';
import { Support } from '../support/support.e2e';

export class AgendaTest {
  locator = new FlexAgendaLocators();
  support = new Support();
  
  agendaStartTime() {
    return $(this.locator.AGENDA_START_TIME_INPUT_SELECTOR).getAttribute('value');
  }

  clickStartNow() {
    $(this.locator.AGENDA_START_TIME_NOW_SELECTOR).click();
  }

  updateStartTime(adjustMinutes: number):string {
    var timeFormatted = this.support.timeNowAdjustedText(0, adjustMinutes);
    $(this.locator.AGENDA_START_TIME_INPUT_SELECTOR).sendKeys(timeFormatted);

    return timeFormatted;
  }
}