/**
 * @name compose.controllers:compose
 */
angular.module('mme.messages')
  .controller('compose',['$scope', '$timeout', 'Message', 'OnlineUsersService', 'UserService'
  , function ($scope, $timeout, Message, OnlineUsersService, UserService) {

    OnlineUsersService.update();

    $scope.users = [];

    UserService.getUser().then(function (me) {
      $scope.me = me;
    });

    $scope.$on('onlineUsers::list', function (event, users) {
      $scope.users = users.filter(function (user) {
        return user._id !== $scope.me._id;
      });
    });

    $scope.$on('onlineUsers::connect', function (event, user) {
      if(_.isEmpty(_.where($scope.users, user))) {
        $scope.users.push(user);
      }
    });

    $scope.$on('onlineUsers::disconnect', function (event, user) {
      console.log(user);
      $scope.users = $scope.users.filter(function (u) {
        return u._id !== user._id;
      });
    });

    $scope.message = {
      text: "",
      to: []
    };

    $scope.send = function () {
      message = angular.copy($scope.message);
      message.to = message.to.map(function (user) {
        return user.username;
      });
      Message.send(message)
        .then(function (res) {
          console.log("Message:success",res);
          // $scope.message = null;
        }, function (error) {
          console.log("Message:error",error);
        });
    };
  }]);