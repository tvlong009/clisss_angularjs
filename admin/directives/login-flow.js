/**
 * Created by longtranvu on 4/1/17.
 */
(function () {
  angular
      .module('app')
      .directive("loginFlow", [ 'api','InstanceTable',function (api,InstanceTable) {
        return {
          restrict: "E",
          scope : {
            pageSelecting: "=",
            modelSelected : "=",
            pages: "=",
            fields: "="
          },
          templateUrl: "components/login-logout-flow/login-flow.html",
          controller: function ($scope) {
            var data = '{"query": {"condition": "and","rules":[]}}';
            $scope.conditionFollow = angular.fromJson(data);

            console.log($scope.pages);

            $scope.isToNextTodoTrue = false;
            $scope.fields = [];
            $scope.reFormatAction = function(type){
              $scope.modelSelected.action = {
                type: type,
                data: {},
                todoTrue: {
                  type: "alert",
                  data: {}
                },
                todoFalse: {
                  type: "alert",
                  data: {}
                }}
            };
            $scope.reFormatTodoTrue = function(type){
              $scope.modelSelected.action.todoTrue = {
                type: type,
                data: {}
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

          }
        };
      }]);
})();