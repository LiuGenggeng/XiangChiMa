/**
 * Created by Administrator on 2016/9/19.
 */
var appDirectives = angular.module('appDirectives',[]);
appDirectives.directive('deleteIt',[function() {
    return {
        restrict: 'AE',
        link: function(scope, element, attrs) {
            element.bind('click', function() {
                scope.$emit('loading', true);
            })
        }
    }
}]);
/****************************/
/***商品列表指令***/
/****************************/
appDirectives.directive('shouQuan',['$http',function($http) {
    return {
        restrict: 'AE',
        link: function(scope, element, attrs) {
            $http.get('https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect').success(function(res) {
                if(res.flag === true) {
                    scope.lists = res.data;
                }else{
                    alert("error")
                }
            }).error(function() {
                alert("error")
            });
        }
    }
}]);

/****************************/
/***商品列表指令***/
/****************************/
appDirectives.directive('releaseList',['$http',function($http) {
    return {
        restrict: 'AE',
        link: function(scope, element, attrs) {
            $http.get('https://www.desckie.com/iwantrent/getAllProduct/').success(function(res) {
                if(res.flag === true) {
                    scope.lists = res.data;
                }else{
                    alert("error")
                }
            }).error(function() {
                alert("error")
            });
        }
    }
}]);

/****************************/
/***我的发布指令***/
/****************************/
appDirectives.directive('myRelease',['$http',function($http) {
    return {
        restrict: 'AE',
        link: function(scope, element, attrs) {
            $http.get('https://www.desckie.com/iwantrent/getMyRental/').success(function(res) {
                if (res.flag === true) {
                    scope.lists = res.data;
                } else {
                    alert(res.message);
                }
            }).error(function() {
                alert("error")
            })
        }
    }
}]);

/****************************/
/***物品详情指令***/
/****************************/
appDirectives.directive('itemDetail',['$http',function($http) {
    return {
        restrict: 'AE',
        link: function(scope, element, attrs) {
            $http.post('https://www.desckie.com/iwantrent/getProductInfo/',{param:{uuid:""}}).success(function(res) {
                if (res.flag === true) {
                    scope.publish_date = res.data.publish_date;
                    scope.price        = res.data.price;
                    scope.product_name = res.data.product_name;
                    scope.deposit      = res.data.deposit;
                    scope.cardFree     = res.data.cardFree;
                    scope.renter       = res.data.renter;
                    scope.description  = res.data.description;
                } else {
                    alert(res.message)
                }
            }).error(function() {
                alert("error")
            })
        }
    }
}]);

/****************************/
/***发布指令***/
/****************************/
/*appDirectives.directive('release',['$http',function($http) {
    return {
        restrict: 'AE',
        link: function(scope, element, attrs) {
            element.bind('click',function() {
                /!*var product_name = document.querySelector(".product_name_1").value;
                var description  = document.querySelector(".product_name-2").value;
                var price        = document.querySelector(".price").value;
                var deposit      = document.querySelector(".deposit").value;

                $http.post('http://www.desckie.com/iwantrent/releaseRental/',{param:{

                }}).success(function(res) {
                    if (res.flag === true) {
                        alert("发布成功")
                    } else {
                        alert(res.message)
                    }
                }).error(function() {
                    alert("error")
                })*!/
                /!*document.querySelector(".release_form").submit();*!/
            })
        }
    }
}]);*/

