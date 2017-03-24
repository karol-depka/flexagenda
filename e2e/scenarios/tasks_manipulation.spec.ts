import { browser }              from 'protractor';

import { FlexAgendaAssertions } from '../support/assertions.e2e';
import { TaskListTest }         from '../view_objects/tasks_list.view_object';
import { AgendaTest }           from '../view_objects/agenda.view_object';
import { AgendasListTest }      from '../view_objects/agendas_list.view_object'
import { TaskTest }             from "../view_objects/task.view_object";
import { LoginTest }            from '../view_objects/login.view_object';

browser.ignoreSynchronization = true;

describe('Tasks manipulations: It', () => {
  var assert: FlexAgendaAssertions;
  var task: TaskTest;
  var taskList: TaskListTest;
  var agenda: AgendaTest;
  var agendasList: AgendasListTest;
  var loginPage: LoginTest;

  beforeAll((done) => {
    assert = new FlexAgendaAssertions();
    task = new TaskTest();
    taskList = new TaskListTest();
    agenda = new AgendaTest();
    agendasList = new AgendasListTest();
    loginPage = new LoginTest();

    loginPage.navigateToLogin().then(() => {
      loginPage.loginIfNeeded().then(() => {
        agendasList.addAndDisplayNewTestAgenda(done);
      });
    });
  });

  it('should be able to add a default task', () => {
    taskList.countTasks().then((initialTaskCount) => {
      taskList.addEmptyTaskFirst();

      expect(taskList.countTasks()).toEqual(initialTaskCount+1);
    })

    assert.firstTaskEmpty();
  });

  it('should be able to delete a task', () => {   //pass add/delete task and expected count
    taskList.countTasks().then((count) => {
      taskList.deleteFirstTaskOnAList();

      expect(taskList.countTasks()).toEqual(count-1);
    })
  });

  it('should be able to show start time for all tasks', () => {
    agenda.startTime().then((startTime) => {
       assert.startTimeSetForTasks(startTime);
    });
  });

  it('should be able to see updated agenda start time in first task', () => {
    var startTime = agenda.updateStartTime(3);

    assert.startTimeIs(startTime);
  });

  it('should be able to set time to Now', () => {
    var startTime = agenda.updateStartTime(0);
    agenda.clickStartNow();

    assert.startTimeIs(startTime);
  });

  it('should be able to update task title', () => {
    var title = task.updateTaskTitle();

    assert.taskTitleIs(title);
  });

  it('should be able to update task description', () => {
    var description = task.updateTaskDescription();

    assert.taskDescriptionIs(description);
  });

  it('should be able to update task duration', () => {
    var duration = task.updateTaskDuration();

    assert.taskDurationIs(duration);
  });

  it('should be able to mark task as done', () => {   //FIXME: make me independent
    taskList.markFirstTaskAsDone();

    assert.firstTaskMarkedAsDone(true);
  });

  it('should be able to unmark task from done', () => {  //FIXME: make me independent
    taskList.unmarkFirstTaskAsDone();

    assert.firstTaskMarkedAsDone(false);
  });

  it('should be able to move task down', () => {
    taskList.addEmptyTask();
    var title = task.updateTaskTitle();
    taskList.moveFirstTaskDown();

    assert.taskMoved(title);
  });

  it('should be able to move task up', () => {
    var title = task.updateTaskTitle();
    taskList.moveSecondTaskUp();

    assert.taskMoved(title);
  });

  it('should only show arrow to move down for first task', () => {
    assert.firstTaskHasMoveDownArrow();
    assert.firstTaskDoesntHaveMoveUpArrow();
  });

  it('should only show arrow to move up for last task', () => {
    assert.lastTaskHasMoveUpArrow();
    assert.lastTaskDoesntHaveMoveDownArrow();
  });

  it('should be able to delete all tasks leaving one empty', () => {
      taskList.deleteAllTasksFromCurrentAgenda();

      assert.tasksCount(1);
      assert.firstTaskEmpty();
  });

  afterAll(() => {
    loginPage.logout();
  });
});
