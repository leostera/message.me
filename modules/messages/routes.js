angular.module('mme.messages')
.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/', {
      controller: 'compose',
      template: require('./views/compose'),
      private: true
    });
}]);