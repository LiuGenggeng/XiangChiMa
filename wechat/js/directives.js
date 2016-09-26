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
/***我的发布指令***/
/****************************/
appDirectives.directive('releaseList',['$http',function($http) {
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
appDirectives.directive('itemDetail',['$http',function($http) {
    return {
        restrict: 'AE',
        link: function(scope, element, attrs) {
            element.bind('')
        }
    }
}]);

