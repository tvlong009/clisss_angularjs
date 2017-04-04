/**
 * Created by GUMI-QUANG on 12/1/16.
 */
(function () {
  angular
      .module('app')
      .directive('resizer', ['$document', function ($document) {

        return function ($scope, $element, $attrs) {
          var resizerWidth = $attrs.resizerWidth || $attrs.resizerHeight;
          var resizerHalfWidth = resizerWidth/2;

          $element.on('mousedown', function (event) {
            event.preventDefault();
            event.stopPropagation();

            $document.on('mousemove', mousemove);
            $document.on('mouseup', mouseup);
          });



          function mousemove(event) {

            if ($attrs.resizer == 'vertical') {

              $resizeLeft = angular.element($attrs.resizerLeft);
              $resizeRight = angular.element($attrs.resizerRight);



              var lastWidthLeft = $resizeLeft.width();
              var currentWidthLeft = event.pageX - $resizeLeft.offset().left - resizerHalfWidth;
              var spacing = Math.floor(lastWidthLeft - currentWidthLeft);

              if(currentWidthLeft <= 0 || ($resizeRight.width() < resizerHalfWidth && spacing < 0)) return;

              $resizeLeft.width(currentWidthLeft);
              $resizeRight.width($resizeRight.width() + spacing);

            } else {

              $resizeTop = angular.element($attrs.resizerTop);
              $resizeBottom = angular.element($attrs.resizerBottom);

              var lastHeightTop = $resizeTop.height();
              var currentHeightTop = event.pageY - $resizeTop.offset().top - resizerHalfWidth;
              var spacing = Math.floor(lastHeightTop - currentHeightTop);

              if(currentHeightTop <= 0 || ($resizeBottom.height() < resizerHalfWidth && spacing < 0)) return;

              $resizeTop.height(currentHeightTop);
              $resizeBottom.height($resizeBottom.height() + spacing);
            }
          }

          function mouseup() {
            $document.unbind('mousemove', mousemove);
            $document.unbind('mouseup', mouseup);
          }
        };
      }]);
})();