/**
 * Created by GUMI-QUANG on 6/24/16.
 */
(function () {
  angular
      .module('app')
      .constant("CONSTANT", {
        "API": "http://localhost:3000",
        // CLIENT_SITE:"http://dev.gumiviet.com:8080/public/#!"
        CLIENT_SITE:"http://localhost:8080",
        HTML5:true
      });
})();
