/* script file for the index.html page */

angular.module('TasksApp', [])
    .controller('TasksController', function($scope) {
        'use strict';

        $scope.tasks = [];
        $scope.newTask = {};

        $scope.addTask = function() {
            $scope.tasks.push($scope.newTask);
            $scope.newTask = {};
            $scope.newTaskForm.titleInp.$setPristine();
        };

        $scope.toggleDone = function(task) {
            task.done = !task.done;
        };

        $scope.areCompleted = function() {
            var firstDoneTask = $scope.tasks.findIndex(function(task) {
                return task.done === true;
            });
            return firstDoneTask >= 0;
        };

        $scope.purgeCompleted = function() {
            $scope.tasks = $scope.tasks.filter(function(task) {
                return !task.done;
            });
        };
    });