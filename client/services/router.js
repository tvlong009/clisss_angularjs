/**
 * Created by GUMI-QUANG on 6/24/16.
 */
(function () {
  angular
      .module("app")
      .factory("Router",
          ['$state', '$timeout',
            function ($state, $timeout) {
              var services = {};

              //Switch to another view
              services.changeView = function (to, params, options){
                $timeout(function () {
                  $state.go(to, params, options);
                }, 0);
              };

              //Change to slide show view
              services.toLogin = function (params, option) {
                services.changeView("app.login", params, option);
              };

	      
	            //Change to NotFound
              services.toNotFound = function (params, option) {
                services.changeView("app.notFound", params, option);
              };


              //Change to Home
              services.toHome = function (params, option) {
                services.changeView("app.home", params, option);
              };


              //Change to Page
              services.toPage = function (params, option) {
                services.changeView("app.page", params, option);
              };


              // Export service to the world
              return services;
            }
          ]
      );
})();