/**
 * Created by longtranvu on 3/27/17.
 */
(function () {
  angular
      .module('app')
      .directive("imageCustom", [function () {
        return {
          restrict: "E",
          templateUrl: "components/nodes-properties/image.html",
          controller: function ($scope) {
            $scope.deleteStyle = function (index) {
              $scope.models.selected.properties.styles.splice(index, 1);
            };
            $scope.createStyle = function () {
              var temp = {
                name: "",
                value: ""
              };
              $scope.models.selected.properties.styles.push(temp);
            };
            $scope.getPictureName = function(select){
              console.log(select);
            }
          }
        };
      }]);
})();