/**
 * Created by GUMI-QUANG on 6/27/16.
 */
(function () {
  angular
      .module("app")
      .controller("UploadProjects",
          [
            '$scope', 'api', 'Auth', 'Router', 'Upload', 'CONSTANT', '$stateParams',
            function ($scope, api, Auth, Router, Upload, CONSTANT, $stateParams) {

              /*====================================================
               *             INIT SCOPE
               *====================================================*/
              $scope.pictures = [];
              var id = $stateParams.id;
              var uploader = $scope.uploader = Upload.init(CONSTANT.API + "/api/v1/admin/projects/" + id + "/pictures");

              /*====================================================
               *             GET PHOTOS
               *====================================================*/
              var pictures = function () {
                api
                    .project()
                    .pictures({id: id})
                    .$promise
                    .then(function(res){
                      $scope.pictures = res.data;
                    })
                    .catch(function(error){
                      swal("Error!", angular.toJson(error), "error");
                    });
              };


              /*====================================================
               *             FILTER PHOTO TYPE
               *====================================================*/
              uploader.filters.push({
                name: 'imageFilter',
                fn: function(item /*{File|FileLikeObject}*/, options) {
                  var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                  return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
                }
              });

              // CALLBACKS
              uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
                console.info('onWhenAddingFileFailed', item, filter, options);
              };
              uploader.onBeforeUploadItem = function(item) {
                item.formData.push({name: item.file.name});
                console.info('onBeforeUploadItem', item);
              };
              uploader.onErrorItem = function(fileItem, response, status, headers) {
                console.info('onErrorItem', fileItem, response, status, headers);
              };
              uploader.onCompleteAll = function() {
                console.info('onCompleteAll');
                pictures();
              };



              /*====================================================
               *            DELETE PICTURE
               *====================================================*/
              /*======================================
               *     DELETE ITEM
               * =====================================*/
              $scope.deleteItem = function(picture, index){
                swal({
                  title: "Are you sure?",
                  type: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#DD6B55",
                  confirmButtonText: "OK",
                  closeOnConfirm: false,
                  html: false
                }, function(){
                  api
                      .project()
                      .destroyPictures({
                        id: id,
                        pictureId: picture.id
                      })
                      .$promise
                      .then(function(res){
                        console.log(res);
                        swal("Successful!", "the image was deleted from system",  "success");
                        $scope.pictures.splice(index,1);
                      })
                      .catch(function(error){
                        swal("Error!", angular.toJson(error), "error");
                      })

                });
              };



              /*====================================================
               *            SHOW URL
               *====================================================*/
              $scope.loadUrl = function(url){
                return CONSTANT.API + url;
              };


              /*====================================================
               *            LOAD PHOTOS
               *====================================================*/
              pictures();

            }
          ]
      );
})();