angular.module('mme.shared')
.config(['$locationProvider', 'OAuth2FacebookProvider', 'DebugEventsProvider', 'ng2wsProvider'
  , function ($locationProvider, OAuth2FacebookProvider, DebugEventsProvider, ng2wsProvider) {

  // DebugEventsProvider.setVerbosityLevel('');
  // DebugEventsProvider.setFilter('^ng2ws');

  $locationProvider.html5Mode(true);

  //this is the defualts
  //OAuth2Provider.setUserService('UserService');

  OAuth2FacebookProvider.configure({
    client_id: '435065866602908'
  });

  ng2wsProvider.setUrl("ws://halo_api.leostera.com:8080");
  // ng2wsProvider.setRetriesNumber(5);
}])

.run(['$rootScope', '$location','$timeout', 'ng2ws'
, function ($rootScope, $location, $timeout, ng2ws) {
  $rootScope.$on('ng2auth:login::success', function (user) {
    $timeout(function () {
      $location.path('/').replace();
    });
    ng2ws.open();
  });

  $rootScope.$on('ng2auth:logout::success', function (user) {
    $timeout(function () {
      $location.path('/login').replace();
    });
    ng2ws.close();
  });
}]);