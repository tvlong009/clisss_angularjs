(function () {
  angular
      .module('app')
      .directive("configAction", [ 'api','InstanceTable',function (api,InstanceTable) {
        return {
          restrict: "E",
          scope : {
            instanceTables: "=",
            projectID: "=",
            pageSelecting: "=",
            columnTableQueried : "=",
            operations : "=",
            modelSelected : "=",
            tables: "=",
            pages: "=",
            fields: "="
          },
          templateUrl: "components/config-action/config-action.html",
          controller: function ($scope) {
              var data = '{"query": {"condition": "and","rules":[]}}';
              $scope.conditionFollow = angular.fromJson(data);
              $scope.isToNextTodoTrue = false;
              $scope.fields = [];
              $scope.reFormatAction = function(type){
                  $scope.modelSelected.action = {
                    type: type,
                    data: {},
                    todoTrue: {
                      type: "alert",
                      data: {},
                    },
                    todoFalse: {
                      type: "alert",
                      data: {}
                    }}
              };
              $scope.reFormatTodoTrue = function(type){
                $scope.modelSelected.action.todoTrue = {
                  type: type,
                  data: {},
                }
              };
              $scope.initDataForPostData = function(){
                $scope.modelSelected.action.todoTrue.afterPostData = {
                  type: 'link',
                  data: ''
                };
                $scope.modelSelected.action.todoTrue.data = {
                  "rows" : [{
                    "table_id" : $scope.modelSelected.action.data.idTableToCheck
                  }]
                }
              };
              $scope.getColumnFromTable = function(table){
                $scope.tableFromOption = angular.fromJson(table);
                $scope.modelSelected.action.data.idTableToCheck = $scope.tableFromOption.id;
                InstanceTable.loadColumnTable($scope.pageSelecting.id,$scope.tableFromOption).then(function(){
                  _.each(InstanceTable.data_column, function (column) {
                    $scope.fields.push({
                      id: column.id,
                      name: column.attributes.name,
                      type: column.attributes.content_type
                    });
                  })
                });
              };
              $scope.nextStep = function(){
                $scope.modelSelected.action.data.tableToCheck = $scope.tableFromOption.attributes.name;
                $scope.modelSelected.action.data.columnCodition = {};
                var newArrayPushColumn = [];
                _.each($scope.conditionFollow.query.rules,function(value){
                  $scope.modelSelected.action.data.columnCodition[value.nameColumn] = value.nameColumn;
                  var newObj = {};
                  newObj[value.operator] = [{ "var" : value.nameColumn }, value.value];
                  newArrayPushColumn.push(newObj);
                });

                  // var newObject = {};
                  // newObject[$scope.conditionFollow.query.condition] = newArrayPushColumn;
                var columnToCheck = {};
                columnToCheck[$scope.conditionFollow.query.condition] = newArrayPushColumn;
                $scope.modelSelected.action.data.columnToCheck = columnToCheck;
                $scope.isToNextTodoTrue = true;
              }
          }
        };
      }]);
})();