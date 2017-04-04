/**
 * Created by GUMI-QUANG on 6/24/16.
 */
(function () {
  angular
      .module('app')
      .config([
        "localStorageServiceProvider",
        function (localStorageServiceProvider) {
          localStorageServiceProvider
              .setPrefix('clisss_client')
              .setStorageType('sessionStorage')
              .setNotify(true, true)
        }]);
})();