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
                  return $resource(CONSTANT.API + "/admin/auth/sign_in", {}, {
                    sign_out: {
                      method: "DELETE",
                      url: CONSTANT.API + "/admin/auth/sign_out"
                    }
                  });
                },
                projectPage: function(){
                  return $resource(CONSTANT.API + "/api/v1/admin/projects/:projectId/pages/:pageId", {
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
                projectOperation: function(){
                  return $resource(CONSTANT.API + "/api/v1/admin/projects/:project_id/pages/:page_id/operations/:id", {
                    project_id: "@project_id",
                    page_id: "@page_id",
                    id: "@id"
                  },{
                    destroy: {
                      method: "DELETE"
                    },
                    update: {
                      method: "PUT"
                    }
                  });
                },
                project:function(){
                  return $resource(CONSTANT.API + "/api/v1/admin/projects/:id", {
                    id: "@id"
                  },{
                    destroy: {
                      method: "DELETE"
                    },
                    update: {
                      method: "PUT"
                    },
                    tables : {
                      method : "GET",
                      url:CONSTANT.API + "/api/v1/admin/projects/:id/tables"
                    },
                    addTables : {
                      method : "POST",
                      url:CONSTANT.API + "/api/v1/admin/projects/:id/tables"
                    },
                    getTable : {
                      params: {
                        tableID: "@tableID",
                      },
                      method : "GET",
                      url:CONSTANT.API + "/api/v1/admin/projects/:id/tables/:tableID"
                    },
                    updateTable : {
                      params: {
                        tableID: "@tableID",
                      },
                      method : "PUT",
                      url:CONSTANT.API + "/api/v1/admin/projects/:id/tables/:tableID"
                    },
                    deleteTable : {
                      params: {
                        tableID: "@tableID",
                      },
                      method : "DELETE",
                      url:CONSTANT.API + "/api/v1/admin/projects/:id/tables/:tableID"
                    },
                    loadColumnTable : {
                      params: {
                        tableID: "@tableID",
                      },
                      method : "GET",
                      url:CONSTANT.API + "/api/v1/admin/projects/:id/tables/:tableID/columns"
                    },
                    loadLocalVars : {
                      params: {
                        page_id: "@page_id"
                      },
                      method: "GET",
                      url:CONSTANT.API + "/api/v1/admin/projects/:id/pages/:page_id/local_variables"
                    },
                    addInstanceTables : {
                      params: {
                        page_id: "@page_id",
                      },
                      method : "POST",
                      url:CONSTANT.API + "/api/v1/admin/projects/:id/pages/:page_id/table_instances"
                    },
                    loadInstanceTables : {
                      params: {
                        page_id: "@page_id",
                      },
                      method : "GET",
                      url:CONSTANT.API + "/api/v1/admin/projects/:id/pages/:page_id/table_instances"
                    },
                    updateInstanceTable : {
                      params: {
                        page_id: "@page_id",
                        instanceTableId : "@instanceTableId"
                      },
                      method : "PUT",
                      url:CONSTANT.API + "/api/v1/admin/projects/:id/pages/:page_id/table_instances/:instanceTableId"
                    },
                    deleteInstanceTable : {
                      params: {
                        page_id: "@page_id",
                        instanceTableId : "@instanceTableId"
                      },
                      method : "DELETE",
                      url:CONSTANT.API + "/api/v1/admin/projects/:id/pages/:page_id/table_instances/:instanceTableId"
                    },
                    loadColumnInstanceTables : {
                      params: {
                        page_id: "@page_id",
                        instanceTableId : "@instanceTableId"
                      },
                      method : "GET",
                      url:CONSTANT.API + "/api/v1/admin/projects/:id/pages/:page_id/table_instances/:instanceTableId"
                    },
                    columns : {
                      params: {
                        tableID: "@tableID"
                      },
                      method : "GET",
                      url:CONSTANT.API + "/api/v1/admin/projects/:id/tables/:tableID/columns"
                    },
                    getColumn : {
                      params: {
                        tableID: "@tableID",
                        columnID : "@columnID"
                      },
                      method : "GET",
                      url:CONSTANT.API + "/api/v1/admin/projects/:id/tables/:tableID/columns/:columnID"
                    },
                    addColumn : {
                      params: {
                        tableID: "@tableID"
                      },
                      method : "POST",
                      url:CONSTANT.API + "/api/v1/admin/projects/:id/tables/:tableID/columns"
                    },
                    deleteColumn : {
                      params: {
                        tableID: "@tableID",
                        columnID : "@columnID"
                      },
                      method : "DELETE",
                      url:CONSTANT.API + "/api/v1/admin/projects/:id/tables/:tableID/columns/:columnID"
                    },
                    updateColumn : {
                      params: {
                        tableID: "@tableID",
                        columnID : "@columnID"
                      },
                      method : "PUT",
                      url:CONSTANT.API + "/api/v1/admin/projects/:id/tables/:tableID/columns/:columnID"
                    },
                    pictures: {
                      method: "GET",
                      url:CONSTANT.API + "/api/v1/admin/projects/:id/pictures"
                    },
                    destroyPictures: {
                      params: {
                        pictureId: "@pictureId"
                      },
                      method: "DELETE",
                      url:CONSTANT.API + "/api/v1/admin/projects/:id/pictures/:pictureId"
                    },
                    createRole: {
                      method: "POST",
                      url:CONSTANT.API + "/api/v1/admin/projects/:id/role_types/creates"
                    },
                    projectRoles: {
                      method: "GET",
                      url: CONSTANT.API + "/api/v1/admin/projects/:id/roles"
                    },
                    projectRoleTypes: {
                      method: "GET",
                      url: CONSTANT.API + "/api/v1/admin/projects/:id/role_types"
                    },
                    userRole: {
                      method: "GET",
                      url: CONSTANT.API + "/api/v1/admin/projects/:id/users"
                    },
                    addUserRole: {
                      method: "POST",
                      url: CONSTANT.API + "/api/v1/admin/projects/:id/roles/create_multiple"
                    },
                    deleteUserRole: {
                      params: {
                        roleId: "@roleId"
                      },
                      method: "DELETE",
                      url: CONSTANT.API + "/api/v1/admin/projects/:id/roles/:roleId"
                    },
                    deleteRole: {
                      params: {
                        roleId: "@roleId"
                      },
                      method: "DELETE",
                      url:CONSTANT.API + "/api/v1/admin/projects/:id/role_types/:roleId"
                    },
                    userInRoleType: {
                      params: {
                        roleId: "@roleId"
                      },
                      method: "GET",
                      url:CONSTANT.API + "/api/v1/admin/projects/:id/role_types/:roleId/users"
                    }
                  });
                },
                client:function(){
                  return $resource(CONSTANT.API + "/api/v1/admin/clients/:id", {
                    id: "@id"
                  },{
                    destroy: {
                      method: "DELETE"
                    },
                    update: {
                      method: "PUT"
                    }
                  });
                },
                user:function(){
                  return $resource(CONSTANT.API + "/api/v1/admin/users/:id", {
                    id: "@id"
                  },{
                    destroy: {
                      method: "DELETE"
                    },
                    update: {
                      method: "PUT"
                    }
                  });
                }
              }
            }
          ]
      );
})();