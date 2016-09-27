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
appDirectives.directive('releaseList',['$http',function($http) {
    return {
        restrict: 'AE',
        link: function(scope, element, attrs) {
            $http({
                url: '/iwantrent/getAllProduct/',
                method: 'GET'
            }).then(function (res) {
                if (res.flag === true) {
                    scope.lists = res.data;
                } else {
                    alert("error");
                }
            }, function () {
                alert('error');
            })
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
            $http({
                url: '/iwantrent/getMyRental/',
                method: 'GET'
            }).then(function (res) {
                if (res.flag === true) {
                    scope.lists = res.data;
                } else {
                    alert("error");
                }
            }, function () {
                alert('error');
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
            $http({
                url: '/iwantrent/getProductInfo/',
                method: 'GET',
                param: {
                    uuid:attrs.uuid
                }
            }).then(function (res) {
                if (res.flag === 0) {
                    scope.publish_date = res.data.publish_date;
                    scope.price        = res.data.price;
                    scope.product_name = res.data.product_name;
                    scope.deposit      = res.data.deposit;
                    scope.cardFree     = res.data.cardFree;
                    scope.renter       = res.data.renter;
                    scope.description  = res.data.description;
                } else {
                    alert("error");
                }
            }, function () {
                alert('error');
            })
        }
    }
}]);

/****************************/
/***发布指令***/
/****************************/
appDirectives.directive('release',['$http',function($http) {
    return {
        restrict: 'AE',
        link: function(scope, element, attrs) {
            element.bind('click',function() {
                $http({
                    url: '/iwantrent/releaseRental/',
                    method: 'POST',
                    params: {

                    }
                }).then(function (res) {
                    if (res.flag === true) {
                        alert("发布成功")
                    } else {
                        alert(res.data);
                    }
                }, function () {
                    alert('error');
                })
            })
        }
    }
}]);

