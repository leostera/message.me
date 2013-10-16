angular.module('mme.messages')
.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/', {
      controller: 'conversations',
      template: require('./views/conversations'),
      private: true
    })
    .when('/main', {
      redirectTo: '/'
    });
}]);