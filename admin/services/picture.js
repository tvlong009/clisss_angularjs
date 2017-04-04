/**
 * Created by longtranvu on 3/23/17.
 */
(function () {
  angular
      .module('app')
      .factory('Picture',
          [
            'api', '$q',
            function (api, $q) {
              var service = {
                pictures: [],
                projectId:""
              };


              // Load table depend on page selecting
              service.loadPictures = function (projectId) {
                service.projectId = projectId;

                var defer = $q.defer();
                api
                    .project()
                    .pictures({id: projectId})
                    .$promise
                    .then(function (res) {
                      service.pictures = res.data;
                      defer.resolve(res.data);
                    })
                    .catch(defer.reject);

                return defer.promise;
              };


              service.getData = function () {
                return service.pictures;
              };

              return service;
            }
          ]
      );
})();