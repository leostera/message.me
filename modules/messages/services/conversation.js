/**
 * @ngdoc service
 * @name mme.messages:ConversationService
 * @description
 * ...
 */
angular
.module('mme.messages')
.factory('ConversationService', ['$http', '$q', function ($http, $q) {
  return {
    list: function () {
      var deferred = $q.defer();
      $http.get('http://localhost:8080/conversations')
        .success(function (res) {
          deferred.resolve(res);
        }, function (error) {
          deferred.reject(error);
        });
      return deferred.promise;
    },
    start: function (conversations) {
      var deferred = $q.defer();
      $http.post('http://localhost:8080/conversations', conversations)
        .success(function (res) {
          deferred.resolve(res);
        }, function (error) {
          deferred.reject(error);
        });
      return deferred.promise;
    },
    sendMessage: function (c_id, message) {
      if(!c_id || !message) return;
      var deferred = $q.defer();
      $http.post('http://localhost:8080/conversations/'+c_id+'/messages', message)
        .success(function (res) {
          deferred.resolve(res);
        }, function (error) {
          deferred.reject(error);
        });
      return deferred.promise;
    }
  }
}]);