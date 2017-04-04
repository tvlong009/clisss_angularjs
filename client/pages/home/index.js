/**
 * Created by GUMI-QUANG on 6/27/16.
 */
(function () {
  angular
      .module("app")
      .controller("Home",
          [
            '$scope', '$stateParams', 'Auth', 'Router', 'Page',
            function ($scope, $stateParams, Auth, Router, Page) {
              var sluck = $stateParams.sluck;
              if(!Auth.isLoggedIn()){
                Router.toLogin({sluck: sluck});
              }else{
                
                var nextPage = Page.getNextPage();
                
                if(nextPage){
                  Router.toPage({
                    sluck: nextPage.projectName,
                    pageSluck: nextPage.pageName
                  });
                }else{
                  Router.toLogin({sluck: sluck});
                }
              }
            }
          ]
      );
})();