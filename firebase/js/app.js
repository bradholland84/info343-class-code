
angular.module('ChatApp', ['firebase'])
    .constant('firebaseUrl', 'https://info343chat.firebaseio.com/messages')
    .controller('ChatController', function($scope, $firebaseArray, firebaseUrl) {
        //create a reference to the firebase
        var ref = new Firebase(firebaseUrl);
        ref.limitToLast(1000);
        $scope.messages = $firebaseArray(ref);

        //init form fields
        $scope.name = null;
        $scope.body = null;

        $scope.sendMessage = function() {
            //adds new message obj to array and syncs to server
            $scope.messages.$add({
                name: $scope.name,
                body: $scope.body,
                createdAt: Firebase.ServerValue.TIMESTAMP
            });

            $scope.body = null;
        }; //sendMessage()

    });
