/**
 * Created by GUMI-QUANG on 6/27/16.
 */
(function () {
  angular
      .module("app")
      .controller("Page",
          [
            '$scope', 'api', 'Auth', 'Router', '$stateParams', 'Page',
            function ($scope, api, Auth, Router, $stateParams, Page) {
              var sluck = $stateParams.sluck;
              var pageSluck = $stateParams.pageSluck;
              var list = [];
              $scope.projectID = 0;
              $scope.pageID = 0;
              $scope.listDataRow = [];
              if(!Auth.isLoggedIn()){
                return Router.toLogin({sluck: sluck});
              }

              var nextPage = Page.getNextPage();

              if(nextPage && nextPage.projectName === sluck && nextPage.pageName === pageSluck){
                $scope.projectID = parseInt(nextPage.projectId);
                $scope.pageID = nextPage.pageId;
                        Page
                            .loadPage(nextPage.projectId, nextPage.pageId)
                            .then(function (res) {
                              $scope.layout = angular.fromJson(res.layout);
                              _.each($scope.layout.children,function(elementChildren){
                                  getElementInPage(elementChildren);
                              });
                              getValueForElement(list,res.ds.db);
                            })
                            .catch(function(error){
                              Router.toNotFound();
                            });

              }else{
                return  Router.toNotFound();
              }

              var getElementInPage = function(item){
                  if(Array.isArray(item.children)){
                      if(item.hasOwnProperty("type")){
                          list.push(item);
                          angular.forEach(item.children,function(value){
                              getElementInPage(value)
                          })
                      }else{
                          angular.forEach(item.children,function(value){
                              getElementInPage(value)
                          })
                      }
                  }else{
                      list.push(item);
                  }
              };

               var getValueForElement = function(listElements,dataSource){
                   _.each(listElements,function(element){
                       if(element.type === "table"){
                           $scope.dataRows = dataSource[element.data.table];
                           console.log($scope.dataRows);
                       }
                   });
               };

               var postDataToDB = function(item){
                   var keyRows = Object.keys(item.action.todoTrue.data.rows[0]);
                   _.each(keyRows,function(keyValue){
                       var tagName = "@DB" + "." + item.action.data.tableToCheck + "." + keyValue;
                       if(document.getElementsByName(tagName).length === 1){
                           var value= document.getElementsByName(tagName)[0].value;
                           $scope.valuePostDB[keyValue] = {
                               column_id : item.action.todoTrue.data.rows[0][keyValue].column_id,
                               value : value
                           }
                       }
                   });
                   $scope.valuePostDB["table_id"] = item.action.todoTrue.data.rows[0]["table_id"];
                   item.action.todoTrue.data.rows[0] = $scope.valuePostDB;
                   api
                       .createData()
                       .save({
                           projectId: $scope.projectID,
                           pageId: $scope.pageID,
                           rows: item.action.todoTrue.data.rows
                       })
                       .$promise
                       .then(function (){
                           swal("Success!", "Created Successfully", "success");
                           Page
                               .loadPage($scope.projectID, $scope.pageID)
                               .then(function (res) {
                                   _.each($scope.layout.children,function(elementChildren){
                                       getElementInPage(elementChildren);
                                   });
                                   getValueForElement(list,res.ds.db);
                               })
                               .catch(function(){
                                   Router.toNotFound();
                               });
                           if(item.action.todoTrue.afterPostData.type === "link"){
                               Page
                                   .loadPage($scope.projectID, item.action.todoTrue.afterPostData.data)
                                   .then(function (res) {
                                       $scope.layout = angular.fromJson(res.layout);
                                       _.each($scope.layout.children,function(elementChildren){
                                           getElementInPage(elementChildren);
                                       });
                                       getValueForElement(list,res.ds.db);
                                   })
                                   .catch(function(){
                                       Router.toNotFound();
                                   });
                           }
                       })
                       .catch(function(err){
                       });
               };

               var actionFlowButton = function(item){
                $scope.valueInput = {};
                $scope.valuePostDB = {};
                var rule = item.action.data.columnToCheck;
                var keyNames = Object.keys(item.action.data.columnCodition);
                _.each(keyNames,function(keyValue){
                  var tagName = "@DB" + "." + item.action.data.tableToCheck + "." + keyValue;
                  if(document.getElementsByName(tagName).length === 1){
                    var valueForKey = document.getElementsByName(tagName)[0].value;
                    $scope.valueInput[keyValue] = valueForKey;
                  }
                });
                if(jsonLogic.apply(rule, $scope.valueInput)){
                    if(item.action.todoTrue.type === "post"){
                        postDataToDB(item)
                    }
                    if(item.action.todoTrue.type === "alert"){
                        swal("Success!", item.action.todoTrue.data, "success");
                    }
                    if(item.action.todoTrue.type === "link"){
                        Page
                            .loadPage($scope.projectID, item.action.todoTrue.data)
                            .then(function (res) {
                                $scope.layout = angular.fromJson(res.layout);
                                _.each($scope.layout.children,function(elementChildren){
                                    getElementInPage(elementChildren);
                                });
                                getValueForElement(list,res.ds.db);
                            })
                            .catch(function(){
                                Router.toNotFound();
                            });
                    }
                }else{
                    if(item.action.todoFalse.type === "alert"){
                        swal("Error!", item.action.todoFalse.data, "error");
                    }
                    if(item.action.todoFalse.type === "link"){
                        Page
                            .loadPage($scope.projectID, item.action.todoFalse.data)
                            .then(function (res) {
                                $scope.layout = angular.fromJson(res.layout);
                                _.each($scope.layout.children,function(elementChildren){
                                    getElementInPage(elementChildren);
                                });
                                getValueForElement(list,res.ds.db);
                            })
                            .catch(function(){
                                Router.toNotFound();
                            });
                    }
                }
              };

              $scope.exec = function(item){
                switch(item.action.type){
                  case "logout":
                      Page
                          .signout()
                          .then(function () {
                            Router.toLogin({sluck: sluck});
                          })
                          .catch(function(error){
                            swal("Error!", angular.toJson(error), "error");
                          });
                    break;
                  case "actionFlow":
                      actionFlowButton(item);
                    break;
                  default:
                    break;
                }
              };
            }
          ]
      );
})();