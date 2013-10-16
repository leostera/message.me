/**
 * @name compose.controllers:compose
 */
angular.module('compose')
  .controller('compose',['$scope', '$timeout', 'Message', 'OnlineUsersService', 'UserService'
  , function ($scope, $timeout, Message, OnlineUsersService, UserService) {

    UserService.getUser().then(function (me) {
      $scope.me = me;
      OnlineUsersService.getUsers().then(function (users) {
        $scope.users = users.filter(function (user) {
          return user._id !== me._id;
        });
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