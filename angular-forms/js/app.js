/*
    script file for the index.html page
*/

angular.module('ContactsApp', ['ui.router', 'angular-uuid', 'LocalStorageModule'])

    .constant('storageKey', 'contacts-list')

    .factory('contacts', function(uuid, localStorageService, storageKey) {
        return (localStorageService.get(storageKey) || []);
    })

    // directive for custom validation of dates in the past
    .directive('inThePast', function() {
        return {
            require: 'ngModel',
            link: function(scope, elem, attrs, controller) {
                controller.$validators.inThePast = function(modelValue) {
                    var today = new Date();
                    return (new Date(modelValue) <= today);
                }
            }
        };
    })

    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('list', {
                url: '/contacts',
                templateUrl: 'views/contacts-list.html',
                controller: 'ContactsController'
            })
            .state('detail', {
                url: '/contacts/:id',
                templateUrl: 'views/contact-detail.html',
                controller: 'ContactDetailController'

            })
            .state('edit', {
                url: '/contacts/:id/edit',
                templateUrl: 'views/edit-contact.html',
                controller: 'EditContactController'
            });

        $urlRouterProvider.otherwise('/contacts');
    })

    .controller('ContactsController', function($scope, contacts) {
        $scope.contacts = contacts;
    })

    .controller('ContactDetailController', function($scope, $stateParams, $state,
                                                    localStorageService, storageKey, contacts) {
        $scope.contact = contacts.find(function(contact) {
            return contact.id === $stateParams.id;
        });

        // delete contact from local storage list, then go back to the list
        $scope.deleteContact = function() {
            var i;
            for (i = 0; i < contacts.length; i++) {
                if (contacts[i] === $scope.contact) {
                    contacts.splice(i, 1);
                }
            }
            $state.go('list');
            localStorageService.set(storageKey, contacts);
        }
    })

    .controller('EditContactController', function($scope, $stateParams, $state,
                                                  uuid, localStorageService, storageKey, contacts) {
        var existingContact = contacts.find(function(contact) {
            return contact.id === $stateParams.id;
        });

        $scope.contact = angular.copy(existingContact);

        $scope.save = function() {
            if ($scope.contact.id) {
                angular.copy($scope.contact, existingContact);
            } else {
                $scope.contact.id = uuid.v4();
                contacts.push($scope.contact)
            }

            // save to local storage
            localStorageService.set(storageKey, contacts);

            $state.go('list');
        }
    });

