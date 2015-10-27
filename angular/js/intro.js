/*
    script for the intro.html file
*/

//in Angular, we don't need to wait for the DOM to be ready
//because Angular will be doing all the DOM manipulation for us.
//we just need to declare our module, and create/initialize our 
//controller(s) and Angular handles the rest

//declare a new Angular module with the name `AngularIntro`
//this will be the name we use with the `ng-app` attribute
//the second parameter means this module doesn't depend on any other modules
angular.module('AngularIntro', [])
    //angular.module returns the new Angular module object, 
    //which has other methods like `controller`, 
    //which lets you define a new controller, so
    //we can just chain off the result of the previous call so that we
    //don't have to declare a global variable

    //the first param is the name of our controller, and that
    //will be used with the `ng-controller` attribute
    //the second param is an initialization function, kind of like
    //a constructor.
    //we can request various Angular services simply by adding a parameter
    //with a particular name. here we are asking for the `$scope` service,
    //which lets us add models to the scope, which we can refer to in
    //template expressions in the HTML file
    .controller('NameController', function($scope) {
        'use strict'; //strict mode

        //$scope is an object and any property we add to it will be
        //accessible by template expressions in the view (HTML file)
        //try changing this value to something else, and refresh
        //the page to see how the default value of the model is
        //automatically shown in the view on page load
        $scope.name = null;
    });
