// auto-exports //

var app = angular.module('mme.messages',
  [
    'ngRoute'
  , 'mme.shared'
  ]);

require('./controllers/conversations');
require('./directives/conversation');
require('./directives/conversations-list');
require('./directives/users-list');
require('./services/conversation');
require('./config');
require('./routes');
