/**
 * Created by Administrator on 2016/9/12.
 */
var appServers = angular.module('appServers',[]);
appServers.filter('date',function(){
    return function(inputArray){
        var date1 = new Date();
        var date2 = new Date(inputArray);
        var date2Month = (date2.getMonth()+1)+"月";   //获取date2的月
        var date2Date  = date2.getDate()+"日";   //获取date2的日
        var date2Time  = date2.toLocaleTimeString();   //获取date2的时间
        var date3 = date1.getTime() - date2.getTime();   //计算差的毫秒数
        //计算出小时数
        var leave1 = date3%(24*3600*1000);   //计算天数后剩余的毫秒数
        var hours = Math.floor(leave1/(3600*1000));
        //计算相差分钟数
        var leave2 = leave1%(3600*1000);        //计算小时数后剩余的毫秒数
        var minutes = Math.floor(leave2/(60*1000));
        //计算相差秒数
        var leave3 = leave2%(60*1000);      //计算分钟数后剩余的毫秒数
        var seconds = Math.round(leave3/1000);
        var days = Math.floor(date3/(24*3600*1000)); //天数差
        if(days >= 1) {
            if(days >= 2) {
                return date2Month+date2Date+" "+date2Time
            }else{
                return "昨天"+date2Time
            }
        }else if(hours >= 1){
            return "今天"+date2Time
        }else if(minutes >= 1) {
            return minutes+"分钟前"
        }else if(seconds >= 1) {
            return "刚刚"
        }else {
            console.log('没有时间')
        }

    }
});
appServers.filter('addYuan',function(){
    return function(inputArray){
        inputArray = inputArray + '元/天'
        return inputArray
    }

});