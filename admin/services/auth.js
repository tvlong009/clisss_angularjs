/**
 * Created by GUMI-QUANG on 11/23/16.
 */

(function () {
  angular
      .module('app')
      .factory('Auth',
          [
            'dataStorage',
            function (dataStorage) {
              return {
                clearUser: function () {
                  dataStorage.removeUser();
                  dataStorage.removeToken();
                },
                setUser: function (user) {
                  dataStorage.setUser(user);
                  dataStorage.setToken(user.token);
                },
                isLoggedIn: function () {
                  return dataStorage.getUser();
                },
                setSentMailResetPassword: function(){
                  dataStorage.setReset();
                },
                clearSentMailResetPassword: function(){
                  dataStorage.removeReset();
                },
                isSentMailResetPassword: function(){
                  return dataStorage.getReset();
                }
              }
            }
          ]
      );
})();