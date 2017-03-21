import { browser } from 'protractor';

import { Support }              from '../support/support.e2e';
import { WaitHelpers }          from '../support/waits.e2e';
import { FlexAgendaLocators }   from '../support/elementLocators.e2e';
import { TestData }             from '../support/testData.e2e';
import { FlexAgendaAssertions } from '../support/assertions.e2e';
import { TaskListTest }         from '../view_objects/tasks_list.view_object';
import { AgendaTest }           from '../view_objects/agenda.view_object';
import { AgendasListTest }      from '../view_objects/agendas_list.view_object'
import { TaskTest }             from "../view_objects/task.view_object";

browser.ignoreSynchronization = true;

describe('It', function() {
  var support: Support;
  var wait: WaitHelpers;
  var locator: FlexAgendaLocators;
  var data: TestData;
  var assert: FlexAgendaAssertions;
  var task: TaskTest;
  var taskList: TaskListTest;
  var agenda: AgendaTest;
  var agendasList: AgendasListTest;

  beforeAll((done) => {
    support = new Support();
    wait = new WaitHelpers();
    locator = new FlexAgendaLocators();
    data = new TestData();
    assert = new FlexAgendaAssertions();
    task = new TaskTest();
    taskList = new TaskListTest();
    agenda = new AgendaTest();
    agendasList = new AgendasListTest();

    browser.get('/');
    support.loginIfNeeded().then(() => {
      done();
    });
  });

  it('should be able to add a default task', () => {
    //arrange
    agendasList.displayNewTestAgenda();

    //add and assert task added
    var initialTaskCountPromise = taskList.countTasks();
    initialTaskCountPromise.then((value) => {
      var initialTaskCount = value;
      taskList.addEmptyTaskFirst();

      expect(taskList.countTasks()).toEqual(initialTaskCount+1);
    })

    assert.firstTaskEmpty();
  });

  it('should be able to delete a task', () => {   //pass add/delete task and expected count
    var initialTaskCount = 0;
    var initialTaskCountPromise = taskList.countTasks();
    initialTaskCountPromise.then((value) => {
      initialTaskCount = value;
      taskList.deleteFirstTaskOnAList();

      expect(taskList.countTasks()).toEqual(initialTaskCount-1);
    })
  });

  it('should be able to show start time for all tasks', () => {
    agenda.grabStartTime().then((startTime) => {
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

  it('should be able to calculate end time of all tasks based on duration', () => {
    taskList.addTasks(10);

    var startTime = agenda.grabStartTime();

    taskList.sumOfDurations().then((agendaDuration) => {
      // console.log('duration in min: ' + agendaDuration);
      agendaDuration -= 10;   //workaround as we don't have the END row to show the end time, yet

      startTime.then((time) => {
        var agendaStartTime = support.timeAdjustedTextBy(time, 0);
        var expectedEndTime = support.timeAdjustedTextBy(agendaStartTime, agendaDuration);

        assert.agendaEndTimeIs(expectedEndTime);
      });
    });
  });

  it('should be able to delete all tasks leaving one empty', () => {
      taskList.deleteAllTasksFromCurrentAgenda();

      assert.tasksCount(1);
      assert.firstTaskEmpty();
  });

  afterAll(() => {
    support.logout();
  });
});
