/**
 * Created by longtranvu on 3/29/17.
 */
(function () {
  angular
      .module('app')
      .directive("localAlias", ['api' , '$q', 'InstanceTable', function (api, $q, InstanceTable) {
        return {
          restrict: "E",
          templateUrl: "components/configuration/local-alias.html",
          scope: {
            projectId: '=',
            pageSelecting: '='
          },
          controller: function ($scope) {
            var data = '{"name": "", "ds_name": "localVar", "stage": "init" , "operation_type": "processing", "query": null }';
            $scope.local = angular.fromJson(data);
            $scope.localVars = [];

            $scope.$watch('localVars', function (newValue) {
              $scope.localVars = newValue;
            });
            promiseAll =[];
            promiseAll.push(
                api
                    .projectOperation()
                    .get({
                      project_id: $scope.projectId,
                      page_id: $scope.pageSelecting.id,
                      stage: "init"
                    })
                    .$promise
            );
            $q
                .all(promiseAll)
                .then(function (res) {
                  var temp = res[0].data;

                  _.each(temp, function (local) {
                    if(local.attributes.operation_type == 'processing'){
                      local.attributes.query =  angular.fromJson(local.attributes.query);
                      $scope.localVars.push(local);
                    }
                  });
                });


            $scope.addToListVarToDelete = function(variable){
              $scope.clickOneTable = true;
              var isExist = 1;
              _.each($scope.listVarToDelete,function(value,index){
                if(value.id === variable.id){
                  isExist = 0;
                  $scope.listVarToDelete[index] = null;
                }
              });
              $scope.listVarToDelete = _.compact($scope.listVarToDelete);
              if(isExist == 1){
                $scope.listVarToDelete.push({
                  id : variable.id
                });
              }
            };

            $scope.deleteAllVar = function(){
              if($scope.clickOneTable && $scope.listVarToDelete.length > 0){
                $scope.listVarToDelete = [];
                _.each($scope.localVars,function(value) {
                  $scope.listVarToDelete.push({
                    id: value.id
                  });
                });
                $scope.clickOneTable = false;
                return false;
              }
              if(!$scope.clickOneTable && $scope.listVarToDelete.length > 0){
                $scope.listVarToDelete = [];
                return false;
              }
              if(!$scope.clickOneTable && $scope.listVarToDelete.length == 0){
                _.each($scope.localVars,function(value) {
                  $scope.listVarToDelete.push({
                    id: value.id
                  });
                });
              }
            };

            $scope.saveLocalVar = function(){
              api
                  .projectOperation()
                  .save({
                      project_id: $scope.projectId,
                      page_id: $scope.pageSelecting.id,
                      operation: {
                        name: $scope.local.name,
                        ds_name: 'localVar',
                        stage: 'init',
                        operation_type: 'processing',
                        query: angular.toJson($scope.local.query)
                      }
                  })
                  .$promise
                  .then(function (res) {
                      res.data.attributes.query = angular.fromJson(res.data.attributes.query);
                      $scope.localVars.push(res.data);
                      swal("Success!", "Successfully save local variable", "success");
                      $scope.varSelected = null;
                      $scope.isUpdate = false;
                      $scope.local.name = "";
                      $scope.local.query.type = "";
                      $scope.local.query.data = "";
                  }).catch(function(error){
                    swal('Error', angular.toJson(error), 'error');
                  });

            };

            $scope.getVar = function(variable, index){
              $scope.local.name = variable.attributes.name;
              $scope.local.query.type = variable.attributes.query.type;
              $scope.local.query.data = variable.attributes.query.data;
              $scope.isUpdate = true;
              $scope.varSelected = variable;
              $scope.indexVar = index;
            };

            $scope.updateLocalVar = function(){

              api
                  .projectOperation()
                  .update({
                    project_id: $scope.projectId,
                    page_id: $scope.pageSelecting.id,
                    id: $scope.varSelected.id,
                    operation: {
                      name: $scope.local.name,
                      ds_name: 'localVar',
                      stage: 'init',
                      operation_type: 'processing',
                      query: angular.toJson($scope.local.query)
                    }
                  })
                  .$promise
                  .then(function(res){
                    res.data.attributes.query = angular.fromJson(res.data.attributes.query);
                    $scope.localVars[$scope.indexVar] = res.data;
                    swal("Success!", "Successfully deleted table", "success");

                    $scope.varSelected = null;
                    $scope.isUpdate = false;
                    $scope.local.name = "";
                    $scope.local.query.type = "";
                    $scope.local.query.data = "";
                  })
                  .catch(function(error){
                  });

            };

            $scope.deleteLocalVar = function(){
              swal({
                title: "Are you sure?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "OK",
                closeOnConfirm: false,
                html: false
              }, function(){
                _.each($scope.listVarToDelete, function (variable) {
                  api
                      .projectOperation()
                      .destroy({
                        project_id: $scope.projectId,
                        page_id: $scope.pageSelecting.id,
                        id: variable.id
                      }).$promise
                      .then(function(res){
                        _.each($scope.localVars, function (local, index) {
                          if(local.id == variable.id){
                            $scope.localVars.splice(index, 1);
                          }
                        });
                        swal("Success!", "Successfully delete instance table conditions", "success");
                      })
                      .catch(function(error){
                        console.log(error);
                        swal("Error!", "Error in deleted instance table conditions", "error");
                      });
                });
              });
            };
          }
        };
      }]);
})();