angular.module('compose')
.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/compose', {
      controller: 'compose',
      template: require('./views/compose'),
      private: true
    })
}]);