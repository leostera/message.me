/**
 * @ngdoc directive
 * @name mme.messages.directives:conversationsList
 * @description
 * ...
 */
angular.module('mme.messages')
  .directive('conversationsList',
    ['ConversationService'
  , function (ConversationService) {

    return {
      priority: 0,
      restrict: 'E',
      template: require('../views/conversations-list'),
      scope: {
        conversations: '=',
        selectedConversation: '='
      },
      link: function(scope, element, attr) {
        ConversationService.list().then(function (list) {
          scope.conversations = list;
        });
      }
    };
  }
]);