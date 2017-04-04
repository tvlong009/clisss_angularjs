/**
 * Created by GUMI-QUANG on 6/27/16.
 */
(function () {
  angular
      .module("app")
      .controller("Header",
          [
            '$scope', 'api', 'Auth', 'Router',
            function ($scope, api, Auth, Router) {
              $scope.currentUser = Auth.isLoggedIn();
              
              $scope.logout = function(){
                api
                    .auth()
                    .sign_out()
                    .$promise
                    .then(function(res){
                      Auth.clearUser();
                      Router.toLogin();
                    })
                    .catch(function(error){
                      swal("Error!", angular.toJson(error), "error");
                    });
              }
            }
          ]
      );
})();