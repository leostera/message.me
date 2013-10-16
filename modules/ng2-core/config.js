angular.module('ng2Core')
.config(['$locationProvider', 'OAuth2FacebookProvider', 'DebugEventsProvider', 'ng2wsProvider'
  , function ($locationProvider, OAuth2FacebookProvider, DebugEventsProvider, ng2wsProvider) {

  DebugEventsProvider.setVerbosityLevel('vv');
  DebugEventsProvider.setFilter('^ng2ws');

  $locationProvider.html5Mode(true);

  //this is the defualts
  //OAuth2Provider.setUserService('UserService');

  OAuth2FacebookProvider.configure({
    client_id: '435065866602908'
  });

  ng2wsProvider.setUrl("ws://halo_api.leostera.com:8080");
  // ng2wsProvider.setRetriesNumber(5);
}])

.run(function ($rootScope, ng2ws) {
  $rootScope.$on('ng2auth:login::success', function (user) {
    ng2ws.open();
  });

  $rootScope.$on('ng2auth:logout::success', function (user) {
    ng2ws.close();
  });
});