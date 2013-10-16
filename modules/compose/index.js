// auto-exports //

var app = angular.module('compose', ['ngRoute', 'ng2ws']);

require('./controllers/compose');
require('./services/message');
require('./services/online-users');
require('./config');
require('./routes');
