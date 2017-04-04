/**
 * Created by GUMI-QUANG on 6/28/16.
 */
(function () {
  angular
      .module("app")
      .factory("Storage",
          [
            'localStorageService',
            function (localStorageService) {
              var services = {};

              /*
               * =======================
               *     CONSTANTS
               * =======================
               * */
              var _token  = "token";
              var _user   = "user";
              var _reset   = "reset";
              var _pages   = "pages";


              /*
               * =======================
               *     PRIVATE MEMBERS
               * =======================
               * */
              var setStorage = function (key, data) {
                localStorageService.set(key, angular.toJson(data));
              };

              var getStorage = function (key) {
                return angular.fromJson(localStorageService.get(key));
              };

              var removeStorage = function (key) {
                localStorageService.remove(key);
              };

              var clearStorage = function () {
                localStorageService.clearAll();
              };

              /*
               * =======================
               *     PUBLIC MEMBERS
               * =======================
               * */

              services.setItem = function (key, val) {
                setStorage(key, val);
              };

              services.getItem = function (k) {
                return getStorage(k);
              };

              services.removeItem = function (k) {
                removeStorage(k);
              };


              services.clearAll = function () {
                clearStorage();
              };


              /*=======TOKEN==========*/
              services.setToken = function (token) {
                setStorage(_token, token);
              };

              services.getToken = function () {
                return getStorage(_token);
              };

              services.removeToken = function () {
                removeStorage(_token);
              };


              /*=======USER==========*/
              services.setUser = function (user) {
                setStorage(_user, user);
              };

              services.getUser = function () {
                return getStorage(_user);
              };

              services.removeUser = function () {
                removeStorage(_user);
              };


              /*=======PAGES==========*/
              services.setPages = function (pages) {
                setStorage(_pages, pages);
              };

              services.getPages = function () {
                return getStorage(_pages);
              };

              services.removePages = function () {
                removeStorage(_pages);
              };


              /*=======RESET==========*/
              services.setReset = function () {
                setStorage(_reset, true);
              };

              services.getReset = function () {
                return getStorage(_reset);
              };

              services.removeReset = function () {
                removeStorage(_reset);
              };

              //Export to the world.
              return services;
            }
          ]
      );
})();