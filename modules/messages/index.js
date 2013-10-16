// auto-exports //

var app = angular.module('mme.messages',
  [
    'ngRoute'
  , 'mme.shared'
  ]);

require('./controllers/compose');
require('./services/message');
require('./config');
require('./routes');
