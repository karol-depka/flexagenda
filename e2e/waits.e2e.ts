import { By } from 'protractor/built';
import { ElementFinder } from 'protractor/built/element';
import { element, by, browser, protractor } from 'protractor';

export class WaitHelpers {
  ec = protractor.ExpectedConditions;
  timeout = 3000;

  waitForExpectedTextInElement(text: string, locator: string) {
    return this.waitForElementText(element(by.css(locator)), text);
  }

  waitForExpectedTextInElementById(text: string, locator: string) {
      return this.waitForElementText(element(by.id(locator)), text);
  }

  waitForElementText(element: ElementFinder, text: string) {
    return browser.wait(this.ec.textToBePresentInElement(element, text), this.timeout);
  }

  waitForElementNotPresent(elementCss) {
    return browser.wait(this.ec.not(this.ec.presenceOf(element(by.css(elementCss)))), this.timeout);
  }

  waitForElementPresent(elementCss) {
    return browser.wait(this.ec.presenceOf(element(by.css(elementCss))), this.timeout);
  }

  waitForElementPresentById(elementId) {
    return browser.wait(this.ec.presenceOf(element(by.id(elementId))), this.timeout);
  }
}