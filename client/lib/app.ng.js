angular.module('raspilightMeteorApp', [
  'angular-meteor',
  'ui.router',
  'ui.bootstrap',
  'colorpicker.module',
  'ui.bootstrap-slider'
]);

onReady = function() {
  angular.bootstrap(document, ['raspilightMeteorApp']);
};

if(Meteor.isCordova) {
  angular.element(document).on('deviceready', onReady);
} else {
  angular.element(document).ready(onReady);
}
