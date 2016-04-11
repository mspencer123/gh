'use strict';
/**
 * @ngdoc function
 * @name workspaceApp.controller:ChatCtrl
 * @description
 * # ChatCtrl
 * A demo of using AngularFire to manage a synchronized list.
 */
 /*global angular*/
angular.module('workspaceApp')
  .controller('ChatSingleCtrl', function ($scope, Ref, user, $routeParams, $firebaseObject, $firebaseArray, $timeout) {
    var params = $routeParams;
    // synchronize a read-only, synchronized array of messages, limit to most recent 10
    $scope.messages = $firebaseArray(Ref.child('messages/' + params.from + '/messages'));
    
    // display any errors
    $scope.messages.$loaded().catch(alert);

    // provide a method for adding a message
    $scope.addMessage = function(newMessage) {
      if( newMessage ) {
        // push a message to the end of the array
        $scope.messages.$add({
          author: user.uid,
          body: newMessage,
          time: Date.now()
        })
          // display any errors
          .catch(alert);
      }
    };
    
  $scope.remove = function(message) {
    if (message.author === user.uid) {
    $scope.messages.$remove(message);
    }
    else {
      alert('You cant remove that');
    }
  };

    function alert(msg) {
      $scope.err = msg;
      $timeout(function() {
        $scope.err = null;
      }, 5000);
    }
  });
