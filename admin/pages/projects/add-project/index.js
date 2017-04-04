/**
 * Created by GUMI-QUANG on 6/27/16.
 */
(function () {
  angular
      .module("app")
      .controller("AddProjects",
          [
            '$scope', 'api', 'Auth', 'Router',
            function ($scope, api, Auth, Router) {


              /*======================================
               *     INIT
               * =====================================*/
              $scope.format = "yyyy-MM-dd";
              $scope.project = {};
              $scope.popup1 = {
                opened: false
              };
              $scope.popup2 = {
                opened: false
              };

              $scope.open1 = function() {
                $scope.popup1.opened = true;
              };

              $scope.open2 = function() {
                $scope.popup2.opened = true;
              };

              
              api
                  .client()
                  .get()
                  .$promise
                  .then(function(res){
                    $scope.clients = res.data;
                  });



              $scope.clear = function(){
                $scope.project = {};
              };


              $scope.copy = function(){
                alert("coming soon");
              };


              /*======================================
               *     SUBMIT FORM LOGIN
               * =====================================*/
              $scope.formAction = function (ev) {
                api
                    .project()
                    .save({
                      project: $scope.project
                    })
                    .$promise
                    .then(function(res){
                      console.log(res);
                      swal("Successful!", "the project was created",  "success");
                      Router.toProjects();
                    })
                    .catch(function(error){
                      swal("Error!", angular.toJson(error), "error");
                    })
              }


            }
          ]
      );
})();