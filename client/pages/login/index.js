/**
 * Created by GUMI-QUANG on 6/27/16.
 */
(function () {
  angular
      .module("app")
      .controller("Login",
          [
            '$scope', 'api', 'Auth', 'Router', '$stateParams', 'Page',
            function ($scope, api, Auth, Router, $stateParams, Page) {
              var sluck = $stateParams.sluck;


              // Load login page
              Page
                  .loadInfo(sluck)
                  .then(function(layout){
                    $scope.layout = layout;
                  })
                  .catch(function(error){
                    console.log(error);
                    Router.toNotFound();
                  });


              // Button login
              $scope.exec = function(item){
                var o = {};
                Page.recursiveFunction($scope.layout.children, o);
                // console.log(o);
                // console.log(item);

                $scope.user = {};
                _.each(o, function(inputModel){
                  var fieldName = inputModel.split(".").pop();
                  $scope.user[fieldName] = document.getElementsByName(inputModel)[0].value
                });


                if(item.action.type == "login"){
                  if(item.action.todoTrue.type === "alert"){
                    swal("Success!", item.action.todoTrue.data, "success");
                  }
                  if(item.action.todoTrue.type === "link"){
                    var pageId = item.action.todoTrue.data;
                    var projectId = Page.getProjectId();


                    Page
                        .login($scope.user)
                        .then(function(res){

                          // Get page data
                          return Page.loadPage(projectId, pageId);
                        })
                        .then(function (pageData) {

                          // Keep next page to home controller know next page
                          Page.setNextPage({
                            projectName: sluck,
                            projectId: projectId,
                            pageId: pageId,
                            pageName: pageData.sluck
                          });

                          Router.toPage({
                            sluck: sluck,
                            pageSluck: pageData.sluck
                          });
                        })
                        .catch(function (error) {
                          console.log(error);
                        });
                  }

                }


              };

            }
          ]
      );
})();