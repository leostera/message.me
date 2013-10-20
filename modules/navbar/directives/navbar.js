/**
 * @ngdoc directive
 * @name ng2Core.directives:navbar
 * @description
 * Show nav bar, show Login with Facebook button.
 */
angular.module('mme.navbar')
  .directive('navbar',['OAuth2', '$location', function (OAuth2, $location) {
    'use strict';

    return {
      priority: 0,
      template: require('../views/navbar'),
      restrict: 'E',
      replace: true,
      link: function(scope, element, attr) {
        foundation.init(document);
        scope.select=false;

        var handleUserData = function (event, data) {
          scope.user = typeof data === 'string' ? null : data;
          if(scope.user && scope.user.username) {
            scope.user.picture = 'https://graph.facebook.com/'+data.username+'/picture';
          } else {
            $location.path('/');
          }
        };

        scope.$on('ng2auth:login::success', handleUserData);
        scope.$on('ng2auth:logout::success', handleUserData);

        scope.login = function () {
          OAuth2.login('facebook');
        }

        scope.logout = function () {
          OAuth2.logout();
        }

        scope.isSelected = function (item) {
          console.log(scope.selected, item);
          return scope.selected === item;
        }
      }
    };
  }
]);