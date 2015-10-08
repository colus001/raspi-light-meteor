'use strict'

angular.module('raspilightMeteorApp')
.controller('MainCtrl', function($scope, $meteor) {
  $scope.color = {
    red: 0,
    green: 0,
    blue: 0,
    alpha: 100,
    hex: '#000000'
  };

  $scope.light = function (options) {
    options = _.defaults(options || {}, { mode: 'off', color: $scope.color });
    $meteor.call('light', options);
  }

  $scope.getRgba = function (color) {
    color = _.extend({ red: 0, green: 0, blue: 0, alpha: 100 }, color);
    return `rgba(${color.red}, ${color.green}, ${color.blue}, ${color.alpha/100})`;
  }
});


function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
