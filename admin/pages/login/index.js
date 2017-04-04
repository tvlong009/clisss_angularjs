/**
 * Created by GUMI-QUANG on 6/27/16.
 */
(function () {
  angular
      .module("app")
      .controller("Login",
          [
            '$scope', 'api', 'Auth', 'Router',
            function ($scope, api, Auth, Router) {

              /*======================================
               *     INIT SCOPE TO VIEW
               * =====================================*/
              $scope.user = {
                email: "",
                password: ""
              };


              /*======================================
               *     SUBMIT FORM LOGIN
               * =====================================*/
              $scope.auth = function (ev) {
                api
                    .auth()
                    .save($scope.user, function(value, responseHeaders){
                      var token = responseHeaders();
                      var user = value;
                      user.token = token;
                      Auth.setUser(user);
                      Router.toDashboard();
                    }, function(error){
                      swal("Error!", angular.toJson(error), "error");
                    });
              }
            }
          ]
      );
})();