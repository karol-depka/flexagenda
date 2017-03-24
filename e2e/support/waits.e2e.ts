import { browser, protractor, $, ElementFinder } from 'protractor';

export class WaitHelpers {
  ec = protractor.ExpectedConditions;

  forExpectedTextInElement(text: string, elementCss: string) {
    return this.forElementText($(elementCss), text);
  }

  forElementText(element: ElementFinder, text: string) {
    return browser.wait(this.ec.textToBePresentInElement(element, text));
  }

  forElementNotPresent(elementCss) {
    return browser.wait(this.ec.not(this.ec.presenceOf(elementCss)));
  }

  forElementPresent(elementFinder: ElementFinder) {
    return browser.wait(this.ec.presenceOf(elementFinder));
  }

  forElementCount(elementArrayFinder, expectedCount) {
    // console.log('start waiting for count');
    return browser.wait(() =>
      elementArrayFinder.count().then((actualCount) => {
        // console.log('before condition is checked; expected: ' + expectedCount + ' actual count: ' + actualCount);
        return expectedCount === actualCount;  // or <= instead of ===, depending on the use case
      }));
    }
}
