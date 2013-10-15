// auto-exports //

module.exports = function (appName, deps, coreDeps) {

  coreDeps = coreDeps || [];

  var core = angular.module('ng2Core',
  [ 'ngRoute'
  , 'ngAnimate'
  , 'ngResource'
  , 'ngSanitize'
  , 'ngCookies'
  ].concat(coreDeps));

  deps = deps || [];

  var app = angular.module(appName, ['ng2Core','ngRoute'].concat(deps));

  require('./services/user-service');
  require('./controllers/error');
  require('./controllers/welcome');
  require('./config');
  require('./routes');

  return app;
};