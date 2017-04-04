/**
 * Created by nhat-dev on 3/17/17.
 */
(function () {
  angular
      .module('app')
      .directive("conditionFollow", ['$compile', function ($compile) {
        return {
          restrict: 'E',
          scope: {
            query: '=',
            fields: '=',
          },
          templateUrl:'components/condition-follow/condition-follow.html',
          compile: function (element) {
            var content, directive;
            content = element.contents().remove();
            return function (scope, element) {
              scope.conditions = [
                { name: 'and' },
                { name: 'or' }
              ];
              scope.date = '';
              scope.operators = [
                { name: 'not equal', value:"!="},
                { name: 'equal' , value:"=="},
                { name: 'less', value: "<" },
                { name: 'greater', value:">"},
                { name: 'greater or equal', value:">="},
                { name: 'less or equal', value:"<="},
              ];

              scope.addCondition = function () {
                scope.query.rules.push({});
              };

              scope.removeCondition = function (index) {
                scope.query.rules.splice(index, 1);
              };

              scope.validateType = function(rule){
                _.each(scope.fields,function(value){
                  if(value.name == rule.nameColumn){
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