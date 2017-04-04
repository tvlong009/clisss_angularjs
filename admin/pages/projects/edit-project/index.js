/**
 * Created by GUMI-QUANG on 6/27/16.
 */
(function () {
  angular
      .module("app")
      .controller("EditProjects",
          [
            '$scope', 'api', 'Auth', 'Router', '$stateParams',
            function ($scope, api, Auth, Router, $stateParams) {
              /*======================================
               *     INIT
               * =====================================*/
              var id = $stateParams.id;
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



              // Get client list
              api
                  .client()
                  .get()
                  .$promise
                  .then(function(res){
                    $scope.clients = res.data;
                  });


              // Get project by id
              api
                  .project()
                  .get({id: id})
                  .$promise
                  .then(function(res){
                    $scope.project = res.data.attributes;
                    $scope.project.client_id = res.data.relationships.client.data.id;
                    $scope.project.period_end_date = new Date($scope.project.period_end_date);
                    $scope.project.period_start_date = new Date($scope.project.period_start_date);
                  })
                  .catch(function(error){
                    swal("Error!", angular.toJson(error), "error");
                  });



              /*======================================
               *     SUBMIT FORM LOGIN
               * =====================================*/
              $scope.formAction = function (ev) {
                api
                    .project()
                    .update({id: id},{
                      project: $scope.project
                    })
                    .$promise
                    .then(function(res){
                      swal("Successful!", "the project was updated",  "success");
                      console.log(res);
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