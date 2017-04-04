/**
 * Created by GUMI-QUANG on 6/27/16.
 */
(function () {
  angular
      .module("app")
      .controller("RoleProjects",
          [
            '$scope', 'api', 'Auth', 'Router', '$stateParams',
            function ($scope, api, Auth, Router, $stateParams) {

              // Init
              $scope.projectId = $stateParams.projectId;
              $scope.roles = [{
                name:""
              }];



              // Add new role
              $scope.addMore = function(role){
                if(is.not.empty(role.name)){
                  $scope.roles.push({
                    name: ""
                  })
                }
              };



              // Remove role
              $scope.removeItem = function(index){
                if(index > 0){
                  $scope.roles.splice(index, 1);
                }
              };



              $scope.createRole = function(){

                var roles = [];

                _.each($scope.roles, function(role){
                  if(is.not.empty(role.name)){
                    roles.push(role.name);
                  }
                });

                var s = roles.join(",");
                if(is.not.empty(s)){

                  api
                      .project()
                      .createRole({
                        id: $scope.projectId,
                        roles: s
                      })
                      .$promise
                      .then(function(res){
                        swal("Successful!", "Roles were created",  "success");
                        console.log(res);
                        Router.toProjectDetail({id: $scope.projectId});
                      })
                      .catch(function(error){
                        swal("Error!", angular.toJson(error), "error");
                      })

                }
              }

            }
          ]
      );
})();