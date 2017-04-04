/**
 * Created by longtranvu on 3/16/17.
 */
(function () {
  angular
      .module('app')
      .directive("configuration", ['api', 'InstanceTable', function (api, InstanceTable) {
        return {
          restrict: "E",
          scope : {
            projectID: "=",
            pageSelecting: '=',
            operations: "=",
            operationsGet: "=",
            tables: "=",
            instanceTables: '='
          },
          templateUrl: "components/configuration/configuration.html",
          controller: function ($scope) {
            var data = '{"name": "", "ds_name": "", "stage": "init" , "operation_type": "get", "query": {"condition": "AND","rules":[]}}';
            $scope.json = null;
            $scope.filter = angular.fromJson(data);
            $scope.filter.stage = "";
            $scope.filter.name ="";
            $scope.filter.operation_type = "";

            $scope.$watch('filter', function (newValue) {
              $scope.json = angular.toJson(newValue, null, 2);
            }, true);

            // $scope.$watch('instanceTables', function (newValue) {
            //   $scope.instanceTables = newValue;
            // }, true);

            $scope.setTableFromOption = function (table) {
              $scope.tableFromOption = angular.fromJson(table);
              $scope.fields = [];

              InstanceTable.loadColumnTable($scope.pageSelecting.id,$scope.tableFromOption).then(function(){
                      _.each(InstanceTable.data_column, function (column) {
                        $scope.fields.push({
                          id: column.id,
                          name: column.attributes.name,
                          type: column.attributes.content_type
                        });
                      })
              });
              //Reset Data
              $scope.filter = angular.fromJson(data);
              $scope.filter.ds_name = $scope.tableFromOption.attributes.name;
            };



            $scope.saveAliasPage = function(table){
              var objectTable = angular.fromJson(table);
              var json = angular.fromJson($scope.json);
              if( is.not.empty(json.name)){
                api
                    .projectOperation()
                    .save({
                      project_id: $scope.projectID,
                      page_id: $scope.pageSelecting.id,
                      operation: {
                        name: $scope.filter.name,
                        ds_name: objectTable.attributes.name,
                        stage: 'init',
                        operation_type: 'get',
                        query: '{"condition": "AND","rules":[]}'
                      }
                    }).$promise
                    .then(function(res){
                      //Load Operation again
                      $scope.operationsGet.push(res.data);
                      $scope.operations.push(res.data);
                      $scope.filter.name = "";
                      swal("Success!", "Successfully saved instance table conditions", "success");
                    })
                    .catch(function(error){
                      swal("Error!", error.data.errors[0].source.pointer + " " + error.data.errors[0].detail, "error");
                    });

              }else {
                swal("Error!", "Error, please fill name ", "error");
              }

            };

            $scope.updateAliasPage = function(table, index){
              if(is.not.empty(table.attributes.name)){
                api
                    .projectOperation()
                    .update({
                      project_id: $scope.projectID,
                      page_id: $scope.pageSelecting.id,
                      id: table.id,
                      operation: {
                        name: table.attributes.name,
                        ds_name: table.attributes.ds_name,
                        stage: 'init',
                        operation_type: 'get',
                        query: angular.toJson(table.attributes.query)
                      }
                    }).$promise
                    .then(function(res){
                      //Load Operation again
                      _.each($scope.operations, function (operation, indexOperation) {
                        if(table.id === operation.id){
                          $scope.operations[indexOperation] = res.data;
                          console.log($scope.operations[indexOperation]);
                        }
                      });
                      $scope.operationsGet[index] = res.data;
                      // InstanceTable.loadDataOperations($scope.pageSelecting.id).then(function () {
                      //   $scope.operations = InstanceTable.data_operations;
                      // });

                      swal("Success!", "Successfully updated instance table conditions", "success");
                    })
                    .catch(function(error){
                      console.log(error);
                      swal("Error!", error.data.errors[0].source.pointer + " " + error.data.errors[0].detail, "error");
                    });
              }else {
                swal("Error!", "Please fill your name operation", "error");
              }
            };

            $scope.deleteAliasPage = function(table, index){
              swal({
                title: "Are you sure?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "OK",
                closeOnConfirm: false,
                html: false
              }, function () {
                api
                    .projectOperation()
                    .destroy({
                      project_id: $scope.projectID,
                      page_id: $scope.pageSelecting.id,
                      id: table.id
                    }).$promise
                    .then(function(res){
                      //Load Operation again
                      _.each($scope.operations, function (operation, indexOperation) {
                        if(table.id === operation.id){
                          $scope.operations.splice(indexOperation, 1);
                        }
                      });

                      $scope.operationsGet[index] = null;
                      $scope.operationsGet = _.compact($scope.operationsGet);
                      // InstanceTable.loadDataOperations($scope.pageSelecting.id).then(function () {
                      //   $scope.operations = InstanceTable.data_operations;
                      // });
                      swal("Success!", "Successfully delete instance table conditions", "success");
                    })
                    .catch(function(error){
                      console.log(error);
                      swal("Error!", "Error in deleted instance table conditions", "error");
                    });
              });

            };

          }
        };
      }]);
})();