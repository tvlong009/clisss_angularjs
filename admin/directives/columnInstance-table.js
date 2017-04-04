(function () {
  angular
      .module('app')
      .directive("columnInstanceTableQueried", [ 'api','InstanceTable',function (api,InstanceTable) {
        return {
          restrict: "E",
          scope : {
            instanceTables: "=",
            projectID: "=",
            pageSelecting: "=",
            columnTableQueried : "=",
            operations : "=",
            modelSelected : "=",
            tables: "="
          },
          templateUrl: "components/column-instance-table/column-instance-table.html",
          controller: function ($scope) {
            $scope.loadColumnFromOperations = function(item,index){
              $scope.indexCurrentOperator = index;
              $scope.currentOperatorTable = item;
              $scope.columnOperator = angular.fromJson(item.attributes.query);
              _.each($scope.tables,function(table){
                if(table.attributes.name == item.attributes.ds_name){
                  InstanceTable.loadColumnTable($scope.pageSelecting.id,table).then(function(){
                    if(!is.object(item.attributes.query)){
                      item.attributes.query = angular.fromJson(item.attributes.query);
                    }
                    $scope.columnTableQueried = _.intersectionBy(InstanceTable.data_column,item.attributes.query.rules,function(value){
                      return value.id;
                    });
                  });
                }
              })
            };

            $scope.addValueModelSelected = function(column){
              $scope.modelSelected.data.table = $scope.currentOperatorTable.attributes.ds_name;
              $scope.modelSelected.data.column = column.attributes.name;
              $scope.modelSelected.model = "@DB" + "." + $scope.modelSelected.data.table + "." + $scope.modelSelected.data.column;
              $scope.modelSelected.content = $scope.modelSelected.model;
              if($scope.modelSelected.type === "input"){
                  $scope.modelSelected.placeHolder = $scope.modelSelected.content;
              }
              if($scope.modelSelected.type === "button"){
                $scope.modelSelected.label = $scope.modelSelected.data ;
              }
              if($scope.modelSelected.type === "list"){
                $scope.modelSelected.items = [
                  { text: $scope.modelSelected.data }
                ];
              }
              if($scope.modelSelected.type === "select"){
                $scope.modelSelected.options = [
                  { value: $scope.modelSelected.data }
                ];
              }
              if($scope.modelSelected.type === "table"){
                _.each($scope.modelSelected.dbColumns, function (column) {
                  if(column.onFocus){
                    column.name =  $scope.modelSelected.data.column;
                    column.operation = $scope.currentOperatorTable;
                    console.log($scope.modelSelected);
                  }

                });
              }
            }
          }
        };
      }]);
})();