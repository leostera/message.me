/**
 * @ngdoc directive
 * @name mme.messages.directives:conversation
 * @description
 * ...
 */
angular.module('mme.messages')
  .directive('conversation', function (){

    return {
      priority: 0,
      restrict: 'E',
      template: require('../views/conversation'),
      link: function(scope, element, attr, ngModel) {
      }
    };
  }
);