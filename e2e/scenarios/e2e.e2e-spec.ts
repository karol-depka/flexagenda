import { browser, by, $, $$ } from 'protractor';

import { Support }              from '../support/support.e2e';
import { WaitHelpers }          from '../support/waits.e2e'
import { FlexAgendaLocators }   from '../support/elementLocators.e2e'
import { TestData }             from '../support/testData.e2e'
import { FlexAgendaAssertions } from '../support/assertions.e2e'

browser.ignoreSynchronization = true;

describe('It', function() {
  var support: Support;
  var wait: WaitHelpers;
  var locator: FlexAgendaLocators;
  var data: TestData;
  var assert: FlexAgendaAssertions;

  beforeAll(() => {
    support = new Support();
    wait = new WaitHelpers();
    locator = new FlexAgendaLocators();
    data = new TestData();
    assert = new FlexAgendaAssertions();
  });

  it('should display message saying to login', () => {
    support.navigateToLogin();

    assert.onLoginPage();
  });

  it('should login', () => {
    support.login();

    assert.notOnLoginPage();
    assert.userIsLoggedIn();
  });

  it('should be able to add a default task', () => {
    //arrange
    support.displayNewTestAgenda();

    //add and assert task added
    var initialTaskCountPromise = support.countTasks();
    initialTaskCountPromise.then((value) => {
      var initialTaskCount = value;
      support.addEmptyTaskFirst();

      expect(support.countTasks()).toEqual(initialTaskCount+1);
    })

    assert.firstTaskEmpty();
  });

  it('should be able to delete a task', () => {   //pass add/delete task and expected count
    var initialTaskCount = 0;
    var initialTaskCountPromise = support.countTasks();
    initialTaskCountPromise.then((value) => {
      initialTaskCount = value;
      support.deleteFirstTaskOnAList();

      expect(support.countTasks()).toEqual(initialTaskCount-1);
    })
  });

  it('should be able to show start time for all tasks', () => {
    support.agendaStartTime().then((startTime) => {
       assert.startTimeSetForTasks(startTime);
    });
  });

  it('should be able to see updated agenda start time in first task', () => {
    var startTime = support.updateStartTime(3);

    assert.startTimeIsSetTo(startTime);
  });

  it('should be able to set time to Now', () => {
    var startTime = support.updateStartTime(0);
    support.clickStartNow();

    assert.startTimeIsSetTo(startTime);
  });

  it('should be able to update task title', () => {
    var title = support.updateTaskTitle();

    assert.taskTitleSetTo(title);
  });

  it('should be able to update task description', () => {
    var description = support.updateTaskDescription();

    assert.taskDescriptionSetTo(description);
  });

  it('should be able to update task duration', () => {
    var duration = support.updateTaskDuration();

    assert.taskDurationSetTo(duration);
  });

  it('should be able to mark task as done', () => {   //FIXME: make me independent
    var successful = support.markFirstTaskAsDone();

    assert.firstTaskMarkedAsDone(true);
  });

  it('should be able to unmark task from done', () => {  //FIXME: make me independent
    support.unmarkFirstTaskAsDone();

    assert.firstTaskMarkedAsDone(false);
  });

  it('should be able to move task down', () => {
    support.addEmptyTask();
    var title = support.updateTaskTitle();
    support.moveFirstTaskDown();

    assert.taskMoved(title);
  });

  it('should be able to move task up', () => {
    var title = support.updateTaskTitle();
    support.moveSecondTaskUp();

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
    support.addTasks(10);

    var startTime = support.agendaStartTime();

    support.countTasks().then((count) => {
      support.sumOfDurations().then((agendaDuration) => {
        // console.log('duration in min: ' + agendaDuration);
        agendaDuration -= 10;   //workaround as we don't have the END row to show the end time, yet

        startTime.then((time) => {
          var agendaStartTime = support.timeAdjustedTextBy(time, 0);
          var expectedEndTime = support.timeAdjustedTextBy(agendaStartTime, agendaDuration);

          assert.agendaEndTimeIsEqualTo(expectedEndTime);
        });
      });
    });
  });

  it('should be able to delete all tasks leaving one empty', () => {
      support.deleteAllTasksFromCurrentAgenda();

      assert.tasksCount(1);
      assert.firstTaskEmpty();
  });

  afterAll(() => {
    support.logout();
  });
});
