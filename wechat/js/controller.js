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
        ];
    }
]);
appCtrls.controller('myReleaseCtrl',['$scope',
    function ($scope) {
        $scope.toggle = false;
        $scope.loading = false;
        $scope.lists = [
            {'card':'8','cardCash':'10','id':'1','name':'Giant 自行车','description':'出租车辆出租车辆出租车辆出租车辆出租车辆出租车辆出租车辆出租车辆出租车辆','images':'','time':'刚刚','much':'30元/天','mortgage':"10"},
            {'id':'2','name':'Giant 自行车','description':'出租车辆出租车辆出租车辆出租车辆出租车辆出租车辆出租车辆出租车辆出租车辆','images':'','time':'刚刚','much':'30元/天','mortgage':"10"},
            {'id':'3','name':'Giant 自行车','description':'出租车辆出租车辆出租车辆出租车辆出租车辆出租车辆出租车辆出租车辆出租车辆','images':'','time':'刚刚','much':'30元/天','mortgage':"10"},
            {'id':'4','name':'Giant 自行车','description':'出租车辆出租车辆出租车辆出租车辆出租车辆出租车辆出租车辆出租车辆出租车辆','images':'','time':'刚刚','much':'30元/天','mortgage':"10"}
        ];
        $scope.zu = function() {
            $scope.toggle = !$scope.toggle;
        };
        $scope.close = function() {
            $scope.toggle = false;
        };
        $scope.$on('loading', function(event,data) {
            console.log('loading',data);
            $scope.loading = true;//父级能得到值
            $scope.toggle = false;
            $scope.$apply()
        });
    }
]);
appCtrls.controller('releaseCtrl',['$scope',
    function ($scope, fileReader) {
        $scope.imageSrc = "";
        $scope.toggle_mortgage = false;
        $scope.Description = '';
        $scope.release_much = '0';
        $scope.release_mortgage = '0';
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
appCtrls.controller('submitImg',['$scope','$http',
    function ($scope,$http) {
        $scope.reader = new FileReader();   //创建一个FileReader接口
        $scope.form = {     //用于绑定提交内容，图片或其他数据
            image:{},
        };
        $scope.thumb = {};      //用于存放图片的base64
        $scope.thumb_default = {    //用于循环默认的‘加号’添加图片的框
            1111:{}
        };

        $scope.img_upload = function(files) {       //单次提交图片的函数
            $scope.guid = (new Date()).valueOf();   //通过时间戳创建一个随机数，作为键名使用
            $scope.reader.readAsDataURL(files[0]);  //FileReader的方法，把图片转成base64
            $scope.reader.onload = function(ev) {
                $scope.$apply(function(){
                    $scope.thumb[$scope.guid] = {
                        imgSrc : ev.target.result,  //接收base64
                    }
                });
            };

            var data = new FormData();      //以下为像后台提交图片数据
            data.append('image', files[0]);
            data.append('guid',$scope.guid);
            $http({
                method: 'post',
                url: '/comm/test-upload.php?action=success',
                data:data,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).success(function(data) {
                if (data.result_code == 'SUCCESS') {
                    $scope.form.image[data.guid] = data.result_value;
                    $scope.thumb[data.guid].status = 'SUCCESS';
                    console.log($scope.form)
                }
                if(data.result_code == 'FAIL'){
                    console.log(data)
                }
            })
        };

        $scope.img_del = function(key) {    //删除，删除的时候thumb和form里面的图片数据都要删除，避免提交不必要的
            var guidArr = [];
            for(var p in $scope.thumb){
                guidArr.push(p);
            }
            delete $scope.thumb[guidArr[key]];
            delete $scope.form.image[guidArr[key]];
        };
        $scope.submit_form = function(){    //图片选择完毕后的提交，这个提交并没有提交前面的图片数据，只是提交用户操作完毕后，到底要上传哪些，通过提交键名或者链接，后台来判断最终用户的选择,整个思路也是如此
            $http({
                method: 'post',
                url: '/comm/test.php',
                data:$scope.form
            }).success(function(data) {
                console.log(data);
            })
        };
    }
]);