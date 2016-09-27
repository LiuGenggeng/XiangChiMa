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
        $scope.addPic = function(file,filename) {
            var prevDiv = document.getElementById(filename);
            if (file.files && file.files[0])
            {
                var reader = new FileReader();
                reader.onload = function(evt){
                    document.getElementById(filename).parentNode.childNodes[5].style.display = "block";
                    document.getElementById(filename).style.display = "block";
                    document.getElementById(filename).style.height = "10rem";
                    file.parentNode.style.height = "0";
                    file.parentNode.style.opacity = "0";
                    prevDiv.innerHTML = '<img src="' + evt.target.result + '" />';
                    $scope.$apply()
                };
                reader.readAsDataURL(file.files[0]);
            }
            else
            {
                prevDiv.innerHTML = '<div class="img" style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src=\'' + file.value + '\'"></div>';
            }
        };
        $scope.delePic = function(deleName) {
            document.getElementById("dele-"+deleName).style.display = "none";
            var deleDiv = document.getElementById(deleName);
            deleDiv.style.display =  "none";
            var addDiv = document.getElementById("add-"+deleName);
            addDiv.getElementsByTagName("input")[0].value = '';
            addDiv.style.height = "10rem";
            addDiv.style.opacity = "1";
        }
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
