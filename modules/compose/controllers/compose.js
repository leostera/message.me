/**
 * @name compose.controllers:compose
 */
angular.module('compose')
  .controller('compose',['$scope', 'Message'
  , function ($scope, Message) {
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