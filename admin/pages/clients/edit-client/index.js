/**
 * Created by GUMI-QUANG on 6/27/16.
 */
(function () {
  angular
      .module("app")
      .controller("EditClients",
          [
            '$scope', 'api', '$stateParams', 'Router',
            function ($scope, api, $stateParams, Router) {

              /*======================================
               *     INIT
               * =====================================*/
              var id = $stateParams.id;
              api
                  .client()
                  .get({id: id})
                  .$promise
                  .then(function(res){
                    var data = res.data;
                    $scope.client = {
                      name: data.attributes.name
                    }
                  });



              /*======================================
               *     SUBMIT FORM LOGIN
               * =====================================*/
              $scope.formAction = function (ev) {
                api
                    .client()
                    .update({id: id}, $scope.client)
                    .$promise
                    .then(function(res){
                      swal("Successful!", "the client was updated",  "success");
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