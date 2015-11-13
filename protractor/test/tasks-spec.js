/* Test script for the Tasks List app */
describe('the tasks app', function() {
    var taskTitleInput = element(by.model('newTask.title'));
    var addTaskButton = element(by.buttonText('Add Task'));
    var tasksList = element.all(by.repeater('task in tasks'))
    var requiredMsg = $('.title-required-error');

    function addTask(title) {
        taskTitleInput.sendKeys(title);
        addTaskButton.click();
    }

    function addMultipleTasks(num) {
        var i;
        for (i = 0; i < num; ++i) {
            addTask('Task ' + i);
        }
    }

    //After each is also a viable function for post-test cleanup
    beforeEach(function() {
        browser.get('http://localhost:8000/');
    })

    it('must have the proper page title', function() {
        expect(browser.getTitle()).toEqual('My Tasks');
    });

    it('must add a task', function() {
        var title = 'Learn Protractor';
        addTask(title);
        expect(tasksList.count()).toEqual(1);
        expect(tasksList.get(0).getText()).toEqual(title);
    })

    it('must add a task when user hits enter', function() {
        var title = 'Learn Protractor';
        taskTitleInput.sendKeys(title);
        taskTitleInput.sendKeys(protractor.Key.ENTER);
        expect(tasksList.count()).toEqual(1);
        expect(tasksList.get(0).getText()).toEqual(title);
    })

    it('must clear the title after adding a new task', function() {
        addTask('box should get cleared');
        expect(taskTitleInput.getAttribute('value')).toEqual('');
    })

    it('must add the correct number of tasks', function() {
        var num = 10;
        addMultipleTasks(num);
        expect(tasksList.count()).toEqual(num);
    })

    it('must show required validation error', function() {
        expect(requiredMsg.isPresent()).toEqual(false);
        taskTitleInput.sendKeys('abc');
        taskTitleInput.clear();
        expect(requiredMsg.isPresent()).toEqual(true);
        taskTitleInput.sendKeys('abc');
        expect(requiredMsg.isPresent()).toEqual(false);
    });

    it('must disable add task button with a blank title', function() {
        expect(addTaskButton.getAttribute('disabled')).toEqual('true');
        taskTitleInput.sendKeys('abc');
        expect(addTaskButton.getAttribute('disabled')).toBe(null);
        taskTitleInput.clear();
        taskTitleInput.sendKeys('     ');
        expect(addTaskButton.getAttribute('disabled')).toEqual('true');
    });

    it('must toggle done with click', function() {
        addTask('test style class');
        addTask('not marked as done');
        expect(tasksList.count()).toEqual(2);
        tasksList.get(0).click();
        expect(tasksList.get(0).getAttribute('class'))
            .toContain('completed-task'); 
        expect(tasksList.get(1).getAttribute('class'))
            .not.toContain('completed-task'); 
    });

    it('must purge the list of completed tasks', function() {
        addTask('Task 1');
        addTask('Task 2');
        expect(tasksList.count()).toEqual(2);
        tasksList.get(0).click();
        element(by.buttonText('Purge Completed Tasks')).click();
        expect(tasksList.count()).toEqual(1);
        expect(tasksList.get(0).getText()).toEqual('Task 2');
    });
});