// auto-exports //

var app = angular.module('compose', ['ngRoute', 'ng2ws']);

require('./controllers/compose');
require('./services/message');
require('./config');
require('./routes');
