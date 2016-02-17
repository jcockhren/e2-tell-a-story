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
        controller: 'OwnAxisRotationCtrl as ownAxisRotationCtrl'
      }).when("/Gravity", {
        templateUrl: "./partials/gravity-chart.html",
        controller: "GravityCtrl as gravityCtrl"
      }).otherwise('/');
    }
  ]);

})();