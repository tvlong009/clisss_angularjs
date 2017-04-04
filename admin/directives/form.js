/**
 * Created by longtranvu on 4/3/17.
 */
(function () {
  angular
      .module('app')
      .directive("formCustom", [function () {
        return {
          restrict: "E",
          templateUrl: "components/nodes-properties/form.html",
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
          }
        };
      }]);
})();