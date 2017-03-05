import { browser, element, by } from 'protractor';

import { FlexagendaCliPage } from './app.po';

describe('Flexagenda ', function() {
  browser.ignoreSynchronization = true;
  
  let page: FlexagendaCliPage;

  beforeEach(() => {
    page = new FlexagendaCliPage();
  });

  it('should display message saying to login', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Please login.');
  });

  it('should login', () => {
    element(by.css('#md-input-0-input')).sendKeys('anna.bckwabb@gmail.com');
    element(by.css('#md-input-1-input')).sendKeys('T3st3r!');
    element(by.id('login')).click();
  });
});