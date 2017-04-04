/**
 * Created by GUMI-QUANG on 6/27/16.
 */
(function () {
  angular
      .module("app")
      .controller("Clients",
          [
            '$scope', 'api','util','$http','CONSTANT',
            function ($scope, api,util,$http,CONSTANT) {

              /*======================================
               *     INIT
               * =====================================*/

              $scope.total;
              $scope.maxSize = 10;
              $scope.currentPage = 1;
              
              api.client()
                  .get()
                  .$promise
                  .then(function(res){
                    $scope.total = (parseInt(util.getUrlVars(res.links.last)['page[number]']) * parseInt(util.getUrlVars(res.links.last)['page[size]']))
                    $scope.clients = res.data;
                    console.log(res);
                  })
                  .catch(function(error){
                    console.log(error);
                    swal("Error!", "Please try it again", "error");
                  });

              $scope.loadClient = function(page){            
                $scope.clients = [];
                $http
                    .get(CONSTANT.API + "/api/v1/admin/clients?page[number]=" + page + "&page[size]=10")
                    .then(function(res){
                        $scope.clients = res.data.data;  
                    })
              }


              /*======================================
               *     DELETE
               * =====================================*/
              $scope.deleteItem = function(client, index){
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
                      .client()
                      .destroy({
                        id: client.id
                      })
                      .$promise
                      .then(function(res){
                        swal("Successful!", "the client was deleted from system",  "success");
                        console.log(res);
                        $scope.clients.splice(index, 1);
                      })
                      .catch(function(error){
                        swal("Error!", angular.toJson(error), "error");
                        console.log(error);
                      })

                });
              }
            }
          ]
      );
})();