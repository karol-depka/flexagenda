import { element, by } from 'protractor'

export class FlexAgendaLocators {
    TASK_CSS                    = 'task';
    TASK_TITLE_CSS              = '#taskTitle';
    TASK_DESCRIPTION_CSS        = '#taskDescription';
    TASK_DURATION_CSS           = '#taskDuration';
    TASK_COMPLETE_CSS           = '#taskComplete';
    TASK_ADD_NEW_LAST_CSS       = '#taskAddNewLast';
    TASK_ADD_NEW_ABOVE_CSS      = '#taskAddAbove';
    TASK_MOVE_UP_CSS            = '#taskMoveUp';
    TASK_MOVE_DOWN_CSS          = '#taskMoveDown';
    TASK_START_TIME_CSS         = '#taskStart';
    TASK_DELETE_CSS             = '#taskDelete';

    LOGIN_INPUT_CSS             = '#md-input-0-input';
    LOGIN_PASSWORD_CSS          = '#md-input-1-input';
    LOGIN_BUTTON_CSS            = '#login';
    LOGOUT_BUTTON_CSS           = '#logout';
    LOGIN_TEXT_ELEMENT_CSS      = 'app-login > p';

    AGENDA_CSS                  = '#agenda';
    AGENDA_TITLE_CSS            = '#agendaTitle'
    AGENDA_START_TIME_INPUT_CSS = '#agendaStartTime';
    AGENDA_START_TIME_NOW_CSS   = '#agendaSetTimeToNow';
    AGENDA_ADD_NEW_CSS          = '#agendaAddNew';
    AGENDA_DELETE_CSS           = '#agendaDelete';
    AGENDA_OPEN_CSS             = '#openAgenda';

    DELETE_CONFIRM_CSS          = '#confirmDelete';
}