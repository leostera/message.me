/**
 * @ngdoc directive
 * @name mme.messages.directives:conversationsList
 * @description
 * ...
 */
angular.module('mme.messages')
  .directive('conversationsList',
    ['ConversationService', 'ng2ws', 'Notification'
  , function (ConversationService, ws, Notification) {

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
        ws.on('message:new', function (data) {
          var messages = data.map(function (d) {
            return JSON.parse(d.Body);
          });
          messages.forEach(function (message) {
            var isNew = !!!(scope.conversations.filter(function (conversation) {
              return message.cid === conversation._id;
            }).length)

            console.log(isNew);

            if(isNew) {
              notify(message);
              updateConversations();
            } else {
              scope.conversations.forEach(function (conversation) {
                if(message.cid !== conversation._id) return;
                if(conversation.to._id === message.to) {
                  message.to = conversation.to;
                } else { //if(conversation.to._id === message.from) {
                  message.from = conversation.to;
                }
                if(conversation.from._id === message.to) {
                  message.to = conversation.from;
                } else { //(conversation.fromessage._id === message.from) {
                  message.from = conversation.from;
                }
                console.log("About to unshift", message);
                conversation.messages.unshift(message);
              });
            }
          });
        });

        var notify = function (message) {

          var user;
          scope.users.forEach(function (u) {
            if(message.from === u._id) {
              user = u.username || u.facebook;
            }
          });

          var not = {
            image: '//graph.facebook.com/'+user+'/picture',
            title: 'New Conversation',
            text: message.text,
            show: true
          };

          Notification.create(not);
        }
        
        var updateConversations = function () {
          ConversationService.list().then(function (conversations) {
            scope.conversations = scope.conversations.concat(conversations).reverse();
            var id = scope.selectedConversation && scope.selectedConversation._id;
            scope.conversations = _.unique(scope.conversations, '_id');
            scope.conversations.forEach(function (c) {
              if(id && c._id == id) {
                scope.selectedConversation = c;
                scope.selectedConversation.selected = true;
              }
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
        }
        updateConversations();

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