/**
 * Created by nhat-dev on 3/17/17.
 */
(function () {
  angular
      .module('app')
      .directive("todoTrue", ['$compile', function ($compile) {
        return {
          restrict: 'E',
          scope: {
            query: '=',
            fields: '=',
            modelSelected : '=',
            pages: '=',
            pageSelecting: '='
          },
          templateUrl:'components/todo-true/todo-true.html',
          compile: function (element) {
            var content, directive;
            content = element.contents().remove();
            return function (scope, element) {
              scope.setDataForTodo = function(column){
                if(scope.modelSelected.action.todoTrue.data.rows[0].hasOwnProperty(column.name)){
                  delete scope.modelSelected.action.todoTrue.data.rows[0][column.name];
                }else{
                  scope.modelSelected.action.todoTrue.data.rows[0][column.name] = {
                    "column_id" : column.id,
                    "value" : ''
                  };
                }
              };
              scope.reFormatAfterPostData = function(type){
                scope.modelSelected.action.todoTrue.afterPostData = {
                  type: type,
                  data: {},
                }
              };
              directive || (directive = $compile(content));
              element.append(directive(scope, function ($compile) {
                return $compile;
              }));
            }
          }
        }
      }]);
})();