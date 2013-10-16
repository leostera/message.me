/**
 * @name shared.controllers:login
 */
angular.module('mme.shared')
  .controller('login',['$location', '$scope', 'OAuth2', 'UserService'
  , function ($location, $scope, OAuth2, UserService) {
    UserService.getUser().then(function (user) {
      $location.path('/');
    });
    $scope.login = function () {
      OAuth2.login('facebook');
    }
  }]);