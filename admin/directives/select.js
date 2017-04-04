/**
 * Created by longtranvu on 3/10/17.
 */
(function () {
  angular
      .module('app')
      .directive("selectCustom", [function () {
        return {
          restrict: "E",
          templateUrl: "components/nodes-properties/select.html",
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
            $scope.addMoreOptions = function () {
              var temp = {
                value: 'new options'
              };
              $scope.models.selected.options.push(temp);
            };
            $scope.removeOptionsSelect = function (index) {
              $scope.models.selected.options.splice(index, 1);
            };
          }
        };
      }]);
})();