/**
 * @name compose.controllers:compose
 */
angular.module('mme.messages')
  .controller('conversations',['$scope', 'OnlineUsersService', 'UserService'
  , function ($scope, OnlineUsersService, UserService) {

    OnlineUsersService.update();

    $scope.me = false;
    $scope.users = [];
    $scope.message = null;
    $scope.conversations = [];
    $scope.selectedUsers = [];
    $scope.selectedConversation = false;

    UserService.getUser().then(function (me) {
      $scope.me = me;
    });

    $scope.$watch('users', function (users) {
      // console.log(users);
    }, true)

    $scope.$watch('selectedUsers', function (users) {
      if(users.length === 0) {
        $scope.message = null;
      }
    }, true);

    $scope.send = function () {
      if(!$scope.selectedConversation) {
        // it means we're sending a new message
        $scope.selectedUsers.forEach(function (u) {
          var c = {
            messages: [angular.copy($scope.message)],
            to: angular.copy(u),
            from: angular.copy($scope.me)
          };
          $scope.conversations.push(c);
          if(!$scope.selectedConversation) {
            $scope.selectedConversation = c;
          }
        });
      }

      message = {
        text: angular.copy($scope.message),
        to: $scope.selectedUsers.map(function (user) {
         return user._id;
        })
      };

      $scope.message = null;
      $scope.sending = true;
      ConversationService.sendMessage(message)
        .then(function (res) {
          console.log("Message:success",res);
          $scope.sending = false;
        }, function (error) {
          console.log("Message:error",error);
          $scope.sending = false;
        });
    };
  }]);