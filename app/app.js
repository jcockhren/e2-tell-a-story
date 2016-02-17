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
      }).when("/AxisRotation", {
        templateUrl: "./partials/AxisRotation.html",
        controller: 'MainCtrl as mainCtrl'
      }).when("/Orbit", {
        templateUrl: "./partials/orbit.html",
        controller: "OrbitCtrl as orbitCtrl"
      }).otherwise('/');
    }
  ]);

})();