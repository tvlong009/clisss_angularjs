/**
 * Created by GUMI-QUANG on 11/23/16.
 */

(function () {
  angular
      .module('app')
      .factory('Upload',
          [
            'dataStorage', 'FileUploader',
            function (dataStorage, FileUploader) {
              return {
                init: function (url, isUpdate) {
                  var method = isUpdate ? "PUT" : "POST";
                  var token = dataStorage.getToken();

                  return new FileUploader({
                    alias: 'image_data',
                    url: url,
                    method: method,
                    autoUpload: false,
                    headers: {
                      "access-token" : token['access-token'],
                      "client" : token['client'],
                      "uid" : token['uid']
                    }
                  });
                }
              }
            }
          ]
      );
})();