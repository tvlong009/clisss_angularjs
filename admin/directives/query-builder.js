/**
 * Created by longtranvu on 3/17/17.
 */
(function () {
  angular
      .module('app')
      .directive("queryBuilder", ['$compile', function ($compile) {
        return {
          restrict: 'E',
          scope: {
            query: '=',
            fields: '='
          },
          templateUrl:'components/configuration/query-builder.html',
          compile: function (element) {
            var content, directive;
            content = element.contents().remove();
            return function (scope, element) {
              scope.conditions = [
                { name: 'AND' },
                { name: 'OR' }
              ];
              scope.date = '';
              scope.operators = [
                { name: 'equal' , value:"equal"},
                { name: 'not equal', value: "not_equal" },
                { name: 'in', value: "in" },
                // { name: 'not in', value: "not_in" },
                { name: 'less', value: "less" },
                { name: 'less or equal', value: "less_or_equal" },
                { name: 'greater', value:"greater"},
                { name: 'greater or equal', value: "greater_or_equal"}
                // { name: 'between', value:"between"},
                // { name: 'begins with', value: 'begins_with'},
                // { name: 'not begins with', value: 'not_begins_with'},
                // { name: 'contains', value: 'contains'},
                // { name: 'not contains', value: 'not_contains'},
                // { name: 'ends with', value: 'ends_with'},
                // { name: 'not ends with', value: 'not_ends_with'},
                // { name: 'is empty', value: 'is_empty'},
                // { name: 'is not empty', value: 'is_not_empty'},
                // { name: 'is null', value: 'is_null'},
                // { name: 'is not null', value: 'is_not_null'}
              ];

              scope.addCondition = function () {
                scope.query.rules.push({});
              };

              scope.removeCondition = function (index) {
                scope.query.rules.splice(index, 1);
              };

              scope.validateType = function(rule){
                  _.each(scope.fields,function(value){
                    if(value.id == rule.id){
                      rule.type = value.type;
                    }
                  })
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