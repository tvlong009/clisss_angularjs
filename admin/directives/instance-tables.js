/**
 * Created by longtranvu on 3/24/17.
 */
(function () {
  angular
      .module('app')
      .directive("instanceTables", [ 'api', function (api) {
        return {
          restrict: "E",
          scope: {
            instanceTables: '=',
            projectId: '=',
            pageSelecting: '=',
            operations: '='
          },
          templateUrl: "components/configuration/instance-tables.html",
          controller: function ($scope) {
            $scope.tables = [];
            $scope.listTableToDelete = [];
            $scope.nameInstables = '';
            $scope.clickOneTable = null;

            //Get all tables
            api
                .project()
                .tables({
                    id: $scope.projectId
                })
                .$promise
                .then(function (res) {
                  $scope.tables = res.data;
                });

            $scope.addToListTableToDelete = function(table){
              $scope.clickOneTable = true;
              var isExist = 1;
              _.each($scope.listTableToDelete,function(value,index){
                if(value.id === table.id){
                  isExist = 0;
                  $scope.listTableToDelete[index] = null;
                }
              });
              $scope.listTableToDelete = _.compact($scope.listTableToDelete);
              if(isExist == 1){
                $scope.listTableToDelete.push({
                  id : table.id
                });
              }
              console.log( $scope.listTableToDelete);
            };

            $scope.deleteAllTable = function(){
              if($scope.clickOneTable && $scope.listTableToDelete.length > 0){
                $scope.listTableToDelete = [];
                _.each($scope.instanceTables,function(value) {
                  $scope.listTableToDelete.push({
                    id: value.id
                  });
                });
                $scope.clickOneTable = false;
                return false;
              }
              if(!$scope.clickOneTable && $scope.listTableToDelete.length > 0){
                $scope.listTableToDelete = [];
                return false;
              }
              if(!$scope.clickOneTable && $scope.listTableToDelete.length == 0){
                _.each($scope.instanceTables,function(value) {
                  $scope.listTableToDelete.push({
                    id: value.id
                  });
                });
              }
              console.log( $scope.listTableToDelete);
            };

            $scope.saveInstanceTable = function(){
            if($scope.tableId){
              var isExistColumn = 1;
              _.each($scope.instanceTables,function(value){
                "use strict";
                if(value.attributes.name === $scope.nameInstables){
                  swal("Error!", "the table's name was existed", "error");
                  isExistColumn = 0
                }
              });
              if(isExistColumn == 1){
                api
                    .project()
                    .addInstanceTables({
                      id: $scope.projectId,
                      page_id : $scope.pageSelecting.id,
                      table_id : $scope.tableId,
                      name : $scope.nameInstables
                    })
                    .$promise
                    .then(function(res){
                      $scope.instanceTables.push(res.data);
                      $scope.nameInstables = '';
                      $scope.tableId = null;
                      swal("Success!", "Successfully saved instance table", "success");
                    })
                    .catch(function(error){
                      swal("Error!", angular.toJson(error), "error");
                    });
              }
            }else {
              swal("Error!", "Please choose tables", "error");
            }

            };

            $scope.getInsTable = function(Instable, index){
              $scope.nameInstables = Instable.attributes.name;
              $scope.isUpdate = true;
              $scope.instableSelected = Instable;
              $scope.indexInstanceTable = index;
            };

            $scope.updateInstanceTable = function(){
              api
                  .project()
                  .updateInstanceTable({
                    id: $scope.projectId,
                    page_id: $scope.pageSelecting.id,
                    instanceTableId :  $scope.instableSelected.id,
                    name: $scope.nameInstables
                  })
                  .$promise
                  .then(function(res){
                    $scope.instanceTables[$scope.indexInstanceTable] = res.data;

                    swal("Success!", "Successfully deleted table", "success");
                  })
                  .catch(function(error){
                  });

              $scope.instableSelected = null;
              $scope.isUpdate = false;
              $scope.nameInstables = "";

            };

            $scope.deleteSelectedInstanceTable = function(){
              swal({
                title: "Are you sure?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "OK",
                closeOnConfirm: false,
                html: false
              }, function(){
                _.each($scope.listTableToDelete, function (Instable) {
                  api
                      .project()
                      .deleteInstanceTable({
                        id: $scope.projectId,
                        page_id: $scope.pageSelecting.id,
                        instanceTableId :  Instable.id
                      })
                      .$promise
                      .then(function(){
                        _.each($scope.instanceTables, function (table, index) {
                            if(Instable.id == table.id){
                              $scope.instanceTables.splice(index,1);
                              _.each($scope.operations, function (operation, index) {
                                if(operation.attributes.ds_name == table.attributes.name){
                                  $scope.deleteAliasPage(operation);
                                  $scope.operations.splice(index,1);
                                }
                              });

                            }
                        });
                        swal("Success!", "Successfully deleted table", "success");
                      })
                      .catch(function(error){
                      });
                });
              });
            };

            $scope.deleteAliasPage = function(table){
              api
                  .projectOperation()
                  .destroy({
                    project_id: $scope.projectId,
                    page_id: $scope.pageSelecting.id,
                    id: table.id
                  }).$promise
                  .then(function(res){
                    swal("Success!", "Successfully delete instance table conditions", "success");
                  })
                  .catch(function(error){
                    console.log(error);
                    swal("Error!", "Error in deleted instance table conditions", "error");
                  });
            };
          }
        };
      }]);
})();