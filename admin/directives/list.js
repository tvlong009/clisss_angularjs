/**
 * Created by longtranvu on 3/10/17.
 */
(function () {
  angular
      .module('app')
      .directive("listCustom", [function () {
        return {
          restrict: "E",
          templateUrl: "components/nodes-properties/list.html",
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
            $scope.addItemForList = function(){
              var temp = {
                text: "New ITem"
              };
              $scope.models.selected.items.push(temp);
            };

            $scope.removeItemForList = function(index){
              $scope.models.selected.items.splice(index, 1);
            };

          }
        };
      }]);
})();