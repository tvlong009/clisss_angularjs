/**
 * Created by GUMI-QUANG on 6/27/16.
 */
(function () {
  angular
      .module("app")
      .controller("ShowProjects",
          [
            '$scope', 'api', 'Auth', 'Router', '$stateParams',
            function ($scope, api, Auth, Router, $stateParams) {

              /*======================================
               *     INIT
               * =====================================*/
              var id = $stateParams.id;
              $scope.listUserBelongProject = [];

              api
                  .project()
                  .get({id: id})
                  .$promise
                  .then(function(res){
                    var data = res.data;
                    var included = res.included;

                    $scope.project = {
                      id: data.id,
                      attributes: {
                        name: data.attributes.name,
                        patitent_num: data.attributes.patitent_num,
                        progress: 0 / data.attributes.patitent_num,
                        period_start_date: data.attributes.period_start_date,
                        period_end_date: data.attributes.period_end_date,
                        role: included
                      }
                    };

                    getUserBelongProject();
                  });



              /*======================================
               *     DELETE
               * =====================================*/
              $scope.deleteRole = function(role, index){
                swal({
                  title: "Are you sure?",
                  type: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#DD6B55",
                  confirmButtonText: "OK",
                  closeOnConfirm: false,
                  html: false
                }, function(){
                  api
                      .project()
                      .deleteRole({
                        id: id,
                        roleId: role.id
                      })
                      .$promise
                      .then(function(res){
                        swal("Successful!", "the role was deleted from project",  "success");
                        console.log(res);
                        $scope.project.attributes.role.splice(index,1);
                      })
                      .catch(function(error){
                        swal("Error!", angular.toJson(error), "error");
                        console.log(error);
                      })

                });
              };


              /*======================================
               *     DELETE USER IN ROLE
               * =====================================*/
              $scope.deleteUser= function(user, roleIndex, role, userIndex) {
                swal({
                  title: "Are you sure?",
                  type: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#DD6B55",
                  confirmButtonText: "OK",
                  closeOnConfirm: false,
                  html: false
                }, function(){
                  api
                      .project()
                      .projectRoles({
                        id: id
                      })
                      .$promise
                      .then(function(res){
                        _.each(res.data, function(roleFromDB){
                          if(roleFromDB.relationships.role_type.data.id === role.id && roleFromDB.relationships.user.data.id === user.id){
                            api
                                .project()
                                .deleteUserRole({
                                  id: id,
                                  roleId: roleFromDB.id
                                })
                                .$promise
                                .then(function(){
                                  user.relationships.role_types.data.splice(roleIndex,1);
                                  if(user.relationships.role_types.data.length == 0){
                                    $scope.listUserBelongProject.splice(userIndex,1);
                                    swal("Successful!", "the user was deleted role from project",  "success");
                                  }
                                })
                                .catch(function(error){
                                  swal("Error!", angular.toJson(error), "error");
                                })
                          }
                        })
                      })
                      .catch(function(error){
                        swal("Error!", angular.toJson(error), "error");
                      })

                });
              };


              /*======================================
               *     GET USER BELONG PROJECT
               * =====================================*/
              function getUserBelongProject(){

                var projectRoles = $scope.project.attributes.role;
                api
                    .project()
                    .userRole({
                      id: id
                    })
                    .$promise
                    .then(function(res){
                      console.log(res);
                      var userList = res.data;
                      _.each(userList, function(user){

                        var roles = [];
                        var dataRoles = user
                            .relationships
                            .role_types;

                        _.each(dataRoles.data, function(user_role){
                          var userRole = _.find(projectRoles, function(role) {
                            return role.id == user_role.id;
                          });
                          roles.push(userRole);
                        });

                        dataRoles.data = roles;

                        $scope.listUserBelongProject.push(user);

                      });
                    })
                    .catch(function(error){
                      swal("Error!", angular.toJson(error), "error");
                    })

              }

            }
          ]
      );
})();