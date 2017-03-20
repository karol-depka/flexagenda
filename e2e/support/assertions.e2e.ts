import { $, $$ } from 'protractor'

import { WaitHelpers } from './waits.e2e';
import { TestData } from '../support/testData.e2e'
import { FlexAgendaLocators } from '../support/elementLocators.e2e'
import { Support } from '../support/support.e2e'

export class FlexAgendaAssertions {
    wait: WaitHelpers;
    data: TestData;
    locator: FlexAgendaLocators;
    support: Support;

    constructor() {
        this.wait = new WaitHelpers();
        this.data = new TestData();
        this.locator = new FlexAgendaLocators();
        this.support = new Support();
    }

    onLoginPage() {
        expect(this.wait.forExpectedTextInElement('Please login', 'app-login > p'))
            .toEqual(true);
    }

    notOnLoginPage() {
        expect(this.wait.forElementNotPresent($('app-login > p')))
            .toEqual(true);
    }

    userIsLoggedIn() {
        expect(this.wait.forExpectedTextInElement('Logged in as ' + this.data.USER_LOGIN,
            'flexagenda-app > span')).toEqual(true);
    }

    firstTaskEmpty() {
        expect($$(this.locator.TASK_TITLE_SELECTOR).first().getAttribute('value')).toEqual('');
        expect($$(this.locator.TASK_DESCRIPTION_SELECTOR).first().getAttribute('value')).toEqual('');
        expect($$(this.locator.TASK_DURATION_SELECTOR).first().getAttribute('value')).toEqual('10');
        expect($$(this.locator.TASK_COMPLETE_SELECTOR).first().getAttribute('ng-reflect-checked')).toBeNull();
    }

    startTimeSetForTasks(time: string) {
        expect($$(this.locator.TASK_START_TIME_SELECTOR).first().getText()).toEqual(time);
    }

    agendasListEmpty() {
        expect(this.support.allAgendas().count()).toEqual(0);
    }

    startTimeIsSetTo(time: string) {
        expect($(this.locator.AGENDA_START_TIME_INPUT_SELECTOR)
            .getAttribute('value')).toEqual(time);
        this.startTimeSetForTasks(time);
    }

    tasksCount(count: number) {
        expect(this.support.countTasks()).toEqual(count);
    }

    lastTaskHasMoveUpArrow() {
        expect(this.support.allTasks().last().$(this.locator.TASK_MOVE_UP_SELECTOR)
            .isPresent()).toBeTruthy();
    }

    lastTaskDoesntHaveMoveDownArrow() {
        expect(this.support.allTasks().last().$(this.locator.TASK_MOVE_DOWN_SELECTOR)
            .isPresent()).toBeFalsy();
    }

    firstTaskHasMoveDownArrow() {
        expect(this.support.allTasks().first().$(this.locator.TASK_MOVE_DOWN_SELECTOR)
            .isPresent()).toBeTruthy();
    }

    firstTaskDoesntHaveMoveUpArrow() {
        expect(this.support.allTasks().first().$(this.locator.TASK_MOVE_UP_SELECTOR)
            .isPresent()).toBeFalsy();
    }

    taskTitleSetTo(title: string) {
        expect($(this.locator.TASK_TITLE_SELECTOR)
            .getAttribute('value')).toEqual(title);
    }

    taskDescriptionSetTo(description: string) {
        expect($(this.locator.TASK_DESCRIPTION_SELECTOR)
            .getAttribute('value')).toEqual(description);
    }

    taskDurationSetTo(duration: string) {
        expect($(this.locator.TASK_DURATION_SELECTOR)
            .getAttribute('value')).toEqual(duration);
    }

    firstTaskMarkedAsDone(done: boolean) {
        if(done) {
            expect($$(this.locator.TASK_COMPLETE_SELECTOR).first()
                .getAttribute('ng-reflect-checked')).toEqual('true');
        }
        else {
            expect($$(this.locator.TASK_COMPLETE_SELECTOR).first()
                .getAttribute('ng-reflect-checked')).toBeNull();
        }
    }

    taskMoved(title: string) {
        expect($$(this.locator.TASK_TITLE_SELECTOR).first().getAttribute('value')).not.toEqual(title);
        expect(this.support.allTasks().last().$(this.locator.TASK_TITLE_SELECTOR).getAttribute('value')).toEqual(title);
    }

    agendaEndTimeIsEqualTo(expectedEndTime: string) {
        expect(this.support.allTaskStartTimes().last().getText()).toEqual(expectedEndTime);
    }
}