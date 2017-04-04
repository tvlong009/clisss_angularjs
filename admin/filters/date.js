/**
 * Created by ThanhQuangNgocTuong on 12/6/16.
 */
(function(){
  angular
      .module("app")
      .filter('moment', [function(){
        return function(theDate, format){
          var newDate = undefined;
          if(theDate){
            newDate = moment(theDate, format).format(format);
          }
          
          return newDate;
        }
      }])
})();