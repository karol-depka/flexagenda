import { $, $$, browser } from 'protractor';

import { WaitHelpers }          from './waits.e2e';
import { TestData }             from '../support/testData.e2e';
import { FlexAgendaLocators }   from '../support/elementLocators.e2e';
import { Support }              from '../support/support.e2e';
import { TaskListTest }         from '../view_objects/tasks_list.view_object';
import { AgendasListTest }      from '../view_objects/agendas_list.view_object';
import { AgendaTest }           from '../view_objects/agenda.view_object';

export class FlexAgendaAssertions {
    wait: WaitHelpers;
    data: TestData;
    locator: FlexAgendaLocators;
    support: Support;
    taskList: TaskListTest;
    agenda: AgendaTest;
    agendasList: AgendasListTest;

    constructor() {
        this.wait = new WaitHelpers();
        this.data = new TestData();
        this.locator = new FlexAgendaLocators();
        this.support = new Support();
        this.taskList = new TaskListTest();
        this.agenda = new AgendaTest();
        this.agendasList = new AgendasListTest();
    }

    onLoginPage() {
        expect(this.wait.forExpectedTextInElement('Please login', this.locator.LOGIN_TEXT_ELEMENT_SELECTOR))
            .toEqual(true);
    }

    notOnLoginPage() {
        expect(this.wait.forElementNotPresent($(this.locator.LOGIN_TEXT_ELEMENT_SELECTOR)))
            .toEqual(true);
    }

    userIsLoggedIn() {
        expect(this.wait.forExpectedTextInElement('Logged in as ' + this.data.USER_LOGIN,
            this.locator.LOGGED_IN_USER_TEXT_SELECTOR)).toEqual(true);
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
        this.wait.forElementPresent($(this.locator.AGENDA_ADD_NEW_SELECTOR));
        browser.sleep(3000); //FIXME: agendas are loaded with a delay (firebase); arbitrary wait time
        expect(this.agendasList.allAgendas().count()).toEqual(0);
    }

    startTimeIs(time: string) {
        expect($(this.locator.AGENDA_START_TIME_INPUT_SELECTOR)
            .getAttribute('value')).toEqual(time);
        this.startTimeSetForTasks(time);
    }

    tasksCount(count: number) {
        expect(this.taskList.countTasks()).toEqual(count);
    }

    lastTaskHasMoveUpArrow() {
        expect(this.taskList.allTasks().last().$(this.locator.TASK_MOVE_UP_SELECTOR)
            .isPresent()).toBeTruthy();
    }

    lastTaskDoesntHaveMoveDownArrow() {
        expect(this.taskList.allTasks().last().$(this.locator.TASK_MOVE_DOWN_SELECTOR)
            .isPresent()).toBeFalsy();
    }

    firstTaskHasMoveDownArrow() {
        expect(this.taskList.allTasks().first().$(this.locator.TASK_MOVE_DOWN_SELECTOR)
            .isPresent()).toBeTruthy();
    }

    firstTaskDoesntHaveMoveUpArrow() {
        expect(this.taskList.allTasks().first().$(this.locator.TASK_MOVE_UP_SELECTOR)
            .isPresent()).toBeFalsy();
    }

    taskTitleIs(title: string) {
        expect($$(this.locator.TASK_TITLE_SELECTOR).first()
            .getAttribute('value')).toEqual(title);
    }

    taskDescriptionIs(description: string) {
        expect($$(this.locator.TASK_DESCRIPTION_SELECTOR).first()
            .getAttribute('value')).toEqual(description);
    }

    taskDurationIs(duration: string) {
        //add optional parameter for the elementFinder. If not specified, use first
        expect($$(this.locator.TASK_DURATION_SELECTOR).first()
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
        expect($$(this.locator.TASK_TITLE_SELECTOR).first()
          .getAttribute('value')).not.toEqual(title);

        expect(this.taskList.allTasks().last().$(this.locator.TASK_TITLE_SELECTOR)
          .getAttribute('value')).toEqual(title);
    }

    agendaEndTimeIs(expectedEndTime: string) {
        expect(this.taskList.allStartTimes().last().getText()).toEqual(expectedEndTime);
    }

    agendaTitleIs(expectedTitle: string) {
        expect(this.agenda.grabAgendaTitle()).toEqual(expectedTitle);
    }

    agendaStartTimeIs(expectedStartTime: string) {
        expect($(this.locator.AGENDA_START_TIME_INPUT_SELECTOR).getAttribute('value'))
            .toEqual(expectedStartTime);
    }

    singleAgendaIsOpen() {
        expect($$(this.locator.AGENDA_TITLE_SELECTOR).count()).toEqual(1);
    }
}
