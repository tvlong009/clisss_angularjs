/**
 * Created by GUMI-QUANG on 6/24/16.
 */
(function () {
  angular
      .module('app')
      .factory('util',
          [
            function () {
              return {
                getUrlVars: function(url) {
                    var urlDecode = decodeURI(url)
                    var vars = [], hash;
                    var hashes = urlDecode.slice(urlDecode.indexOf('?') + 1).split('&');
                    for(var i = 0; i < hashes.length; i++)
                    {
                        hash = hashes[i].split('=');
                        vars.push(hash[0]);
                        vars[hash[0]] = hash[1];
                    }
                    return vars;    
                }
              }
            }
          ]
      );
})();