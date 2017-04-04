/**
 * Created by GUMI-QUANG on 6/27/16.
 */
(function () {
  angular
      .module("app")
      .controller("EditUsers",
          [
            '$scope', 'api', '$stateParams', 'Router',
            function ($scope, api, $stateParams, Router) {

              /*======================================
               *     INIT
               * =====================================*/
              var id = $stateParams.id;
              api
                  .user()
                  .get({id: id})
                  .$promise
                  .then(function(res){
                    var data = res.data;
                    $scope.user = data.attributes;
                  });



              /*======================================
               *     SUBMIT FORM LOGIN
               * =====================================*/
              $scope.formAction = function (ev) {
                api
                    .user()
                    .update({id: id}, $scope.user)
                    .$promise
                    .then(function(res){
                      swal("Successful!", "the user was updated",  "success");
                      console.log(res);
                      Router.toUsers();
                    })
                    .catch(function(error){
                      swal("Error!", angular.toJson(error), "error");
                    })
              }
            }
          ]
      );
})();