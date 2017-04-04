/**
 * Created by GUMI-QUANG on 6/27/16.
 */
(function () {
  angular
      .module("app")
      .controller("AddClients",
          [
            '$scope', 'api', 'Router',
            function ($scope, api, Router) {

              /*======================================
               *     INIT
               * =====================================*/
              $scope.client = {
                name: ""
              };


              /*======================================
               *     SUBMIT FORM LOGIN
               * =====================================*/
              $scope.formAction = function (ev) {
                api
                    .client()
                    .save($scope.client)
                    .$promise
                    .then(function(res){
                      swal("Successful!", "the client was created",  "success");
                      console.log(res);
                      Router.toClients();
                    })
                    .catch(function(error){
                      swal("Error!", angular.toJson(error), "error");
                    })
              }
            }
          ]
      );
})();