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
appCtrls.controller('myReleaseCtrl',['$scope',
    function ($scope) {
        $scope.lists = [
            {'card':'8','cardCash':'10','id':'1','name':'Giant 自行车','description':'出租车辆出租车辆出租车辆出租车辆出租车辆出租车辆出租车辆出租车辆出租车辆','images':'','time':'刚刚','much':'30元/天','mortgage':"10"},
            {'id':'2','name':'Giant 自行车','description':'出租车辆出租车辆出租车辆出租车辆出租车辆出租车辆出租车辆出租车辆出租车辆','images':'','time':'刚刚','much':'30元/天','mortgage':"10"},
            {'id':'3','name':'Giant 自行车','description':'出租车辆出租车辆出租车辆出租车辆出租车辆出租车辆出租车辆出租车辆出租车辆','images':'','time':'刚刚','much':'30元/天','mortgage':"10"},
            {'id':'4','name':'Giant 自行车','description':'出租车辆出租车辆出租车辆出租车辆出租车辆出租车辆出租车辆出租车辆出租车辆','images':'','time':'刚刚','much':'30元/天','mortgage':"10"}
        ]
    }
]);
appCtrls.controller('releaseCtrl',['$scope',
    function ($scope) {
        $scope.toggle_mortgage = false;
        $scope.Description = '';
        $scope.release_much = '0';
        $scope.release_mortgage = '0'
    }
]);
appCtrls.controller('itemDetailsCtrl',['$scope',
    function ($scope) {
        $scope.toggle = false;
        $scope.time = '今天14:30发布';
        $scope.much = '34';
        $scope.title = 'TENTX 舒适型个人帐篷';
        $scope.mortgage = '10';
        $scope.card = '1';
        $scope.cardCash = '8';
        $scope.link = '14743163347';
        $scope.description = '出租TENTX品牌舒适型个人帐篷意见，可长时间租用，个人爱护的比I啊哦好，9新，可给需要户外旅游的人事租用';
        $scope.zu = function() {
            $scope.toggle = !$scope.toggle;
        };
        $scope.close = function() {
            $scope.toggle = false;
        };
    }
]);