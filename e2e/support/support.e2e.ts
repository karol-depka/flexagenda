import { DeleteDialogTest }           from '../view_objects/delete_dialog.view_object';

import { browser, protractor, $, $$ } from 'protractor';

export class Support {
  ec = protractor.ExpectedConditions;
  private deleteDialog = new DeleteDialogTest();

  timeNowAdjustedText(hours: number, minutes: number): string {   //not sure if it's working properly
    var time = this.timeNowAdjusted(hours, minutes);
    var timeFormatted = this.addZero(time.getHours()) + ':' + this.addZero(time.getMinutes());

    return timeFormatted;
  }

  timeNowAdjusted(hours: number, minutes: number): Date {      //not sure if it's working properly
    var time = new Date();
    time.setHours(time.getHours() + hours);
    time.setMinutes(time.getMinutes() + minutes);

    return time;
  }

  timeAdjustedTextBy(timeFormatted: string, minutes: number): string {
    var time = this.timeAdjustedBy(timeFormatted, minutes);
    var timeText = this.addZero(time.getHours()) + ':' + this.addZero(time.getMinutes());

    return timeText;
  }

  timeAdjustedBy(timeFormatted: string, minutes: number): Date {
    var timeSplit = timeFormatted.split(':');
    var time = new Date();
    time.setHours(+timeSplit[0]);
    time.setMinutes(+timeSplit[1] + minutes);

    return time;
  }

  confirmDelete() {
    var confirmDelete = $(this.deleteDialog.DELETE_CONFIRM_SELECTOR);
    browser.wait(this.ec.presenceOf(confirmDelete));
    confirmDelete.click();
  }

  addZero(input): string {
    return input < 10 ? ("0" + input) : input;
  }
}
