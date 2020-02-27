// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('myapp', ['ionic','ngCordova','myapp.controller','myapp.services'])

.run(function($ionicPlatform,$rootScope) {
  $ionicPlatform.ready(function() {
    $rootScope.imgpath = "http://web.proweaverlinks.com/tech/mobileappapiserver/images/";
    $rootScope.avatars = [{'name':'Jhonnel','pic':'jhonnel.jpg'},{'name':'Myrafe','pic':'myrafe.jpg'},{'name':'Gene Paul','pic':'gene.jpg'},{'name':'Kevin','pic':'kevin.jpg'}];
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider,$httpProvider) {
  $ionicConfigProvider.tabs.position('bottom');
  $httpProvider.defaults.cache = false;
  $stateProvider
  .state('tab',{
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })
  .state('tab.index',{
    url: '/index',
    views:{
      'tabContent': {
        templateUrl: 'templates/index.html'
      }
    },

  });
 
  $urlRouterProvider.otherwise('/tab/index');

})
.directive('onValidSubmit', ['$parse', '$timeout', function($parse, $timeout) {
    return {
      require: '^form',
      restrict: 'A',
      link: function(scope, element, attrs, form) {
        form.$submitted = false;
        var fn = $parse(attrs.onValidSubmit);
        element.on('submit', function(event) {
          scope.$apply(function() {
            element.addClass('ng-submitted');
            form.$submitted = true;
            if (form.$valid) {
              if (typeof fn === 'function') {
                fn(scope, {$event: event});
              }
            }
          });
        });
      }
    }
 
  }])
.directive('validated', ['$parse', function($parse) {
  return {
    restrict: 'AEC',
    require: '^form',
    link: function(scope, element, attrs, form) {
      var inputs = element.find("*");
      for(var i = 0; i < inputs.length; i++) {
        (function(input){
          var attributes = input.attributes;
          if (attributes.getNamedItem('ng-model') != void 0 && attributes.getNamedItem('name') != void 0) {
            var field = form[attributes.name.value];
            if (field != void 0) {
              scope.$watch(function() {
                return form.$submitted + "_" + field.$valid;
              }, function() {
                if (form.$submitted != true) return;
                var inp = angular.element(input);
                if (inp.hasClass('ng-invalid')) {
                  element.removeClass('has-success');
                  element.addClass('has-error');
                } else {
                  element.removeClass('has-error').addClass('has-success');
                }
              });
            }
          }
        })(inputs[i]);
      }
    }
  }
}]);

