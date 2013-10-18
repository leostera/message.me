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
        me: '=',
        conversations: '=',
        users: '=',
        selectedConversation: '='
      },
      link: function(scope, element, attr) {
        ConversationService.list().then(function (conversations) {
          scope.conversations = scope.conversations.concat(conversations).reverse();
          scope.conversations.forEach(function (c) {
            scope.users.forEach(function (u) {
              if(c.from._id === u._id) {
                c.from = u;
              }
              if(c.to._id === u._id) {
                c.to = u;
              }
            });
            c.messages = c.messages.reverse();
            c.messages.forEach(function (m) {
              if(c.to._id === m.to) {
                m.to = c.to;
              } else { //if(c.to._id === m.from) {
                m.from = c.to;
              }
              if(c.from._id === m.to) {
                m.to = c.from;
              } else { //(c.from._id === m.from) {
                m.from = c.from;
              }
            });
          });
        });

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