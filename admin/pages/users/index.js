/**
 * Created by GUMI-QUANG on 6/27/16.
 */
(function () {
  angular
      .module("app")
      .controller("Users",
          [
            '$scope', 'api','util','$http','CONSTANT',
            function ($scope, api,util,$http,CONSTANT) {

              /*======================================
               *    INIT
               * =====================================*/
              $scope.total;
              $scope.maxSize = 10;
              $scope.currentPage = 1;
              $scope.users = [];

              var initUser = function(){
                api
                  .user()
                  .get()
                  .$promise
                  .then(function(res){
                    $scope.total = (parseInt(util.getUrlVars(res.links.last)['page[number]']) * parseInt(util.getUrlVars(res.links.last)['page[size]']))
                    $scope.users = res.data;
                  });
              }

              initUser()

              $scope.loadUser = function(page){            
                $scope.users = [];
                $http
                    .get(CONSTANT.API + "/api/v1/admin/users?page[number]=" + page + "&page[size]=10")
                    .then(function(res){
                        $scope.users = res.data.data;  
                    })
              }


              /*======================================
               *     DELETE ITEM
               * =====================================*/
              $scope.deleteItem = function(user, index){
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
                      .user()
                      .destroy({
                        id: user.id
                      })
                      .$promise
                      .then(function(res){
                        swal("Successful!", "the user was deleted from system",  "success");
                        console.log(res);
                        $scope.users.splice(index,1);
                      })
                      .catch(function(error){
                        swal("Error!", angular.toJson(error), "error");
                        console.log(error);
                      })

                });
              }

              /*======================================
               *     SEARCH USER
               * =====================================*/
               $scope.searchUser = function(){
                  $http
                    .get(CONSTANT.API + "/api/v1/admin/users/search?q=" + $scope.searchCriteriaUser)
                    .then(function(res){
                      $scope.total = (parseInt(util.getUrlVars(res.data.links.last)['page[number]']) * parseInt(util.getUrlVars(res.data.links.last)['page[size]']))
                      $scope.users = res.data.data;
                  })
               }

               //Watch the change of model 
               $scope.$watch('searchCriteriaUser',function(user){
                  if(user === ''){
                    initUser()
                  }
               })
            }
          ]
      );
})();