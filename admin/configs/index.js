/**
 * Created by GUMI-QUANG on 6/24/16.
 */
(function () {
  angular
      .module('app')
      .config([
        '$translateProvider',
        function ($translateProvider) {

          // Translate provide
          $translateProvider.preferredLanguage("en");
          $translateProvider.useSanitizeValueStrategy('sanitize');

        }])
})();