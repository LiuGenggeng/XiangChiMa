/**
 * Created by Administrator on 2016/9/12.
 */
/****************************/
/***不同页面设置不同的title***/
/****************************/
app.run(['$location','$rootScope',function($location, $rootScope){
    $rootScope.$on('$stateChangeSuccess', function (event, toState) {
        $rootScope.title = toState.title
    });
}]);
var appCtrls = angular.module('appCtrls',[]);
appCtrls.controller('releaseListCtrl',['$scope',
    function ($scope) {
        $scope.lists = [
            {'card':'8','cardCash':'10','id':'1','name':'Giant 自行车','description':'出租车辆出租车辆出租车辆出租车辆出租车辆出租车辆出租车辆出租车辆出租车辆','images':'','time':'刚刚','much':'30元/天','mortgage':"10"},
            {'id':'2','name':'Giant 自行车','description':'出租车辆出租车辆出租车辆出租车辆出租车辆出租车辆出租车辆出租车辆出租车辆','images':'','time':'刚刚','much':'30元/天','mortgage':"10"},
            {'id':'3','name':'Giant 自行车','description':'出租车辆出租车辆出租车辆出租车辆出租车辆出租车辆出租车辆出租车辆出租车辆','images':'','time':'刚刚','much':'30元/天','mortgage':"10"},
            {'id':'4','name':'Giant 自行车','description':'出租车辆出租车辆出租车辆出租车辆出租车辆出租车辆出租车辆出租车辆出租车辆','images':'','time':'刚刚','much':'30元/天','mortgage':"10"}
        ]
    }
]);