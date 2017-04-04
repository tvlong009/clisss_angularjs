/**
 * Created by GUMI-QUANG on 6/24/16.
 */
(function () {
  angular
      .module("app")
      .factory("Page",
          ['api', 'Storage', 'Router', '$q', 'Auth',
            function (api, Storage, Router, $q, Auth) {

              var _projectId = "_projectId";
              var _next = "_next";

              var services = {};


              //Login to Project
              services.login = function(data){
                var defer = $q.defer();
                api
                    .auth()
                    .save(data)
                    .$promise
                    .then(function(res){
                      Auth.setUser(res.data);
                      defer.resolve(res);
                    })
                    .catch(function (error) {
                      defer.reject(error);
                    });

                return defer.promise;
              };


              // Sign out
              services.signout = function(){
                var defer = $q.defer();
                api
                    .auth()
                    .sign_out()
                    .$promise
                    .then(function(res){
                      Auth.clearAuth();
                      services.clearNextPage();
                      defer.resolve(res);
                    })
                    .catch(function (error) {
                      defer.reject(error);
                    });

                return defer.promise;
              };


              //Load Page
              services.loadPage = function(projectId, pageId){
                
                var defer = $q.defer();
                api
                    .project()
                    .get({
                      projectId: projectId,
                      pageId: pageId
                    })
                    .$promise
                    .then(function(res){
                      var data = res.data;

                      // Response layout
                      defer.resolve(data);

                    })
                    .catch(function (error) {
                      defer.reject(error);
                    });
                return defer.promise;
              };



              //Load Project
              services.loadInfo = function(sluck){
                var defer = $q.defer();
                api
                    .projectExists()
                    .get({projectName:sluck})
                    .$promise
                    .then(function(res){

                      services.setProjectId(res.data.id);

                      // Response layout
                      defer.resolve(angular.fromJson(res.data.relationships.pages.data.layout));

                    })
                    .catch(function (error) {
                      defer.reject(error);
                    });

                return defer.promise;
              };


              // Get Login page
              services.getProjectId = function(){
                return Storage.getItem(_projectId);
              };

              services.setProjectId = function(id){
                return Storage.setItem(_projectId, id);
              };


              services.getNextPage = function(){
                return Storage.getItem(_next);
              };

              services.setNextPage = function(val){
                return Storage.setItem(_next, val);
              };

              services.clearNextPage = function(){
                return Storage.removeItem(_next);
              };

              services.getItem = function(k){
                Storage.getItem(k);
              };


              services.setItem = function(k, v){
                Storage.setItem(k, v);
              };

              // Parse input node
              services.recursiveFunction =  function(collection, o){
                _.each(collection, function(model){

                  if(is.array(model.children) && model.children.length > 0){
                    services.recursiveFunction(model.children, o);
                  }else{
                    if(is.array(model)){
                      services.recursiveFunction(model, o);
                    }else{
                      if(is.object(model) && model.type === "input"){
                        o[model.model] = model.model;
                      }
                    }
                  }
                });
              };

              // Export service to the world
              return services;
            }
          ]
      );
})();