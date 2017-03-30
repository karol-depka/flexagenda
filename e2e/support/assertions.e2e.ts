import { TaskTest }         from '../view_objects/task.view_object';
import { LoginTest }        from '../view_objects/login.view_object';
import { WaitHelpers }      from './waits.e2e';
import { Support }          from '../support/support.e2e';
import { TaskListTest }     from '../view_objects/tasks_list.view_object';
import { AgendasListTest }  from '../view_objects/agendas_list.view_object';
import { AgendaTest }       from '../view_objects/agenda.view_object';

import { $, $$, browser }   from 'protractor';

export class FlexAgendaAssertions {
    wait: WaitHelpers;
    support: Support;
    task: TaskTest;
    taskList: TaskListTest;
    agenda: AgendaTest;
    agendasList: AgendasListTest;
    loginLogout: LoginTest;

    constructor() {
        this.wait = new WaitHelpers();
        this.support = new Support();
        this.taskList = new TaskListTest();
        this.agenda = new AgendaTest();
        this.agendasList = new AgendasListTest();
        this.loginLogout = new LoginTest();
        this.task = new TaskTest();
    }

    onLoginPage() {
        expect(this.wait.forTextPresent($(this.loginLogout.LOGIN_TEXT_ELEMENT_SELECTOR),
            'Please login')).toEqual(true);
    }

    notOnLoginPage() {
        expect(this.wait.forElementNotPresent($(this.loginLogout.LOGIN_TEXT_ELEMENT_SELECTOR)))
            .toEqual(true);
    }

    userIsLoggedIn(userLogin: string) {
        expect(this.wait.forTextPresent($(this.loginLogout.LOGGED_IN_USER_TEXT_SELECTOR),
            'Logged in as ' + userLogin)).toEqual(true);
    }

    userIsLoggedOut(userLogin: string) {
        expect(this.wait.forElementNotPresent($(this.loginLogout.LOGGED_IN_USER_TEXT_SELECTOR)))
            .toEqual(true);

        this.onLoginPage();
    }

    firstTaskEmpty() {
        expect($$(this.task.TASK_TITLE_SELECTOR).first().getAttribute('value')).toEqual('');
        expect($$(this.task.TASK_DESCRIPTION_SELECTOR).first().getAttribute('value')).toEqual('');
        expect($$(this.task.TASK_DURATION_SELECTOR).first().getAttribute('value')).toEqual('10');
        expect($$(this.task.TASK_COMPLETE_SELECTOR).first().getAttribute('ng-reflect-checked')).toBeNull();
    }

    startTimeSetForTasks(time: string) {
        expect($$(this.task.TASK_START_TIME_SELECTOR).first().getText()).toEqual(time);
    }

    agendasListEmpty() {
        this.wait.forElementPresent($(this.agendasList.AGENDA_ADD_NEW_SELECTOR));
        browser.sleep(3000); //FIXME: agendas are loaded with a delay (firebase); arbitrary wait time
        expect(this.agendasList.allAgendas().count()).toEqual(0);
    }

    startTimeIs(time: string) {
        expect($(this.agenda.AGENDA_START_TIME_INPUT_SELECTOR)
            .getAttribute('value')).toEqual(time);
        this.startTimeSetForTasks(time);
    }

    tasksCount(count: number) {
        expect(this.taskList.countTasks()).toEqual(count);
    }

    lastTaskHasMoveUpArrow() {
        expect(this.taskList.allTasks().last().$(this.taskList.TASK_MOVE_UP_SELECTOR)
            .isPresent()).toBeTruthy();
    }

    lastTaskDoesntHaveMoveDownArrow() {
        expect(this.taskList.allTasks().last().$(this.taskList.TASK_MOVE_DOWN_SELECTOR)
            .isPresent()).toBeFalsy();
    }

    firstTaskHasMoveDownArrow() {
        expect(this.taskList.allTasks().first().$(this.taskList.TASK_MOVE_DOWN_SELECTOR)
            .isPresent()).toBeTruthy();
    }

    firstTaskDoesntHaveMoveUpArrow() {
        expect(this.taskList.allTasks().first().$(this.taskList.TASK_MOVE_UP_SELECTOR)
            .isPresent()).toBeFalsy();
    }

    taskTitleIs(title: string) {
        expect($$(this.task.TASK_TITLE_SELECTOR).first()
            .getAttribute('value')).toEqual(title);
    }

    taskDescriptionIs(description: string) {
        expect($$(this.task.TASK_DESCRIPTION_SELECTOR).first()
            .getAttribute('value')).toEqual(description);
    }

    taskDurationIs(duration: string) {
        //add optional parameter for the elementFinder. If not specified, use first
        expect($$(this.task.TASK_DURATION_SELECTOR).first()
            .getAttribute('value')).toEqual(duration);
    }

    firstTaskMarkedAsDone(done: boolean) {
        if(done) {
            expect($$(this.task.TASK_COMPLETE_SELECTOR).first()
                .getAttribute('ng-reflect-checked')).toEqual('true');
        }
        else {
            expect($$(this.task.TASK_COMPLETE_SELECTOR).first()
                .getAttribute('ng-reflect-checked')).toBeNull();
        }
    }

    taskMoved(title: string) {
        expect($$(this.task.TASK_TITLE_SELECTOR).first()
          .getAttribute('value')).not.toEqual(title);

        expect(this.taskList.allTasks().last().$(this.task.TASK_TITLE_SELECTOR)
          .getAttribute('value')).toEqual(title);
    }

    agendaEndTimeIs(expectedEndTime: string) {
        expect(this.taskList.allStartTimes().last().getText()).toEqual(expectedEndTime);
    }

    agendaTitleIs(expectedTitle: string) {
        expect(this.agenda.title()).toEqual(expectedTitle);
    }

    agendaStartTimeIs(expectedStartTime: string) {
        expect($(this.agenda.AGENDA_START_TIME_INPUT_SELECTOR).getAttribute('value'))
            .toEqual(expectedStartTime);
    }

    singleAgendaIsOpen() {
        expect($$(this.agenda.AGENDA_TITLE_SELECTOR).count()).toEqual(1);
    }
}
