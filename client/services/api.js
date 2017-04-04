/**
 * Created by GUMI-QUANG on 6/24/16.
 */
(function () {
  angular
      .module('app')
      .factory('api',
          [
            '$resource', 'CONSTANT',
            function ($resource, CONSTANT) {
              return {
                auth: function () {
                  return $resource(CONSTANT.API + "/user/auth/sign_in", {}, {
                    sign_out: {
                      method: "DELETE",
                      url: CONSTANT.API + "/user/auth/sign_out"
                    }
                  });
                },
                project:function(){
                  return $resource(CONSTANT.API + "/api/v1/user/projects/:projectId/pages/:pageId", {
                    projectId: "@projectId",
                    pageId: "@pageId"
                  },{
                    destroy: {
                      method: "DELETE"
                    },
                    update: {
                      method: "PUT"
                    }
                  });
                },
                createData:function(){
                  return $resource(CONSTANT.API + "/api/v1/user/projects/:projectId/pages/:pageId/create_or_update", {
                    projectId: "@projectId",
                    pageId: "@pageId"
                  });
                },
                projectExists:function(){
                  return $resource(CONSTANT.API + "/api/v1/user/projects/:projectName", {
                    projectName: "@projectName"
                  });
                }
              }
            }
          ]
      );
})();