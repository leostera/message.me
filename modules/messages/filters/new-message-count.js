/**
 * @ngdoc filter
 * @name mme.messages.filters:newMessageCount
 * @description
 *
 * Filters a collection with a simple regex.
 */
angular.module('mme.messages')
  .filter('newMessageCount',['$scope'
  , function ($scope) {
    return function(conversations){
      return conversations.sort(function (a, b) {
        return a.hasNew > b.hasNew;
      });
    };
  }]
);