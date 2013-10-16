angular.module('mme.shared')
.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/login', {
      controller: 'login',
      template: require('./views/login')
    });
}]);