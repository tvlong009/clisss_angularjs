(function () {
  angular
      .module("app", [
        "ui.router",
        "ngResource",
        'LocalStorageModule',
        'ngMessages',
        'pascalprecht.translate',
        'ngSanitize',
        'ui.bootstrap',
        'dndLists',
        'colorpicker.module',
        'ui.bootstrap.contextMenu',
        "angularFileUpload",
        "ngAnimate",
        "uiSwitch",
        "ui.select"
      ])
      .run([
        '$rootScope', 'Auth', 'Router', 'CONSTANT', '$state',
        function ($rootScope, Auth, Router, CONSTANT, $state) {
          $rootScope.$state = $state;

          $rootScope.$on('$stateChangeStart', function (event, toState) {
            if (toState.requiresAuth && !Auth.isLoggedIn()) {
              Router.toLogin();
            }
          });

          $rootScope.$on('$viewContentLoaded', function (event) {
            $.AdminLTE.layout.activate();
          });
        }])
})();

