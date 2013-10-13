/**
 * @name user.controllers:inbox
 */
angular.module('user')
  .controller('inbox',['$scope'
  , function ($scope) {
    $scope.message = 'Welcome to Inbox';
  }]);