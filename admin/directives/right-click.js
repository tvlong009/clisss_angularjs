/**
 * Created by GUMI-QUANG on 12/1/16.
 */
(function () {
  angular
      .module('app')
      .directive('dndRightSelected', ['$document','$parse', function ($document,$parse) {

          return function ($scope, $element, $attrs) {
              $element.on('contextmenu', function(event) {
                  if (!$attrs.dndRightSelected) return;

                  event = event.originalEvent || event;
                  $scope.$apply(function() {
                      $parse($attrs.dndRightSelected)($scope, {event: event});
                  });

                  // Prevent triggering dndSelected in parent elements.
                  event.stopPropagation();
              });
          };
      }])
})();