/**
 * @name compose.controllers:compose
 */
angular.module('compose')
  .controller('compose',['$scope', '$timeout', 'Message', 'ng2ws', 'UserService'
  , function ($scope, $timeout, Message, ws, UserService) {

    $scope.users = [];

    $scope.$watch('users', function (users) {
      console.log(users);
    });

    ws.send('users:online');
    ws.on('users:online', function (users) {
      $scope.users = users;
    });

    ws.on('users:connect', function (user) {
      UserService.getUser().then(function (me) {
        if(me._id === user._id) return;
        if(_.isEmpty(_.where($scope.users, user))) {
          $scope.users.push(user);
        }
      });
    });

    ws.on('users:disconnect', function (user) {
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