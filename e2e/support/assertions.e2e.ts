import { $, $$, browser } from 'protractor';

import { WaitHelpers }          from './waits.e2e';
import { Support }              from '../support/support.e2e';
import { TaskListTest }         from '../view_objects/tasks_list.view_object';
import { AgendasListTest }      from '../view_objects/agendas_list.view_object';
import { AgendaTest }           from '../view_objects/agenda.view_object';
import { FlexAgendaLocators }   from '../support/elementLocators.e2e'

export class FlexAgendaAssertions {
    wait: WaitHelpers;
    support: Support;
    taskList: TaskListTest;
    agenda: AgendaTest;
    agendasList: AgendasListTest;

    constructor() {
        this.wait = new WaitHelpers();
        this.support = new Support();
        this.taskList = new TaskListTest();
        this.agenda = new AgendaTest();
        this.agendasList = new AgendasListTest();
    }

    onLoginPage() {
        expect(this.wait.forTextPresent($(FlexAgendaLocators.LOGIN_TEXT_ELEMENT_SELECTOR),
            'Please login')).toEqual(true);
    }

    notOnLoginPage() {
        expect(this.wait.forElementNotPresent($(FlexAgendaLocators.LOGIN_TEXT_ELEMENT_SELECTOR)))
            .toEqual(true);
    }

    userIsLoggedIn(userLogin: string) {
        expect(this.wait.forTextPresent($(FlexAgendaLocators.LOGGED_IN_USER_TEXT_SELECTOR),
            'Logged in as ' + userLogin)).toEqual(true);
    }

    userIsLoggedOut(userLogin: string) {
        expect(this.wait.forElementNotPresent($(FlexAgendaLocators.LOGGED_IN_USER_TEXT_SELECTOR)))
            .toEqual(true);

        this.onLoginPage();
    }

    firstTaskEmpty() {
        expect($$(FlexAgendaLocators.TASK_TITLE_SELECTOR).first().getAttribute('value')).toEqual('');
        expect($$(FlexAgendaLocators.TASK_DESCRIPTION_SELECTOR).first().getAttribute('value')).toEqual('');
        expect($$(FlexAgendaLocators.TASK_DURATION_SELECTOR).first().getAttribute('value')).toEqual('10');
        expect($$(FlexAgendaLocators.TASK_COMPLETE_SELECTOR).first().getAttribute('ng-reflect-checked')).toBeNull();
    }

    startTimeSetForTasks(time: string) {
        expect($$(FlexAgendaLocators.TASK_START_TIME_SELECTOR).first().getText()).toEqual(time);
    }

    agendasListEmpty() {
        this.wait.forElementPresent($(FlexAgendaLocators.AGENDA_ADD_NEW_SELECTOR));
        browser.sleep(3000); //FIXME: agendas are loaded with a delay (firebase); arbitrary wait time
        expect(this.agendasList.allAgendas().count()).toEqual(0);
    }

    startTimeIs(time: string) {
        expect($(FlexAgendaLocators.AGENDA_START_TIME_INPUT_SELECTOR)
            .getAttribute('value')).toEqual(time);
        this.startTimeSetForTasks(time);
    }

    tasksCount(count: number) {
        expect(this.taskList.countTasks()).toEqual(count);
    }

    lastTaskHasMoveUpArrow() {
        expect(this.taskList.allTasks().last().$(FlexAgendaLocators.TASK_MOVE_UP_SELECTOR)
            .isPresent()).toBeTruthy();
    }

    lastTaskDoesntHaveMoveDownArrow() {
        expect(this.taskList.allTasks().last().$(FlexAgendaLocators.TASK_MOVE_DOWN_SELECTOR)
            .isPresent()).toBeFalsy();
    }

    firstTaskHasMoveDownArrow() {
        expect(this.taskList.allTasks().first().$(FlexAgendaLocators.TASK_MOVE_DOWN_SELECTOR)
            .isPresent()).toBeTruthy();
    }

    firstTaskDoesntHaveMoveUpArrow() {
        expect(this.taskList.allTasks().first().$(FlexAgendaLocators.TASK_MOVE_UP_SELECTOR)
            .isPresent()).toBeFalsy();
    }

    taskTitleIs(title: string) {
        expect($$(FlexAgendaLocators.TASK_TITLE_SELECTOR).first()
            .getAttribute('value')).toEqual(title);
    }

    taskDescriptionIs(description: string) {
        expect($$(FlexAgendaLocators.TASK_DESCRIPTION_SELECTOR).first()
            .getAttribute('value')).toEqual(description);
    }

    taskDurationIs(duration: string) {
        //add optional parameter for the elementFinder. If not specified, use first
        expect($$(FlexAgendaLocators.TASK_DURATION_SELECTOR).first()
            .getAttribute('value')).toEqual(duration);
    }

    firstTaskMarkedAsDone(done: boolean) {
        if(done) {
            expect($$(FlexAgendaLocators.TASK_COMPLETE_SELECTOR).first()
                .getAttribute('ng-reflect-checked')).toEqual('true');
        }
        else {
            expect($$(FlexAgendaLocators.TASK_COMPLETE_SELECTOR).first()
                .getAttribute('ng-reflect-checked')).toBeNull();
        }
    }

    taskMoved(title: string) {
        expect($$(FlexAgendaLocators.TASK_TITLE_SELECTOR).first()
          .getAttribute('value')).not.toEqual(title);

        expect(this.taskList.allTasks().last().$(FlexAgendaLocators.TASK_TITLE_SELECTOR)
          .getAttribute('value')).toEqual(title);
    }

    agendaEndTimeIs(expectedEndTime: string) {
        expect(this.taskList.allStartTimes().last().getText()).toEqual(expectedEndTime);
    }

    agendaTitleIs(expectedTitle: string) {
        expect(this.agenda.title()).toEqual(expectedTitle);
    }

    agendaStartTimeIs(expectedStartTime: string) {
        expect($(FlexAgendaLocators.AGENDA_START_TIME_INPUT_SELECTOR).getAttribute('value'))
            .toEqual(expectedStartTime);
    }

    singleAgendaIsOpen() {
        expect($$(FlexAgendaLocators.AGENDA_TITLE_SELECTOR).count()).toEqual(1);
    }
}
