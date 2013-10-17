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
        // ConversationService.list().then(function (list) {
        //   scope.conversations = list;
        // });

        scope.select = function (conversation) {
          var index = scope.conversations.indexOf(conversation);
          var conversation = scope.conversations[index];
          if(!conversation.selected) {
            scope.conversations.forEach(function (c) {
              c.selected = false;
            });
            scope.selectedConversation = conversation;
          }
          conversation.selected = true;
        };
      }
    };
  }
]);