/**
 * Created by Administrator on 2016/9/12.
 */
/****************************/
/***不同页面设置不同的title***/
/****************************/
app.run(['$location','$rootScope','$state',function($location, $rootScope,$state){
    $rootScope.$on('$stateChangeSuccess', function (event, toState) {
        $rootScope.title = toState.title;
        if($location.path() == "/release") {
            console.log($location.path());
            if(login == false) {
                $state.go('releaseList')
            }
        }else {
            console.log($location.path());
        }
    });
}]);
var appCtrls = angular.module('appCtrls',[]);
/****************************/
/***商品列表控制器***/
/****************************/
appCtrls.controller('releaseListCtrl',['$scope',
    function ($scope) {
        $scope.lists = [
            {'cardFree':'10','id':'1','product_name':'Giant 自行车','description':'','thumbnail':[],'publish_date':'刚刚','price':'30元/天','deposit':"10"}
        ]
    }
]);
/****************************/
/***我的发布控制器***/
/****************************/
appCtrls.controller('myReleaseCtrl',['$scope',
    function ($scope) {
        $scope.toggle = false;
        $scope.loading = false;
        $scope.lists = [
            {'cardFree':'10','id':'1','product_name':'Giant 自行车','description':'','thumbnail':[],'publish_date':'刚刚','price':'30元/天','deposit':"10"}
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
/****************************/
/***发布控制器***/
/****************************/
appCtrls.controller('releaseCtrl',['$scope',
    function ($scope) {
        $scope.imageSrc = "";
        $scope.toggle_mortgage = false;
        $scope.Description = '';
        $scope.release_much = '0';
        $scope.release_mortgage = '0';
        $scope.product_name = '';
        $scope.mortgage_input = '0'
    }
]);
/****************************/
/*发布表单提交及上传图片控制器*/
/****************************/
appCtrls.controller('AppController',['$scope','FileUploader','$location',
    function ($scope,FileUploader,$location) {
        /*$scope.goLogin = function() {
            $location.path("/releaseList")
        };*/
        var uploader = $scope.uploader = new FileUploader({
            url: 'http://www.desckie.com/iwantrent/releaseRental/',
            withCredentials: true
        });

        // FILTERS

        uploader.filters.push({
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });

        // CALLBACKS

        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
        uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function(item) {
            item.formData = {
                product_name: $(".weui_textarea_1").val(),
                description: $(".weui_textarea_2").val(),
                price: $(".price").val(),
                deposit: $(".deposit").val(),
                cardFree: $(".mortgage_input").val()
            };
            console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
        };

        console.info('uploader', uploader);
    }
]);
/****************************/
/***物品详情控制器***/
/****************************/
appCtrls.controller('itemDetailsCtrl',['$scope',
    function ($scope) {
        $scope.toggle = false;
        $scope.publish_date = '今天14:30发布';
        $scope.price = '34';
        $scope.product_name = 'TENTX 舒适型个人帐篷';
        $scope.deposit = '10';
        $scope.cardFree = '8';
        $scope.renter = '14743163347';
        $scope.description = '出租TENTX品牌舒适型个人帐篷意见，可长时间租用，个人爱护的比I啊哦好，9新，可给需要户外旅游的人事租用';
        $scope.zu = function() {
            $scope.toggle = !$scope.toggle;
        };
        $scope.close = function() {
            $scope.toggle = false;
        };
    }
]);
