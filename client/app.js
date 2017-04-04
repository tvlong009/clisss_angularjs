(function () {
  angular
      .module("app", [
        "ui.router",
        "ngResource",
        'LocalStorageModule',
        'ngMessages',
        'pascalprecht.translate',
        'ngSanitize',
        'ui.bootstrap'
      ])
      .run([
        '$rootScope', 'Auth', 'Router', 'api', '$state', 'CONSTANT',
        function ($rootScope, Auth, Router, api, $state, CONSTANT) {
          $rootScope.$state = $state;

          $rootScope.$on('$viewContentLoaded', function (event) {
            $.AdminLTE.layout.activate();
          });

          $rootScope.loadUrl = function(url){
            return CONSTANT.API + url;
          };

          //Join Classes Stacked
          $rootScope.joinClass = function (classes, checkSelected) {
            var tempClass= {};
            _.each(classes,function(item, i){
              if(item.name && item.value){
                tempClass[item.name] = item.value;
              }
              if(item.name === 'selected'){
                tempClass[item.name] = checkSelected;
              }
            });
            return tempClass;
          };

          // Join Styles
          $rootScope.joinStyles = function (styles) {
            var tempStyle = {};
            _.each(styles,function(item, i){
              if(item.name){
                var v = "";
                if(item.name.indexOf("image") >= 0){
                  if(item.value){
                    v = 'url("'+ $rootScope.loadUrl(item.value.attributes.image.url) + '")';
                  }
                }else{
                  v = item.value;
                }

                tempStyle[item.name] = v;
              }
            });
            return tempStyle;
          };
        }])
})();

