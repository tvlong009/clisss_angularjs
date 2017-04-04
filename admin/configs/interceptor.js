/**
 * Created by GUMI-QUANG on 6/24/16.
 */
(function () {
  angular
      .module('app')
      .config([
        '$provide', '$httpProvider',
        function ($provide, $httpProvider) {
          // Intercept http calls.
          $provide.factory('HttpInterceptor',
              function ($q, dataStorage) {
                return {
                  // On request success
                  request: function (config) {
                    var token = dataStorage.getToken();
                    if(token){
                      config.headers["access-token"] = token['access-token'];
                      config.headers["client"] = token['client'];
                      config.headers["uid"] = token['uid'];
                    }
                    return config || $q.when(config);
                  },
                  response: function(response) {

                    // Update token for every request successful
                    var headers = response.headers();
                    if(headers["access-token"]){
                      dataStorage.setToken(headers);
                    }
                    return response;
                  }
                };
              });

          // Add the interceptor to the $httpProvider.
          $httpProvider.interceptors.push('HttpInterceptor');
        }])
})();