/**
 * Created by GUMI-QUANG on 6/28/16.
 * reference: http://t4t5.github.io/sweetalert/
 */
(function () {
  angular
      .module("app")
      .factory("Dialog",
          ['$q', '$translate', '$uibModal',
            function ($q, $translate, $uibModal) {
              // var defaultParams = {
              //   title: '',
              //   text: '',
              //   type: null,
              //   allowOutsideClick: false,
              //   showConfirmButton: true,
              //   showCancelButton: false,
              //   closeOnConfirm: true,
              //   closeOnCancel: true,
              //   confirmButtonText: 'OK',
              //   confirmButtonColor: '#8CD4F5',
              //   cancelButtonText: 'Cancel',
              //   imageUrl: null,
              //   imageSize: null,
              //   timer: null,
              //   customClass: '',
              //   html: false,
              //   animation: true,
              //   allowEscapeKey: true,
              //   inputType: 'text',
              //   inputPlaceholder: '',
              //   inputValue: '',
              //   showLoaderOnConfirm: false
              // };

              var services = {
                TYPE: {
                  WARNING: "warning",
                  ERROR: "error",
                  SUCCESS: "success",
                  INFO: "info",
                  INPUT: "input",
                },
                ANIMATION: {
                  DEFAULT: false,
                  FROM_TOP: "slide-from-top",
                  FROM_BOTTOM: "slide-from-bottom",
                }
              };


              /*==================================================
               *       SHOW DIALOG
               * ==================================================*/
              var showDialog = function (options) {
                var deferred = $q.defer();
                $translate([
                  options.title,
                  options.text,
                  options.confirmButtonText,
                  options.cancelButtonText,
                  options.inputPlaceholder,
                  options.inputValue
                ])
                    .then(function (translations) {

                      // Replace content that have already changed
                      options.title = translations[options.title];
                      options.text = translations[options.text];
                      options.confirmButtonText = translations[options.confirmButtonText];
                      options.cancelButtonText = translations[options.cancelButtonText];
                      options.inputPlaceholder = translations[options.inputPlaceholder];
                      options.inputValue = translations[options.inputValue];

                      // Show dialog
                      swal(options, deferred.resolve);
                    })
                    .catch(deferred.reject);

                return deferred.promise;
              };



              /*==================================================
               *       SHOW INPUT ERROR
               * ==================================================*/
              services.showInputError = function (message) {
                $translate([message])
                    .then(function (translations) {
                      // Show error inside the last dialog
                      swal.showInputError(translations[message]);
                    })
                    .catch(function (error) {
                      console.log(error);
                    });
              };


              /*
               Dialog
                 .confirm({
                   title:"Nhap",
                   text:"are you sure?",
                   type: Dialog.TYPE.INPUT,
                   animation: Dialog.ANIMATION.FROM_BOTTOM,
                   inputPlaceholder:"vui long nhap du lieu"
                 })
                 .then(function(value){
                   Dialog.showInputError(value)
                 })
                 .catch(function () {
                   console.log(arguments);
                 })
              * */
              /*==================================================
               *       SHOW CONFIRM DIALOG
               * ==================================================*/
              services.confirm = function (options) {
                options.showLoaderOnConfirm = true;
                options.showCancelButton = true;
                options.closeOnConfirm = false;
                return showDialog(options);
              };



              /*
               Dialog
                 .alert({
                   title:"Info",
                   text:"are you sure?",
                   type: Dialog.TYPE.INFO,
                   animation: Dialog.ANIMATION.FROM_BOTTOM
                 })
                 .then(function(value){
                   console.log(value);
                 })
                 .catch(function () {
                   console.log(arguments);
                 })
               * */
              /*==================================================
               *       SHOW ALERT DIALOG
               * ==================================================*/
              services.alert = function (options) {
                return showDialog(options);
              };


              //Export to the world.
              return services;
            }
          ]
      );
})();