
(function () {
  angular
      .module('app')
      .directive("switchIsDatabase", [function () {
        return {
          restrict: "E",
          scope: {
            modelSelected: '=',
            isDatabase: '='
          },
          templateUrl: "components/nodes-properties/switchIsDatabase.html",
          controller: function ($scope) {
            $scope.resetDataInput = function(model){
              model.data =  {
                table: "default",
                column: "default"
              },
              model.content = "Paragraph Text";
              model.label = "Text";
              if(model.type == "list"){
                model.items = [
                  { text: "Item 1" },
                  { text: "Item 2" },
                  { text: "Item 3" }
                ];
              }
              if(model.select == "list"){
                model.options = [
                  {value: "Options 1"},
                  {value: "Options 2"}
                ];
              }
            };
          }
        };
      }]);
})();