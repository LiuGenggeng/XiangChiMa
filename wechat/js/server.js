/**
 * Created by Administrator on 2016/9/12.
 */
var appServers = angular.module('appServers',[]);
appServers.filter('date',function(){
    return function(inputArray){
        var nowDate = new Date();
        return inputArray;
    }

})
appServers.filter('addYuan',function(){
    return function(inputArray){
        inputArray = inputArray + '元/天'
        return inputArray
    }

})