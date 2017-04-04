/**
 * Created by GUMI-QUANG on 6/24/16.
 */
(function () {
  angular
      .module("app")
      .factory("Router",
          [
            '$state',
            '$timeout',
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

	      
	            //Change to Dashboard
              services.toDashboard = function (params, option) {
                services.changeView("app.admin.dashboard", params, option);
              };


              //Change to Users
              services.toUsers = function (params, option) {
                services.changeView("app.admin.users", params, option);
              };


              //Change to Clients
              services.toClients = function (params, option) {
                services.changeView("app.admin.clients", params, option);
              };


              //Change to Projects
              services.toProjects = function (params, option) {
                services.changeView("app.admin.projects", params, option);
              };


              //Change to Project detail
              services.toProjectDetail = function (params, option) {
                services.changeView("app.admin.projects.show", params, option);
              };


              // Export service to the world
              return services;
            }
          ]
      );
})();