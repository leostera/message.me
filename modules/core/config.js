angular.module('ng2Core')
.config(['$locationProvider', 'OAuth2FacebookProvider', 'DebugEventsProvider'
  , function ($locationProvider, OAuth2FacebookProvider, DebugEventsProvider) {

  DebugEventsProvider.setVerbosityLevel('vv');
  DebugEventsProvider.setFilter('^ng2');

  $locationProvider.html5Mode(true);

  //this is the defualt
  //OAuth2Provider.setUserService('UserService');

  OAuth2FacebookProvider.configure({
    client_id: '435065866602908'
  });

}]);