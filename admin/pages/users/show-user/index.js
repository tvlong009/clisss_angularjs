/**
 * Created by GUMI-QUANG on 6/27/16.
 */
(function () {
  angular
      .module("app")
      .controller("ShowUsers",
          [
            '$scope', 'api', '$stateParams',
            function ($scope, api, $stateParams) {

              /*======================================
               *     INIT
               * =====================================*/
              var id = $stateParams.id;
              api
                  .user()
                  .get({id: id})
                  .$promise
                  .then(function(res){
                    $scope.user = res.data;
                  });
            }
          ]
      );
})();