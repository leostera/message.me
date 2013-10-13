angular.module('ng2Core')
.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    // Feel free to remove this root route :)
    .when('/', {
      controller: 'welcome',
      template: require('./views/welcome')
    })
    .when('/error', {
      controller: 'error',
      template: require('./views/error')
    });
}]);