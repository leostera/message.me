/**
 * @ngdoc service
 * @name compose.services:send
 * @description
 * ...
 */
angular
.module('mme.messages')
.factory('Message', ['$http', '$q', function ($http, $q) {
  return {
    send: function (message) {
      var deferred = $q.defer();
      $http.post('http://halo_api.leostera.com:8080/messages', message)
        .success(function (res) {
          console.log("OK", res);
          deferred.resolve(res);
        }, function (error) {
          console.log("SHIT ERROR", error)
          deferred.reject(error);
        });
      return deferred.promise;
    }
  }
}]);