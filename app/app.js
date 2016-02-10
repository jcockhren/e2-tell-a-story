(function () {
  "use strict";

  angular
    .module("Data-Viz-App", ["ngRoute", "ngResource", "ngMaterial", "ngAnimate"]);

  angular
    .module("Data-Viz-App")
    .config(['$routeProvider',
    function($routeProvider) {
      $routeProvider
      .when('/', {
        templateUrl: './partials/main.html',
        controller: 'MainCtrl as mainCtrl'
      }).otherwise('/');
    }
  ]);

})();