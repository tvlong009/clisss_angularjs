/**
 * Created by longtranvu on 3/10/17.
 */
(function () {
  angular
      .module('app')
      .directive("tableCustom", [function () {
        return {
          restrict: "E",
          templateUrl: "components/nodes-properties/table.html",
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
            $scope.checkFocus = function(columns, column){
              _.each(columns, function (col) {
                col.onFocus = false;
              });
              column.onFocus = true;
            };
            $scope.addColumnForTable = function(){
                var tempColumn = {
                  name: "New Column"
                };
                $scope.models.selected.columns.push(tempColumn);
                _.each($scope.models.selected.rows, function(value){
                   var tempRow = {
                    value: "New Value Column"
                   };
                   value.data.push(tempRow);
                });
            };

            $scope.removeColumnForTable = function (index) {
              $scope.models.selected.columns.splice(index, 1);
              _.each($scope.models.selected.rows, function(value, index){
                  value.data.splice(index, 1);
              });
            };

            var templateRow;
            $scope.addRowForTable = function () {
              templateRow = {
                data: []
              };
              _.each($scope.models.selected.columns, function(value, index){
                var tempData = {
                  value: "New Data Column " + (index + 1)
                };
                templateRow.data.push(tempData);
              });
              $scope.models.selected.rows.push(templateRow);
            };

            $scope.removeRowForTable = function(index) {
                $scope.models.selected.rows.splice(index, 1);
            };

            $scope.addColumnForDBTable = function(){
              var tempColumn = {
                name: "New Column",
                onFocus: false,
                operation: null
              };
              $scope.models.selected.dbColumns.push(tempColumn);
            };

            $scope.removeColumnForDBTable = function (index) {
              $scope.models.selected.dbColumns.splice(index, 1);
            };


          }
        };
      }]);
})();