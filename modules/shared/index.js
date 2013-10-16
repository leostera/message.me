// auto-exports //

var app = angular.module('mme.shared',
  [
    'ng2ws',
    'ng2Auth',
    'ng2AuthFacebook',
    'ng2Loading',
    'ng2Debug',
  ]);

require('./controllers/login');
require('./services/online-users');
require('./services/user-service');
require('./config');
require('./routes');