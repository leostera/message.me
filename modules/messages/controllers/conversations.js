/**
 * @name compose.controllers:compose
 */
angular.module('mme.messages')
  .controller('conversations',['$scope', 'OnlineUsersService', 'UserService', 'ConversationService'
  , function ($scope, OnlineUsersService, UserService, ConversationService) {

    OnlineUsersService.update();

    $scope.me = false;
    $scope.users = [];
    $scope.message = null;
    $scope.conversations = [];
    $scope.selectedUsers = [];
    $scope.selectedConversation = false;

    UserService.getUser().then(function (me) {
      $scope.me = {
        _id: me._id,
        username: me.username
      };
    });

    $scope.$watch('currentList', function (cl) {
      if(cl==='people') {
        $scope.conversations.forEach(function (c) {
          c.selected = false;
        });
        $scope.selectedConversation = null;
      } else if (cl==='conversations') {
        $scope.selectedUsers = [];
        $scope.users.forEach(function (u) {
          u.marked = false;
        });
      }
    })

    $scope.$watch('conversations', function (conversations) {
      console.log(conversations);
    }, true);

    $scope.$watch('users', function (users) {
      // console.log(users);
    }, true)

    $scope.$watch('selectedUsers', function (users) {
      if(users.length === 0) {
        $scope.message = null;
      }
    }, true);

    $scope.send = function () {
      var message = {
        text: $scope['message'],
        to: $scope['selectedUsers'].map(function (user) {
         return user._id;
        })
      };

      $scope.message = null;
      if(!$scope.selectedConversation) {
        // new message or conversation!
        //
        if($scope.selectedUsers.length < 1) {
          return;
        }

        if ( $scope.selectedUsers.length === 1) {
          var exists = false;
          $scope.conversations.forEach(function (c) {
            // add it to the old convo it it exists
            if(c.to._id === $scope.selectedUsers[0]._id) {
              $scope.currentList = 'conversations';
              $scope.selectedConversation = c;
              c.messages.push({
                text: message.text,
                from: $scope.me,
                to: c.to
              });
            }
          });
          if(!exists) {
            var c = {
              messages: [{
                text: message.text,
                to: $scope.selectedUsers[0],
                from: $scope.me
              }],
              to: $scope.selectedUsers[0],
              from: $scope.me,
            };
            $scope.conversations.push(c);
            $scope.selectedConversation = c;
            $scope.selectedConversation.selected = true;
            $scope.currentList = 'conversations'
          }
        } else if($scope.selectedUsers.length > 1) {
          // it means we're sending a new mass message
          message.newBlast = true;
          $scope.selectedUsers.forEach(function (u) {
            var c = {
              messages: [{
                text: message.text,
                to: u,
                from: $scope.me
              }],
              to: u,
              from: $scope.me,
            };
            $scope.conversations.push(c);
            if(!$scope.selectedConversation) {
              $scope.selectedConversation = c;
              $scope.selectedConversation.selected = true;
            }
          });
          $scope.currentList = 'conversations';
        }
      } else {
        $scope.selectedConversation.messages.push({
          text: message.text,
          from: $scope.me,
          to: $scope.selectedConversation.to
        });
      }

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