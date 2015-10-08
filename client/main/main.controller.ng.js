'use strict'

angular.module('raspilightMeteorApp')
.controller('MainCtrl', function($scope, $meteor) {
  $scope.light = function (options) {
    options = _.defaults(options || {}, { mode: 'off' });
    $meteor.call('light', options);
  }

  $scope.setColor = function (colors) {
    $meteor.call('setColors', colors);
  }

  $scope.getRgba = function (color) {
    color = _.extend({ red: 0, green: 0, blue: 0, alpha: 100 }, color);
    return `rgba(${color.red}, ${color.green}, ${color.blue}, ${color.alpha/100})`;
    // getRgba(color)
  }
});
