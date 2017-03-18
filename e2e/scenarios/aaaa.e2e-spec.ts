// import { WaitHelpers } from '../support/waits.e2e';
// import { FlexAgendaLocators } from '../support/elementLocators.e2e';
// import { browser, $, protractor } from 'protractor';

// var ec = protractor.ExpectedConditions;
// var locator = new FlexAgendaLocators();
// var waits = new WaitHelpers();

// fdescribe('This', () => {
//     // fit('------element nie istnieje', () => {
//     //     console.log('start wykonywania testu: element nie istnieje');
//     //     browser.get('/login');
//     //     browser.wait(ec.presenceOf($('#login'))).then(() => {
//     //         console.log('after waiting for login button');
//     //         browser.get('http://www.google.com');
//     //         browser.wait(ec.not(ec.presenceOf($('#login')))).then(() => {
//     //             console.log('my test object does not exist, move on');
//     //         });
//     //     });

//     // });

//     fit('------element nie istnieje', () => {
//         console.log('start wykonywania testu: element nie istnieje');
//         browser.get('/login');
//         browser.wait(ec.presenceOf($('#login'))).then(() => {
//             console.log('after waiting for login button');
//             browser.get('http://www.google.com');
//             waits.waitForElementNotPresent($(locator.TASK_CSS)).then(() => {
//                  console.log('my test object does not exist, move on');
//             });
//         });

//     });

// });