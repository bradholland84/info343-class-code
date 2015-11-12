/* script file for angular-directives/index.html */

angular.module('DirectivesDemo', [])
    .directive('addressForm', function() {
        return {
            templateUrl: 'views/address-form.html',
            restrict: 'E',
            scope: {
                address: '=',
                states: '='
            }
        };
    })
    .controller('OrderFormController', function($scope) {
        $scope.shipTo = {};
        $scope.billTo = {};
        $scope.states = usaStates;
    });
