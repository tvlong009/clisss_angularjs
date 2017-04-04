/**
 * Created by GUMI-QUANG on 12/1/16.
 */
(function () {
  angular
      .module('app')
      .directive("emailExists", ['api', 'Dialog', function (api, Dialog) {
        return {
          require: "ngModel",
          link: function (scope, element, attributes, ngModel) {

            var isNotExists = true;
            ngModel.$validators.emailExists = function () {
              return isNotExists;
            };

            scope.$watch(attributes.ngModel, function (value) {
              if(ngModel.$valid){
                api
                    .v1
                    .auth()
                    .checkEmail({email:value})
                    .$promise
                    .then(function(result){
                      isNotExists = result.data;
                      ngModel.$validate();
                    })
                    .catch(function(error){
                      isNotExists = false;
                      ngModel.$validate();
                      Dialog.showAlertDialog('title.addNewUser', error.message, 'btn.ok', null);
                    });
              }else{
                isNotExists = true;
              }
            });
          }
        };
      }]);
})();