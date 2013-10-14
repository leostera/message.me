/**
 * @name compose.controllers:compose
 */
angular.module('compose')
  .controller('compose',['$scope', 'Message', 'ng2ws'
  , function ($scope, Message, ws) {

    $scope.users = [];

    ws.on('user:connect', function (user) {
      $scope.users.push(user);
    });

    ws.on('user:disconnect', function (user) {
      $scope.users.splice($scope.users.indexOf(user),1);
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