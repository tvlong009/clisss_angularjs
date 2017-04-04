/**
 * Created by GUMI-QUANG on 6/27/16.
 */
(function () {
  angular
      .module("app")
      .controller("ListProjects",
          [
            '$scope', 'api','util','$http','CONSTANT',
            function ($scope, api,util,$http,CONSTANT) {

              /*======================================
               *    INIT
               * =====================================*/
              $scope.total = 0;
              $scope.maxSize = 10;
              $scope.currentPage = 1;
              $scope.projects = [];

              api
                  .project()
                  .get()
                  .$promise
                  .then(function(res){
                    $scope.total = (parseInt(util.getUrlVars(res.links.last)['page[number]']) * parseInt(util.getUrlVars(res.links.last)['page[size]']))
                    $scope.projects = res.data;
                  });

              $scope.loadProject = function(page){            
                $scope.projects = [];
                $http
                    .get(CONSTANT.API + "/api/v1/admin/projects?page[number]=" + page + "&page[size]=10")
                    .then(function(res){
                        $scope.projects = res.data.data;  
                    })
              };


              /*======================================
               *     DELETE ITEM
               * =====================================*/
              $scope.deleteItem = function(project, index){
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
                      .destroy({
                        id: project.id
                      })
                      .$promise
                      .then(function(res){
                        swal("Successful!", "the project was deleted from system",  "success");
                        console.log(res);
                        $scope.projects.splice(index,1);
                      })
                      .catch(function(error){
                        swal("Error!", angular.toJson(error), "error");
                      })

                });
              };



              /*======================================
               *     LOAD PROJECT PAGE
               * =====================================*/
              $scope.loadUrl = function (url) {
                if(CONSTANT.HTML5){
                  return CONSTANT.CLIENT_SITE + "/" + url;
                }
                return CONSTANT.CLIENT_SITE + "/!#/" + url;
              }

            }
          ]
      );
})();