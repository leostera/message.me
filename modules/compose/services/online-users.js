/**
 * @ngdoc service
 * @name compose.services:OnlineUsers
 * @description
 * ...
 */
angular
.module('compose')
.factory('OnlineUsersService', function (ng2ws, $q) {

  var users = [];

  ng2ws.send('users:online');
  ng2ws.on('users:online', function (onlineUsers) {
    users = onlineUsers;
  });

  ng2ws.on('users:connect', function (user) {
    if(_.isEmpty(_.where(users, user))) {
      users.push(user);
    }
  });

  ng2ws.on('users:disconnect', function (user) {
    users = users.filter(function (u) {
      return u._id !== user._id;
    });
  });

  return {
    update: function () {
      ng2ws.send('users:online');
    },
    getUsers: function () {
      var deferred = $q.defer();
      if(users.length === 0) {
        ng2ws.on('users:online', function (users) {
          deferred.resolve(users);
        });
        ng2ws.send('users:online');
      } else {
        deferred.resolve(users);
      }
      return deferred.promise;
    }
  };
});