/**
 * @name shared.controllers:login
 */
angular.module('mme.shared')
  .controller('login',['$scope', 'OAuth2'
  , function ($scope, OAuth2) {
    $scope.login = function () {
      OAuth2.login('facebook');
    }
  }]);