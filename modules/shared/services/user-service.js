angular.module('mme.shared')
.factory('UserService', ['$q', '$http', '$timeout'
, function ($q, $http, $timeout) {
  var user;
  return {
    login: function (data) {
      var deferred = $q.defer();
      $http.post('http://halo_api.leostera.com:8080/auth/'+data.strategy,data.session)
        .success(function (res) {
          user = res;
          deferred.resolve(res);
        })
        .error(function (error) {
          deferred.reject(error);
        });
      return deferred.promise;
    },

    logout: function () {
      var deferred = $q.defer();
      $http.get('http://halo_api.leostera.com:8080/users/logout')
        .success(function (res) {
          user = null;
          deferred.resolve(res);
        })
        .error(function (error) {
          deferred.reject(error)
        });
      return deferred.promise;
    },

    renewSession: function (data) {
      return this.login(data);
    },

    getUser: function () {
      var deferred = $q.defer();

      if(user) {
        deferred.resolve(user);
      } else {
        $http.get('http://halo_api.leostera.com:8080/users/session')
          .success(function (usr) {
            user = usr;
            // $timeout(function () {
            //   user = null;
            // }, 6011*1000);
            deferred.resolve(user);
          }.bind(this))
          .error(function (error) {
            deferred.reject(error);
          })
      }

      return deferred.promise;
    }
  };
}]);