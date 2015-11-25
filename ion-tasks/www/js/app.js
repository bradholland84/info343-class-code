// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('TasksApp', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
  .controller('TasksController', function($scope, $ionicSideMenuDelegate, $ionicModal) {
     $scope.projects = [
       {
         title: "Work",
         tasks: [
           {
             title: "test task 1",
             done: false
           }
         ]
       }
     ];
    $scope.currentProject = $scope.projects[0];
    $scope.newTask ={};

    $scope.toggleMenu = function() {
      $ionicSideMenuDelegate.toggleLeft();
    };

    var newTaskModal;
    $ionicModal.fromTemplateUrl('views/new-task.html', {scope: $scope})
      .then(function(modal) {
        newTaskModal = modal;
      });

    $scope.showNewTaskModal = function() {
      newTaskModal.show();
    };

    $scope.createTask = function() {
      $scope.currentProject.tasks.push($scope.newTask);
      $scope.newTask = {};
      newTaskModal.hide();
    }
  });
