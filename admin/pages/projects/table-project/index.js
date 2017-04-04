/**
 * Created by GUMI-QUANG on 6/27/16.
 */
(function () {
  angular
      .module("app")
      .controller("TableProjects",
          [
            '$scope', 'api', 'Auth', 'Router', '$stateParams', '$uibModal',
            function ($scope, api, Auth, Router, $stateParams, $uibModal) {

              /*======================================
               *     INIT
               * =====================================*/
              $scope.listColumnToDelete = [];
              $scope.listTableToDelete = [];
              $scope.clickOneTable = false;
              $scope.clickOneColumn = false;
              $scope.columnAdd = {
                attributes:{
                  name : "",
                  content_type : "",
                  condition : "",
                  required : false
                }
              };
              $scope.projectId = $stateParams.id;
              $scope.newTable = {
                attributes : {
                  name : ""
                }
              };
              /*====================================================
               *             GET TABLES
               *====================================================*/
              var tables = function () {
                api
                    .project()
                    .tables({id: $scope.projectId})
                    .$promise
                    .then(function(res){
                      $scope.tables = res;
                    })
                    .catch(function(error){
                      swal("Error!", angular.toJson(error), "error");
                    });
              };

              /*====================================================
               *            GET AND UPDATE TABLE
               *====================================================*/

              $scope.getTable = function(table){
                $scope.tableNameTemp = table.attributes.name;
                $scope.isUpdateTable = true;
                $scope.newTable = angular.copy(table);
              };

              $scope.updateTable = function(table){
                var isExistTable = 0;
                _.each($scope.tables.data,function(value){
                  "use strict";
                  if($scope.tableNameTemp != table.attributes.name && value.attributes.name === table.attributes.name){
                    swal("Error!", "This table has been already created before", "error");
                    isExistTable = 1;
                  }
                });
                if(isExistTable == 0){
                  api
                      .project()
                      .updateTable({
                        id: $scope.projectId,
                        tableID: table.id,
                        name: table.attributes.name
                      })
                      .$promise
                      .then(function(){
                        swal("Success!", "Successfully Updated Table", "success");
                        $scope.newTable = {
                          attributes:{}
                        };
                        tables();
                      })
                      .catch(function(error){
                        swal("Error!", angular.toJson(error), "error");
                      });
                }
              };
              /*====================================================
               *             ADD NEW TABLES
               *====================================================*/
              $scope.addNewTable = function (table) {
                var isExistTable = 0;
                _.each($scope.tables.data,function(value){
                  "use strict";
                  if(value.attributes.name === table.attributes.name){
                    swal("Error!", "This table has been already created before", "error");
                    isExistTable = 1;
                  }
                });
                if(isExistTable == 0){
                  api
                      .project()
                      .addTables({
                        id: $scope.projectId,
                        name: table.attributes.name
                      })
                      .$promise
                      .then(function(){
                        $scope.newTable.attributes.name = '';
                        tables();
                      })
                      .catch(function(error){
                        swal("Error!", angular.toJson(error), "error");
                      });
                }
              };

              /*====================================================
               *            DELTE MUTILE TABLE COLUMN
               *====================================================*/

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
                    id :table.id
                  });
                }
              };

              $scope.deleteAllTable = function(){
                if($scope.clickOneTable && $scope.listTableToDelete.length > 0){
                  $scope.listTableToDelete = [];
                  _.each($scope.tables.data,function(value) {
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
                  _.each($scope.tables.data,function(value) {
                    $scope.listTableToDelete.push({
                      id: value.id
                    });
                  });
                }
              };

              $scope.deleteTables = function () {
                swal({
                  title: "Are you sure?",
                  type: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#DD6B55",
                  confirmButtonText: "OK",
                  closeOnConfirm: false,
                  html: false
                }, function(){
                  var listDelete = [];
                  _.each($scope.listTableToDelete,function(value){
                    "use strict";
                    listDelete.push(
                        new Promise(function(resolve,reject){
                          api
                              .project()
                              .deleteTable({
                                id: $scope.projectId,
                                tableID: value.id,
                              })
                              .$promise
                              .then(function(){
                                $scope.addToListTableToDelete(value);
                                resolve(true);
                              })
                              .catch(function(error){
                                reject(false);
                              });
                        })
                    )
                  });

                  Promise.all(listDelete)
                      .then(function(){
                        $scope.newTable = {
                          attributes:{}
                        };
                        $scope.tableChecked = "";
                        swal("Success!", "Successfully Deleted Table", "success");
                        $scope.clickOneTable = false;
                        tables();
                      })
                      .catch(function(){
                        swal("Error!", "Have some errors when deleting", "error");
                      });
                });
              };

              /*====================================================
               *            LOAD COLUMN
               *====================================================*/

              $scope.loadColumns = function(tableID){
                $scope.tableID = tableID;
                $scope.listColumnToDelete = [];
                $scope.columnAdd = {
                  attributes:{
                    name : "",
                    content_type : "",
                    condition : "",
                    required : false
                  }
                };
                $scope.isUpdate = false;
                api
                    .project()
                    .columns({
                      id: $scope.projectId,
                      tableID: tableID,
                    })
                    .$promise
                    .then(function(res){
                      $scope.columns = res.data;
                    })
                    .catch(function(error){
                    });
              };

              /*====================================================
               *             RESET COLUMN
               *====================================================*/

              $scope.resetField = function(){
                "use strict";
                $scope.columnAdd = {
                  attributes:{}
                };
                $scope.newTable = {
                  attributes:{}
                };
                $scope.isUpdateTable = false;
                $scope.isUpdate = false;
              };

              /*====================================================
               *             VALIDATION NEW COLUMN
               *====================================================*/
              $scope.validation = function(column){
                return  (column.attributes.name
                    && column.attributes.content_type)
              };

              /*====================================================
               *             ADD NEW COLUMN
               *====================================================*/

              $scope.addNewColumn = function (column) {
                console.log(column.attributes.required);
                var isExistColumn = 1;
                _.each($scope.columns,function(value){
                  "use strict";
                  if(value.attributes.name === column.attributes.name){
                    swal("Error!", "This Column has been already created before", "error");
                    isExistColumn = 0
                  }
                });
                if(isExistColumn == 1){
                  if($scope.validation(column)){
                    api
                        .project()
                        .addColumn({
                          id: $scope.projectId,
                          tableID: $scope.tableID,
                          name : column.attributes.name,
                          content_type : column.attributes.content_type,
                          condition : column.attributes.condition,
                          required : false
                        })
                        .$promise
                        .then(function(res){
                          $scope.columns.push(res.data);
                          $scope.columnAdd = {
                            attributes:{}
                          };
                        })
                        .catch(function(error){
                          swal("Error!", angular.toJson(error), "error");
                        });
                  }else{
                    swal("Error!", "Some Fields Is Missing", "error");
                  }
                }
              };

              /*====================================================
               *            DELETE COLUMNS
               *====================================================*/

              $scope.addToListColumnToDelete = function(column){
                $scope.clickOneColumn = true;
                var isExist = 1;
                _.each($scope.listColumnToDelete,function(value,index){
                  if(value.id === column.id){
                    isExist = 0;
                    $scope.listColumnToDelete[index] = null;
                  }
                });
                $scope.listColumnToDelete = _.compact($scope.listColumnToDelete);
                if(isExist == 1){
                  $scope.listColumnToDelete.push({
                    id :column.id
                  });
                }
              };

              $scope.deleteAllColumn = function(){
                if($scope.clickOneColumn && $scope.listColumnToDelete.length > 0){
                  $scope.listColumnToDelete = [];
                  _.each($scope.columns,function(value) {
                    $scope.listColumnToDelete.push({
                      id: value.id
                    });
                  });
                  $scope.clickOneColumn = false;
                  return false;
                }
                if(!$scope.clickOneColumn && $scope.listColumnToDelete.length > 0){
                  $scope.listColumnToDelete = [];
                  return false;
                }
                if(!$scope.clickOneColumn && $scope.listColumnToDelete.length == 0){
                  _.each($scope.columns,function(value) {
                    $scope.listColumnToDelete.push({
                      id: value.id
                    });
                  });
                }
              };

              $scope.deleteColumns = function () {
                swal({
                  title: "Are you sure?",
                  type: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#DD6B55",
                  confirmButtonText: "OK",
                  closeOnConfirm: false,
                  html: false
                }, function(){
                  var listDelete = [];
                  _.each($scope.listColumnToDelete,function(value){
                    "use strict";
                    listDelete.push(
                        new Promise(function(resolve,reject){
                          api
                              .project()
                              .deleteColumn({
                                id: $scope.projectId,
                                tableID: $scope.tableID,
                                columnID : value.id,
                              })
                              .$promise
                              .then(function(){
                                $scope.addToListColumnToDelete(value);
                                resolve(true);
                              })
                              .catch(function(error){
                                reject(false);
                              });
                        })
                    )
                  });

                  Promise.all(listDelete)
                      .then(function(){
                        $scope.columnChecked = "";
                        $scope.clickOneColumn = false;
                        swal("Success!", "Successfully Deleted Columns", "success");
                        $scope.loadColumns($scope.tableID);
                      })
                      .catch(function(){
                        swal("Error!", "Have some errors when deleting", "error");
                      });
                });
              };

              /*====================================================
               *            GET COLUMN
               *====================================================*/

              $scope.getColumn = function(column){
                $scope.columnNameTemp = column.attributes.name;
                $scope.isUpdate = true;
                $scope.columnAdd = angular.copy(column);
              };

              /*====================================================
               *            EDIT COLUMN
               *====================================================*/

              $scope.updateColumn = function (tableID,column) {
                var isExistColumn = 1;
                _.each($scope.columns,function(value){
                  "use strict";
                  if(column.attributes.name != $scope.columnNameTemp && value.attributes.name === column.attributes.name){
                    swal("Error!", "This Column has been already created before", "error");
                    isExistColumn = 0
                  }
                });
                if(isExistColumn == 1){
                  if($scope.validation(column)){
                    api
                        .project()
                        .updateColumn({
                          id: $scope.projectId,
                          tableID: tableID,
                          columnID : column.id,
                          name : column.attributes.name,
                          content_type : column.attributes.content_type,
                          condition : column.attributes.condition,
                          required : false
                        })
                        .$promise
                        .then(function(){
                          $scope.loadColumns(tableID);
                          $scope.columnAdd = {
                            attributes:{}
                          };
                          $scope.isUpdate = false;
                          swal("Success!", "Successfully Updated Column", "success");
                        })
                        .catch(function(error){
                          swal("Error!", angular.toJson(error), "error");
                        });
                  }else{
                    swal("Error!", "Some fields can not be blank", "error");
                  }
                }
              };

              /*====================================================
               *            LOAD TABLES
               *====================================================*/

              tables();
            }
          ]
      );
})();