'use strict'

angular.module('raspilightMeteorApp')
.controller('MainCtrl', function($scope, $meteor) {
  $scope.light = function (options) {
    options = _.defaults(options || {}, { mode: 'off' });
    $meteor.call('light', options);
  }
});
