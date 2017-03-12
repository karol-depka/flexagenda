import { element, by } from 'protractor'

export class FlexAgendaLocators {
    TASK_TITLE              = element(by.id('taskTitle'));
    TASK_DESCRIPTION        = element(by.id('taskDescription'));
    TASK_DURATION           = element(by.id('taskDuration'));
    TASK_COMPLETE           = element(by.id('taskComplete'));
    TASK_ADD_NEW_LAST       = element(by.id('taskAddNewLast'));
    TASK_ADD_NEW_ABOVE      = element(by.id('taskAddAbove'));
    TASK_MOVE_UP            = element(by.id('taskMoveUp'));
    TASK_MOVE_DOWN          = element(by.id('taskMoveDown'));
    TASK_START_TIME         = element(by.id('taskStart'));
    TASK_DELETE             = element(by.id('taskDelete'));
    TASK_DELETE_CONFIRM     = element(by.id('confirmDelete'));

    LOGIN_INPUT             = element(by.css('#md-input-0-input'));
    LOGIN_PASSWORD          = element(by.css('#md-input-1-input'));
    LOGIN_BUTTON            = element(by.id('login'));

    AGENDA_START_TIME_INPUT = element(by.id('agendaStartTime'));
    AGENDA_START_TIME_NOW   = element(by.id('agendaSetTimeToNow'));
    AGENDA_ADD_NEW          = element(by.id('agendaAddNew'));
}