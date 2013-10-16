/**
 * @ngdoc service
 * @name compose.services:OnlineUsers
 * @description
 * ...
 */
angular
.module('mme.shared')
.factory('OnlineUsersService', function ($rootScope, $q, ng2ws) {

  var users = [];

  var updateList;

  $rootScope.$on('ng2ws:socket::connect', function () {
    updateList = setInterval(function () {
      ng2ws.send('users:online');
    },5000);
  });

  $rootScope.$on('ng2ws:socket::disconnect', function () {
    clearInterval(updateList);
  });

  ng2ws.on('users:online', function (onlineUsers) {
    users = onlineUsers;
    $rootScope.$broadcast('onlineUsers::list', users);
  });

  ng2ws.on('users:connect', function (user) {
    if(_.isEmpty(_.where(users, user))) {
      users.push(user);
      $rootScope.$broadcast('onlineUsers::connect', user);
    }
  });

  ng2ws.on('users:disconnect', function (user) {
    $rootScope.$broadcast('onlineUsers::disconnect', user)
    users = users.filter(function (u) {
      return u._id !== user._id;
    });
  });

  return {
    update: function () {
      ng2ws.send('users:online');
    },
    list: function () {
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