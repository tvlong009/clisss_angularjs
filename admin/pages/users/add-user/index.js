/**
 * Created by GUMI-QUANG on 6/27/16.
 */
(function () {
  angular
      .module("app")
      .controller("AddUsers",
          [
            '$scope', 'api', 'Router',
            function ($scope, api, Router) {

              /*======================================
               *     INIT
               * =====================================*/
              $scope.user = {
                name: "",
                email:"",
                password:"",
                confirm_password:""
              };


              /*======================================
               *     SUBMIT FORM LOGIN
               * =====================================*/
              $scope.formAction = function (ev) {
                api
                    .user()
                    .save($scope.user)
                    .$promise
                    .then(function(res){
                      swal("Successful!", "the client was created",  "success");
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