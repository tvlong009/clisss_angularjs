/**
 * Created by nhat-dev on 3/17/17.
 */
(function () {
  angular
      .module('app')
      .directive("todoFalse", ['$compile', function ($compile) {
        return {
          restrict: 'E',
          scope: {
            modelSelected : '=',
            pages: '=',
            pageSelecting: '='
          },
          templateUrl:'components/todo-false/todo-false.html',
          compile: function (element) {
            var content, directive;
            content = element.contents().remove();
            return function (scope, element) {

              scope.reFormatTodoFalse = function(type){
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