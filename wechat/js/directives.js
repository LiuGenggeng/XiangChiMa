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
            $http.jsonp({
                url: 'http://www.desckie.com/iwantrent/getAllProduct/'
            }).success(function (res) {
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
                if (res.data.flag === 0) {
                    scope.lists = res.data.boty;
                } else {
                    alert(res.data.body);
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
                method: 'GET'
            }).then(function (res) {
                if (res.data.flag === 0) {
                    scope.lists = res.data.boty;
                } else {
                    alert(res.data.body);
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
                var myForm = document.getElementsByClassName("release_form");
                $http({
                    url: '/iwantrent/getProductInfo/',
                    method: 'GET',
                    params: {

                    }
                }).then(function (res) {
                    if (res.data.flag === 0) {
                        scope.lists = res.data.boty;
                    } else {
                        alert(res.data.body);
                    }
                }, function () {
                    alert('error');
                })
            })
        }
    }
}]);

