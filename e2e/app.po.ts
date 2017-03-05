import { browser, element, by, protractor } from 'protractor';

export class FlexagendaCliPage {
  navigateTo() {
    browser.get('/');
    
  }

  getParagraphText() {
    return element(by.css('app-login > p')).getText();
  }
}
