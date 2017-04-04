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
                url: "/login",
                views:{
                  "content@": {
                    templateUrl: "pages/login/index.html",
                    controller: "Login"
                  }
                }
              })
              
              // Main
              .state('app.admin', {
                abstract: true,
                requiresAuth: true,
                url: '',
                views: {
                  "header@app.admin": {
                    templateUrl: "components/header/index.html",
                    controller: "Header"
                  },
                  "sidebar@app.admin": {
                    templateUrl: "components/sidebar/index.html",
                    controller: "Sidebar"
                  },
                  "content@": {
                    templateUrl: "pages/index.html"
                  },
                  "footer@app.admin":{
                    templateUrl: "components/footer/index.html"
                  }
                }

              })
              
              // Dashboard
              .state('app.admin.dashboard', {
                requiresAuth: true,
                url: '/dashboard',
                views: {
                  "wrapper@app.admin":{
                    templateUrl: "pages/dashboard/index.html",
                    controller: "Dashboard"
                  },
                  "listProjects@app.admin.dashboard":{
                    templateUrl: "components/list-project/index.html",
                    controller: "ListProjects"
                  }
                }
              })
              
              // Projects
              .state('app.admin.projects', {
                requiresAuth: true,
                url: '/projects',
                views: {
                  "wrapper@app.admin":{
                    templateUrl: "pages/projects/index.html",
                    controller: "Projects"
                  },
                  "listProjects@app.admin.projects":{
                    templateUrl: "components/list-project/index.html",
                    controller: "ListProjects"
                  }
                }
              })
              .state('app.admin.projects.show', {
                requiresAuth: true,
                url: '/:id/show',
                views: {
                  "wrapper@app.admin":{
                    templateUrl: "pages/projects/show-project/index.html",
                    controller: "ShowProjects"
                  }
                }
              })
              .state('app.admin.projects.edit', {
                requiresAuth: true,
                url: '/:id/edit',
                views: {
                  "wrapper@app.admin":{
                    templateUrl: "pages/projects/edit-project/index.html",
                    controller: "EditProjects"
                  }
                }
              })
              .state('app.admin.projects.add', {
                requiresAuth: true,
                url: '/add',
                views: {
                  "wrapper@app.admin":{
                    templateUrl: "pages/projects/add-project/index.html",
                    controller: "AddProjects"
                  }
                }
              })
              .state('app.admin.projects.uploads', {
                requiresAuth: true,
                url: '/:id/uploads',
                views: {
                  "wrapper@app.admin":{
                    templateUrl: "pages/projects/upload/index.html",
                    controller: "UploadProjects"
                  }
                }
              })
              .state('app.admin.projects.table', {
                requiresAuth: true,
                url: '/:id/table',
                views: {
                  "wrapper@app.admin":{
                    templateUrl: "pages/projects/table-project/index.html",
                    controller: "TableProjects"
                  }
                }
              })
              .state('app.admin.projects.users', {
                requiresAuth: true,
                url: '/:projectId/users/:roleId',
                views: {
                  "wrapper@app.admin":{
                    templateUrl: "pages/projects/user-project/index.html",
                    controller: "UserRoleProjects"
                  }
                }
              })
              .state('app.admin.projects.roles', {
                requiresAuth: true,
                url: '/:projectId/roles',
                views: {
                  "wrapper@app.admin":{
                    templateUrl: "pages/projects/role-project/index.html",
                    controller: "RoleProjects"
                  }
                }
              })
              .state("app.admin.projects.design", {
                requiresAuth: true,
                url: "/:projectId/design",
                views:{
                  "header@app.admin.projects.design": {
                    templateUrl: "components/header/index.html",
                    controller: "Header"
                  },
                  "content@": {
                    templateUrl: "pages/projects/design-project/index.html",
                    controller: "DesignProjects"
                  }
                }
              })

              // Clients
              .state('app.admin.clients', {
                requiresAuth: true,
                url: '/clients',
                views: {
                  "wrapper@app.admin":{
                    templateUrl: "pages/clients/index.html",
                    controller: "Clients"
                  }
                }
              })
              .state('app.admin.clients.add', {
                requiresAuth: true,
                url: '/add',
                views: {
                  "wrapper@app.admin":{
                    templateUrl: "pages/clients/add-client/index.html",
                    controller: "AddClients"
                  }
                }
              })
              .state('app.admin.clients.edit', {
                requiresAuth: true,
                url: '/:id/edit',
                views: {
                  "wrapper@app.admin":{
                    templateUrl: "pages/clients/edit-client/index.html",
                    controller: "EditClients"
                  }
                }
              })

              // Users
              .state('app.admin.users', {
                requiresAuth: true,
                url: '/users',
                views: {
                  "wrapper@app.admin":{
                    templateUrl: "pages/users/index.html",
                    controller: "Users"
                  }
                }
              })
              .state('app.admin.users.add', {
                requiresAuth: true,
                url: '/add',
                views: {
                  "wrapper@app.admin":{
                    templateUrl: "pages/users/add-user/index.html",
                    controller: "AddUsers"
                  }
                }
              })
              .state('app.admin.users.show', {
                requiresAuth: true,
                url: '/:id/show',
                views: {
                  "wrapper@app.admin":{
                    templateUrl: "pages/users/show-user/index.html",
                    controller: "ShowUsers"
                  }
                }
              })
              .state('app.admin.users.edit', {
                requiresAuth: true,
                url: '/:id/edit',
                views: {
                  "wrapper@app.admin":{
                    templateUrl: "pages/users/edit-user/index.html",
                    controller: "EditUsers"
                  }
                }
              });

          $urlRouterProvider.otherwise('/login');

          // use the HTML5 History API
          if(CONSTANT.HTML5){
            $locationProvider.html5Mode(true);
          }
        }]);
})();