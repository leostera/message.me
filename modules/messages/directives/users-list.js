/**
 * @ngdoc directive
 * @name mme.messages.directives:onlineUsers
 * @description
 * ...
 */
angular.module('mme.messages')
  .directive('usersList',
    ['$timeout', 'UserService', 'OnlineUsersService'
  , function ($timeout, UserService, OnlineUsersService) {

    return {
      priority: 0,
      restrict: 'E',
      template: require('../views/users-list'),
      scope: {
        me: '=',
        users: '=',
        selectedUsers: '='
      },
      link: function(scope, element, attr) {
        OnlineUsersService.update();

        scope.mark = function (user) {
          var index = scope.users.indexOf(user);
          var user = scope.users[index];
          if(user.marked) {
            scope.selectedUsers.splice(scope.selectedUsers.indexOf(user),1);
          } else {
            scope.selectedUsers.push(user);
          }
          user.marked = !user.marked;
        };

        UserService.list().then(function (users) {
          scope.users = users.filter(function (u) {
            return u._id !== scope.me._id;
          });
          OnlineUsersService.list().then(function (users) {
            scope.users.forEach(function (u1) {
              var f = users.filter(function (u2) {
                return u1._id === u2._id;
              });
              if(f.length === 1) {
                u1.status = true;
              } else {
                u1.status = false;
              }
            });
          });
        });

        scope.$on('onlineUsers::connect', function (event, user) {
          scope.users.forEach(function (u) {
            if(u._id === user._id) {
              u.status = true;
            }
          });
        });

        scope.$on('onlineUsers::disconnect', function (event, user) {
          scope.users.forEach(function (u) {
            if(u._id === user._id) {
              u.status = false;
            }
          });
        });
      }
    };
  }
]);