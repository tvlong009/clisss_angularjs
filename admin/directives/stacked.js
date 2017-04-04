/**
 * Created by longtranvu on 3/10/17.
 */

(function () {
  angular
      .module('app')
      .directive("stacked", [function () {
        return {
          restrict: "E",
          templateUrl: "components/nodes-properties/stacked.html",
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

            $scope.$watch('models.selected.bgImageSrc', function (newValue) {
              console.log(newValue);
            })
          }
        };
      }]);
})();