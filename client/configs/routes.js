/**
 * Created by GUMI-QUANG on 6/24/16.
 */
(function () {
  angular
      .module('app')
      .config([
        '$stateProvider', '$urlRouterProvider', '$locationProvider', 'CONSTANT',
        function ($stateProvider, $urlRouterProvider, $locationProvider, CONSTANT) {

          $stateProvider
              .state('app', {
                abstract: true,
                url: '',
                views: {}
              })
              .state("app.login", {
                url: "/:sluck/login",
                views:{
                  "content@": {
                    templateUrl: "pages/nodes.html",
                    controller: "Login"
                  }
                }
              })
              .state("app.notFound", {
                url: "/not-found",
                views:{
                  "content@": {
                    templateUrl: "pages/not-found/index.html"
                  }
                }
              })
              .state("app.home", {
                requiresAuth: true,
                url: "/:sluck",
                views:{
                  "content@": {
                    templateUrl: "pages/nodes.html",
                    controller: "Home"
                  }
                }
              })
              .state("app.page", {
                requiresAuth: true,
                url: "/:sluck/:pageSluck",
                views:{
                  "content@": {
                    templateUrl: "pages/nodes.html",
                    controller: "Page"
                  }
                }
              });

          $urlRouterProvider.otherwise('/not-found');

          // use the HTML5 History API
          if(CONSTANT.HTML5){
            $locationProvider.html5Mode(true);
          }
        }]);
})();