/**
 * Created by GUMI-QUANG on 11/23/16.
 */

(function () {
  angular
      .module('app')
      .factory('Auth',
          ['Storage',
            function (Storage) {
              return {
                clearAuth: function () {
                  Storage.removeToken();
                  Storage.removeUser();
                },
                setUser: function (user) {
                  Storage.setUser(user);
                },
                isLoggedIn: function () {
                  return Storage.getToken();
                }
              }
            }
          ]
      );
})();