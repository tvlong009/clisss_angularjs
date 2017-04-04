/**
 * Created by GUMI-QUANG on 6/24/16.
 */
(function () {
  angular
      .module('app')
      .config([
        '$translateProvider',
        function ($translateProvider) {
          $translateProvider
              .translations('en', {
                titles: {
                  pages:"pages",
                  components: "components"
                },
                buttons:{
                  signIn:"sign in",
                  create: "create",
                  createNew: "create new",
                  update: "update",
                  delete: "delete",
                  more: "more",
                  add: "add",
                  addNew: "add new",
                  back: "back",
                  copy: "copy",
                  clear: "clear"
                },
                error: {
                  pattern: 'pattern incorrect',
                  email: 'Please input a valid email.',
                  password: 'your password must be at least 8 characters.',
                  mismatch: 'your confirm password is not match with password.',
                  require: "Please input this field"
                }
              });
        }]);
})();