(function () {
  angular
      .module("app")
      .controller("DesignProjects",

          ['$scope', 'api', 'Auth', 'Router', '$stateParams', '$q', 'CONSTANT', 'InstanceTable', 'Picture',
            function ($scope, api, Auth, Router, $stateParams, $q, InstanceTable , CONSTANT, Picture) {
              $scope.isDesign = true;

              /*======================================
               *     LOAD PAGES
               * =====================================*/
              $scope.typeValue = "DB_Data";
              $scope.pictures = [];
              $scope.projectID = $stateParams.projectId;
              InstanceTable.init($scope.projectID);
              var projectId = $stateParams.projectId;
              var componentModifying = {
                list: [],
                index: "",
                value: null,
                listSelectItems: [],
                saveDB: []
              };
              $scope.nameInstables = {
                  name: '',
              };
              $scope.models = {
                pageName: {
                  name: ''
                },
                selected: null,
                templates: [
                    __clisss.Stacked,
                    __clisss.Paragraph,
                    __clisss.Label,
                    __clisss.Heading,
                    __clisss.Textarea,
                    __clisss.Input,
                    __clisss.List,
                    __clisss.Select,
                    __clisss.Table,
                    __clisss.Button,
                    __clisss.Checkbox,
                    __clisss.Radio,
                    __clisss.Image,
                    __clisss.Form
                ],
                dropzones: {
                  "children": []
                }
              };
              $scope.stackedClass = [
                'direction-row',
                'direction-row-reverse',
                'direction-column',
                'direction-column-reverse',
                'nowrap',
                'wrap',
                'wrap-reverse',
                'justify-content-start',
                'justify-content-center',
                'justify-content-space-between',
                'justify-content-space-around',
                'align-items-start',
                'align-items-end',
                'align-items-center',
                'align-items-baseline',
                'align-items-stretch',
                'align-content-start',
                'align-content-end',
                'align-content-center',
                'align-content-space-between',
                'align-content-space-around',
                'flex align-content-stretch'
              ];
              $scope.icons = ['lock', 'rocket', 'users', 'user'];
              $scope.pageSelecting = {};
              $scope.pages = [];
              $scope.roles = [];
              $scope.pageName = "";

              api
                  .projectPage()
                  .get({projectId: projectId})
                  .$promise
                  .then(function (res) {
                    $scope.pages = res.data;
                    $scope.pageSelecting = $scope.pages[0];
                    InstanceTable.loadDataInstanceTable($scope.pageSelecting.id).then(function(){
                      $scope.instanceTables = InstanceTable.data_instanceTables;
                    });
                    InstanceTable.loadTables($scope.pageSelecting.id).then(function(){
                      $scope.tables = InstanceTable.data_tables;
                    });
                    InstanceTable.loadDataOperations($scope.pageSelecting.id).then(function(){
                      $scope.operations = InstanceTable.data_operations;
                    });
                    InstanceTable.loadDataOperationsGet($scope.pageSelecting.id).then(function(){
                      $scope.operations_get = InstanceTable.data_operations_get;
                    });
                    $scope.models.dropzones = angular.fromJson($scope.pageSelecting.attributes.layout);
                    return api.project().projectRoleTypes({id: projectId}).$promise;
                  })
                  .then(function (res) {
                    $scope.roles = res.data;
                  })
                  .catch(function (error) {
                    swal("Error!", angular.toJson(error), "error");
                  });
              /*======================================
               *     ADD NEW PAGE
               * =====================================*/
              $scope.addNewPage = function() {
                if (is.empty($scope.pageName)) return;
                api
                    .projectPage()
                    .save({
                      projectId: projectId,
                      page: {
                        name: $scope.pageName,
                        sluck: $scope.pageName,
                        layout: angular.toJson({
                          children: []
                        })
                      }
                    })
                    .$promise
                    .then(function (res) {
                      $scope.pages.push(res.data);
                      $scope.pageName = "";
                    })
                    .catch(function (error) {
                      swal("Error!", angular.toJson(error), "error");
                    });
              };

              /*======================================
               *     DELETE PAGE
               * =====================================*/
              $scope.deletePage = function (page, index) {
                swal({
                  title: "Are you sure?",
                  type: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#DD6B55",
                  confirmButtonText: "OK",
                  closeOnConfirm: false,
                  html: false
                }, function () {
                  api
                      .projectPage()
                      .destroy({
                        projectId: projectId,
                        pageId: page.id
                      })
                      .$promise
                      .then(function (res) {
                        console.log(res);
                        $scope.pages.splice(index, 1);
                        swal("Successful!", "page was deleted from project", "success");
                      })
                      .catch(function (error) {
                        swal("Error!", angular.toJson(error), "error");
                      });

                });

              }


              //Join Classes Stacked
              $scope.joinClass = function (classes, checkSelected) {
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

              //Apply color picker to input if style name equal to color or background
              $scope.checkColor  = function (styleName) {
                var pattern = /\bcolor\b|\bbackground\b/;
                return pattern.test(styleName);
              };


              $scope.checkBackgroundImage = function (style, i) {
                var isBackgroundImage = style.name.indexOf("image") >= 0;
                if(isBackgroundImage){
                  if(is.empty(style.value) || is.string(style.value)) {
                    style.value = {
                      attributes: {
                        image: {
                          url: ""
                        }
                      }
                    };
                  }
                }else{
                  if(is.object( style.name)){
                    style.value = "";
                  }
                }

                return isBackgroundImage;
              };

              // Join Styles
              $scope.joinStyles = function (styles) {
                var tempStyle = {};
                _.each(styles,function(item, i){
                  if(item.name){
                    var v = "";
                    if(item.name.indexOf("image") >= 0){
                      if(is.object(item.value)){
                        v = 'url("'+ $scope.loadUrl(item.value.attributes.image.url) + '")';
                      }else{
                        v = item.value;
                      }
                    }else{
                      v = item.value;
                    }

                    tempStyle[item.name] = v;
                  }
                });
                return tempStyle;
              };

              /*======================================
               *     ADD NEW PAGE
               * =====================================*/
              $scope.selectPage = function (event, page) {
                $scope.pageSelecting = page;
                $scope.columnTableQueried = undefined;
                InstanceTable.loadDataInstanceTable($scope.pageSelecting.id).then(function(){
                  $scope.instanceTables = InstanceTable.data_instanceTables;
                });
                InstanceTable.loadDataOperations($scope.pageSelecting.id).then(function(){
                  $scope.operations = InstanceTable.data_operations;
                });
                InstanceTable.loadDataOperationsGet($scope.pageSelecting.id).then(function(){
                  $scope.operations_get = InstanceTable.data_operations_get;
                });
                $scope.models.dropzones = angular.fromJson($scope.pageSelecting.attributes.layout);
              };


              /*======================================
               *     UPDATING LAYOUT EVERY CHANGING
               * =====================================*/
              $scope.$watch('models.dropzones', function (model) {
                if (is.empty($scope.pageSelecting)) return;

                $scope.pageSelecting.attributes.layout = angular.toJson({
                  children: model.children
                });

              }, true);


              /*======================================
               *     UPDATE CHANGING
               * =====================================*/
              $scope.updateDB = function () {
                if (is.empty($scope.pageSelecting)) return;
                var listProject = [];
                _.each($scope.pages, function (value) {
                  listProject.push(
                      api
                          .projectPage()
                          .update({
                                projectId: projectId,
                                pageId: value.id
                              },
                              value.attributes)
                          .$promise
                  )
                });

                $q
                    .all(listProject)
                    .then(function (res) {
                      swal("Successful!", "Project was updated", "success");
                    })
                    .catch(function (error) {
                      swal("Error!", angular.fromJson(error), "error");
                    })
              };

              /*===============================================
               *  Select multi components with shift key
               * =============================================*/
              $scope.setItemWithKey = function (itemFromUI, $event) {
                var countExist = 1;

                if (!$event.shiftKey) {
                  componentModifying.listSelectItems = [];
                  componentModifying.listSelectItems.push(itemFromUI);
                }

                if ($event.shiftKey) {
                  // If the item is exists then remove it like toggle select
                  _.each(componentModifying.listSelectItems, function (value, index) {
                    if (value.$$hashKey === itemFromUI.$$hashKey) {
                      countExist = 0;
                      componentModifying.listSelectItems[index] = null;
                    }
                  });

                  // Remove null item from list
                  componentModifying.listSelectItems = _.compact(componentModifying.listSelectItems);
                  if (countExist == 1) {
                    componentModifying.listSelectItems.push(itemFromUI);
                  }
                }

              };


              var copyHtml = '<div class="text-info" style="cursor: pointer;margin-left: 5px;">' +
                  '<h4><i class="fa fa-files-o" aria-hidden="true"></i> Copy</h4></div>';
              var copyItem = {
                html: copyHtml,
                enabled: function () {
                  return true
                },
                click: function () {

                  var isCurrentItem = false;
                  _.each(componentModifying.listSelectItems, function (item) {
                    if (item.$$hashKey == componentModifying.value.$$hashKey) {
                      isCurrentItem = true;
                    }
                  });

                  if (isCurrentItem) {
                    componentModifying.saveDB = angular.copy(componentModifying.listSelectItems);
                    componentModifying.listSelectItems = [];
                  } else {
                    componentModifying.listSelectItems = [];
                    componentModifying.listSelectItems.push(componentModifying.value);
                    componentModifying.saveDB = angular.copy(componentModifying.listSelectItems);
                    componentModifying.listSelectItems = []
                  }

                }
              };

              var pasteDisableHtml = '<div style="cursor: no-drop;margin-left: 5px;color: #777777">' +
                  '<h4><i class="fa fa fa-clipboard" aria-hidden="true"></i> Paste</h4></div>';
              var pasteDisableItem = {
                html: pasteDisableHtml,
                enabled: function () {
                  return true
                },
                click: function () {
                  return false
                }
              };
              var pasteHtml = '<div class="text-success" style="cursor: pointer;margin-left: 5px;">' +
                  '<h4><i class="fa fa fa-clipboard" aria-hidden="true"></i> Paste</h4></div>';
              var pasteItem = {
                html: pasteHtml,
                enabled: function () {
                  return true
                },
                click: function () {
                  _.each(componentModifying.saveDB, function (valueArr) {
                    if (componentModifying.value.type === "stacked") {
                      componentModifying.value.children[0].children.push(valueArr);
                    } else {
                      componentModifying.list.push(valueArr);
                    }
                  });
                }
              };


              var deleteHtml = '<div class="text-danger" style="cursor: pointer;margin-left: 5px;">' +
                  '<h4><i class="fa fa-minus-square" aria-hidden="true"></i> Delete</h4></div>';
              var deleteItem = {
                html: deleteHtml,
                enabled: function () {
                  return true
                },
                click: function () {
                  componentModifying.list.splice(componentModifying.index, 1);
                }
              };


              /*===============================================
               *  Right click options
               * =============================================*/
              $scope.menuOptions = function (listFromUI, indexFromUI, valueFromUI) {

                // Keep scope list
                componentModifying.list = listFromUI;

                // Index of item in scope
                componentModifying.index = indexFromUI;

                // Current item in scope
                componentModifying.value = valueFromUI;

                return [
                  copyItem,
                  componentModifying.saveDB.length > 0 ? pasteItem : pasteDisableItem,
                  null,
                  deleteItem
                ]
              };

              //Load list tables when click add table button
              $scope.loadTables = function(){
                  api
                      .project()
                      .tables({id: projectId})
                      .$promise
                      .then(function(res){
                        $scope.designPage_tables = res.data
                      })
                      .catch(function(error){
                        swal("Error!", angular.toJson(error), "error");
                      });
              };

              //Load table when click table button
              $scope.getTable = function(table){
                $scope.table = table;
                $scope.nameInstables = {
                  name: ''
                };
                if(table.type === "table_instances"){
                  api
                      .project()
                      .loadColumnInstanceTables({
                        id: projectId,
                        page_id: $scope.pageSelecting.id,
                        instanceTableId : table.id
                      })
                      .$promise
                      .then(function(res){
                        $scope.designPage_columns = res.included;
                      })
                      .catch(function(error){
                      });
                } else{
                  api
                      .project()
                      .columns({
                        id: projectId,
                        tableID: $scope.table.id
                      })
                      .$promise
                      .then(function(res){
                        $scope.designPage_columns = res.data;
                      })
                      .catch(function(error){
                      });
                }
              };

              $scope.deleteSelectedInstanceTable = function(){
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
                      .deleteInstanceTable({
                        id: projectId,
                        page_id: $scope.pageSelecting.id,
                        instanceTableId :  $scope.currentInstanceTable.id
                      })
                      .$promise
                      .then(function(){
                        $scope.instanceTables[$scope.instanceTableIndex] = null;
                        $scope.instanceTables = _.compact($scope.instanceTables);
                        $scope.designPage_columnInstanceTables = [];
                        $scope.currentInstanceTable = undefined;
                        $scope.instanceTableIndex = undefined;
                        swal("Success!", "Successfully deleted table", "success");
                      })
                      .catch(function(error){
                      });
                });
              };

              $scope.loadColumnFromInstanceTable = function(instanceTableID,index){
                $scope.instanceTableIndex = index;
                api
                    .project()
                    .loadColumnInstanceTables({
                      id: projectId,
                      page_id: $scope.pageSelecting.id,
                      instanceTableId : instanceTableID
                    })
                    .$promise
                    .then(function(res){
                      $scope.currentInstanceTable = res.data;
                      $scope.designPage_columnInstanceTables = res.included;
                    })
                    .catch(function(error){
                    });
              };
              /*===============================================
               *  Picture select
               * =============================================*/
              Picture
                  .loadPictures(projectId)
                  .then(function(data){
                    $scope.pictures = data;
                  })
                  .catch(function(error){
                    swal("Error!", angular.toJson(error), "error");
                  });


              $scope.loadUrl = function(url){
                return CONSTANT.API + url;
              };

              $scope.setDataModel = function(model){
                model.model = model.content;
              };

              /*======================================
               *     HAS ROLE
               * =====================================*/
              $scope.hasRole = function(role, privacy){
                return _.find(privacy, function(roleId){ return roleId == role.id;});
              };


              /*======================================
               *     ADD ROLE
               * =====================================*/
              $scope.addRole = function(role, privacy){
                privacy.push(role.id);
              };

              /*======================================
               *     REMOVE ROLE
               * =====================================*/
              $scope.removeRole = function(role, privacy){
                var privacyIndex =  _.findIndex(privacy, function(roleId){ return roleId == role.id;});
                if(privacyIndex >= 0){
                  privacy.splice(privacyIndex, 1);
                }
              };

              $scope.testModel = function(){
                console.log($scope.models.selected);
              }
            }
          ]
      );
})();