/**
 * Created by longtranvu on 3/23/17.
 */
(function () {
  angular
      .module('app')
      .factory('InstanceTable',
          [
            'api', '$q',
            function (api, $q) {
              var service = {
                projectId: "",
                data_instanceTables: [],
                data_operations: [],
                data_operations_get: [],
                data_column: [],
                data_tables: [],
                fields: []
              };

              // Init service
              service.init = function (projectId) {
                service.projectId = projectId;
                service.fields = [];
              };


              // Load table depend on page selecting
              service.loadDataInstanceTable = function (pageId) {
                var defer = $q.defer();
                api
                    .project()
                    .loadInstanceTables({
                      id: service.projectId,
                      page_id: pageId
                    })
                    .$promise
                    .then(function (res) {
                      service.data_instanceTables = res.data;
                      defer.resolve();
                    })
                    .catch(defer.reject);

                return defer.promise;
              };


              service.loadDataOperations = function (pageId) {
                var defer = $q.defer();
                api
                    .projectOperation()
                    .get({
                      project_id: service.projectId,
                      page_id: pageId,
                      stage: "init"
                    })
                    .$promise
                    .then(function (res) {
                      // _.each(res.data, function (operation, index) {
                      //   if(operation.attributes.operation_type === 'processing'){
                      //     res.data[index] = null;
                      //     res.data = _.compact(res.data);
                      //   }
                      // });
                      service.data_operations = res.data;
                      defer.resolve();
                    })
                    .catch(defer.reject);

                return defer.promise;
              };

              service.loadDataOperationsGet = function (pageId) {
                var defer = $q.defer();
                api
                    .projectOperation()
                    .get({
                      project_id: service.projectId,
                      page_id: pageId,
                      stage: "init"
                    })
                    .$promise
                    .then(function (res) {
                      _.each(res.data, function (operation, index) {
                        if(operation.attributes.operation_type === 'processing'){
                          res.data[index] = null;
                          res.data = _.compact(res.data);
                        }
                      });
                      service.data_operations_get = res.data;
                      defer.resolve();
                    })
                    .catch(defer.reject);

                return defer.promise;
              };

              //load column from instance table
              service.loadColumnInstanceTable = function (pageId, table) {
                var defer = $q.defer();
                api
                    .project()
                    .loadColumnInstanceTables({
                      id: service.projectId,
                      page_id: pageId,
                      instanceTableId: table.id
                    })
                    .$promise
                    .then(function (res) {
                      service.data_column = res.included;
                      defer.resolve();
                    })
                    .catch(defer.reject);

                return defer.promise;
              };

              service.loadColumnTable = function (pageId,table) {
                var defer = $q.defer();
                api
                    .project()
                    .loadColumnTable({
                      id: service.projectId,
                      page_id: pageId,
                      tableID : table.id
                    })
                    .$promise
                    .then(function (res) {
                      service.data_column = res.data;
                      defer.resolve(res.data);
                    })
                    .catch(defer.reject);

                return defer.promise;
              };

              service.loadTables = function () {
                var defer = $q.defer();
                api
                    .project()
                    .tables({
                      id: service.projectId
                    })
                    .$promise
                    .then(function (res) {
                      service.data_tables = res.data;
                      defer.resolve();
                    })
                    .catch(defer.reject);

                return defer.promise;
              };

              return service;
            }
          ]
      );
})();