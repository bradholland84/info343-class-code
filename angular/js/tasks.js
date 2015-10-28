/* 
    script for the tasks.html file 
*/

angular.module('Tasks', [])
    .constant('tasksKey', 'tasks')
    .controller("TasksController", function($scope, tasksKey) {
        //initialize tasks property on the scope to an empty array
        $scope.tasks = (angular.fromJson(localStorage.getItem(tasksKey)) || []);
        //initialize new task to an empty object
        $scope.newTask = {};

        function saveTasks() {
            localStorage.setItem(tasksKey, angular.toJson($scope.tasks));
        }

        //ad function to add newtask to the array
        $scope.addTask = function() {
            //push the current value of newTask into the tasks array
            $scope.tasks.push($scope.newTask);

            //save the tasks
            saveTasks();
            //reset newTask to an empty object
            $scope.newTask = {};
        };

        //function to toggle task done state
        $scope.toggleDone = function(task) {
            task.done = !task.done;
            saveTasks();
        };
    });


