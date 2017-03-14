import { element, by, browser, protractor, $, ElementFinder } from 'protractor';

export class WaitHelpers {
  ec = protractor.ExpectedConditions;

  waitForExpectedTextInElement(text: string, elementCss: string) {
    return this.waitForElementText($(elementCss), text);
  }

  waitForExpectedTextInElementById(text: string, elementCss: string) {
    return this.waitForElementText($(elementCss), text);
  }

  waitForElementText(element: ElementFinder, text: string) {
    return browser.wait(this.ec.textToBePresentInElement(element, text));
  }

  waitForElementNotPresent(elementCss) {
    return browser.wait(this.ec.not(this.ec.presenceOf($(elementCss))));
  }

  waitForElementPresent(elementCss) {
    return browser.wait(this.ec.presenceOf(elementCss));
  }

  waitForElement(webElement) {
    return browser.wait(this.ec.presenceOf(webElement));
  }
}