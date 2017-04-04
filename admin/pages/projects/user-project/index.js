/**
 * Created by GUMI-QUANG on 6/27/16.
 */
(function () {
  angular
      .module("app")
      .controller("UserRoleProjects",
          [
            '$scope', 'api', 'Auth', 'Router', '$stateParams','$http','CONSTANT','util',
            function ($scope, api, Auth, Router, $stateParams,$http,CONSTANT,util) {

              $scope.projectId = $stateParams.projectId;
              $scope.roleTypeId = $stateParams.roleId;
              $scope.usersNotInTypes = [];
              $scope.usersInTypes = [];
              $scope.searchCriteriaUser = ' ';
              $scope.total;
              $scope.maxSize = 10;
              $scope.currentPage = 1;


              getUserBelongType();

              /*======================================
               *     ADD ROLE FOR USER
               * =====================================*/
              $scope.addRole = function(userRole, i) {

                var roles = [{
                  user_id: userRole.user.id,
                  role_type_id: $scope.roleTypeId
                }];
                
                api
                    .project()
                    .addUserRole({
                      id: $scope.projectId,
                      roles: roles
                    })
                    .$promise
                    .then(function(res){
                      _.each(res.data, function(role){
                        $scope.usersInTypes.push({
                          role_id: role.id,
                          user: userRole.user
                        });
                      });

                      $scope.usersNotInTypes[i].isDone = true;
                    })
                    .catch(function(error){
                      swal("Error!", angular.toJson(error), "error");
                    })
              };

              function getUserBelongType() {
                api
                    .project()
                    .userInRoleType({
                      id: $scope.projectId,
                      roleId: $scope.roleTypeId
                    })
                    .$promise
                    .then(function(res){

                      _.each(res.data, function (user) {
                        var role = user.relationships.roles.data[0];

                        $scope.usersInTypes.push({
                          role_id: role.id,
                          user: user
                        });
                      });


                      loadUser();
                    })
                    .catch(function(error){
                      swal("Error!", angular.toJson(error), "error");
                    });
              }
              
              $scope.loadPage = function(page){
                $scope.usersNotInTypes = [];
                $http
                    .get(CONSTANT.API + "/api/v1/admin/users?page[number]=" + page + "&page[size]=10")
                    .then(function(res){
                        _.each(res.data.data,function(user){
                            var isDone = $scope.isAdded(user);
                            $scope.usersNotInTypes.push({
                              isDone: isDone,
                              user: user
                            })  
                        })
                    })
              }

              function loadUser() {
                api
                  .user()
                  .get()
                  .$promise
                  .then(function(res){
                  $scope.total = (parseInt(util.getUrlVars(res.links.last)['page[number]']) * parseInt(util.getUrlVars(res.links.last)['page[size]']))
                    _.each(res.data, function(user){
                      var isDone = $scope.isAdded(user);
                      $scope.usersNotInTypes.push({
                        isDone: isDone,
                        user: user
                      })
                    })
                  })
                  .catch(function(error){
                    swal("Error!", angular.toJson(error), "error");
                  })
              }

              $scope.deleteUser = function(user, i) {
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
                      .deleteUserRole({
                        id: $scope.projectId,
                        roleId: user.role_id
                      })
                      .$promise
                      .then(function(res){
                        swal("Successful!", "the project was deleted from system",  "success");
                        _.each($scope.usersNotInTypes, function (userRole) {
                          if(userRole.user.id == user.user.id){
                            userRole.isDone = false;
                          }
                        });


                        // Remove user added role from list
                        $scope
                            .usersInTypes
                            .splice(i, 1);
                      })
                      .catch(function(error){
                        swal("Error!", angular.toJson(error), "error");
                      })

                });
              };


              // Disable user was added
              $scope.isAdded = function(user) {
                return _.find($scope.usersInTypes, function(userRole){
                  return userRole.user.id == user.id;
                });
              }

              // Search user
              $scope.searchUser = function(){
                var listResult = [];
                $http
                    .get(CONSTANT.API + "/api/v1/admin/users/search?q=" + $scope.searchCriteriaUser)
                    .then(function(res){
                      $scope.total = (parseInt(util.getUrlVars(res.data.links.last)['page[number]']) * parseInt(util.getUrlVars(res.data.links.last)['page[size]']))
                        _.each(res.data.data, function(user){
                       var isDone = $scope.isAdded(user);
                          listResult.push({
                            isDone: isDone,
                            user: user
                          })
                          $scope.usersNotInTypes = listResult
                      })
                  })
              }

              $scope.$watch('searchCriteriaUser',function(user){
                if(user === ''){
                  $scope.usersNotInTypes = [];
                  loadUser();
                }
              })
            }
          ]
      );
})();