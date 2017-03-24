import { browser, protractor, ElementFinder, ElementArrayFinder } from 'protractor';

export class WaitHelpers {
  ec = protractor.ExpectedConditions;

  forTextPresent(element: ElementFinder, text: string) {
    return this.forElementText(element, text);
  }

  forElementText(element: ElementFinder, text: string) {
    return browser.wait(this.ec.textToBePresentInElement(element, text));
  }

  forElementNotPresent(element: ElementFinder) {
    return browser.wait(this.ec.not(this.ec.presenceOf(element)));
  }

  forElementPresent(element: ElementFinder) {
    return browser.wait(this.ec.presenceOf(element));
  }

  forElementCount(elementArray: ElementArrayFinder, expectedCount: number) {
    return browser.wait(() =>
      elementArray.count().then((actualCount) => {
        return expectedCount === actualCount;
      }));
    }
}
