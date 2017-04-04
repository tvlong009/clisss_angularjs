/**
 * Created by longtranvu on 3/22/17.
 */
(function () {
  angular
      .module('app')
      .directive("listInstanceTableConfigured", ['$compile', 'api','InstanceTable', '$q',
        function ($compile, api, InstanceTable, $q) {
        return {
          restrict: 'E',
          scope: {
            table: '=',
            projectID: '=',
            pageSelecting: '=',
            instanceTables: '=',
            tables: '='
          },
          templateUrl:'components/configuration/list-instance-table-configured.html',
          compile: function (element) {
            var content, directive;
            content = element.contents().remove();
            return function (scope, element) {
              scope.table.attributes.query = angular.fromJson(scope.table.attributes.query);

              var promiseAll = [];
              scope.fields = [];
              _.each(scope.tables, function (table) {
                if(scope.table.attributes.ds_name === table.attributes.name){
                  promiseAll.push(InstanceTable.loadColumnTable(scope.pageSelecting.id, table));
                }
              });

              $q
                  .all(promiseAll)
                  .then(function (arrayPromise) {
                    _.each(arrayPromise, function (columns) {
                      _.each(columns, function (column) {
                        scope.fields.push({
                          id: column.id,
                          name: column.attributes.name,
                          type: column.attributes.content_type
                        });
                      });
                    });

                    _.each(scope.table.attributes.query.rules, function (rule) {
                      _.each(scope.fields, function (field) {
                        if(field.id == rule.id){
                          rule.type = field.type;
                          if ( field.type == "integer" || field.type == "float"){
                            rule.value = +rule.value;
                          }
                        }
                      });
                    });
                  })
                  .catch(function (error) {
                    console.log(error);
                  });

              scope.validateType = function(rule){
                rule.value = null;
                _.each(scope.fields,function(value){
                  if(value.id == rule.id){
                    rule.type = value.type;
                  }
                })
              };

              scope.conditions = [
                { name: 'AND' },
                { name: 'OR' }
              ];
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


              scope.addCondition = function (table) {
                scope.table.attributes.query.rules.push({});
                // scope.table.attributes.query = angular.toJson(scope.query);
              };

              scope.removeCondition = function (index) {
                scope.table.attributes.query.rules.splice(index, 1);
                // scope.table.attributes.query = angular.toJson(scope.query);
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