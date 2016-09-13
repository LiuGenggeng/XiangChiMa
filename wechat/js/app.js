/**
 * Created by Administrator on 2016/9/12.
 */
var app = angular.module('xzm',['ui.router'])
    .run(['$location','$rootScope',function($location, $rootScope){
        $rootScope.$on('$stateChangeSuccess', function (event, toState) {
            $rootScope.title = toState.title
        });
    }]);
app.config(function ($stateProvider, $urlRouterProvider)  {
    $urlRouterProvider.when("", "/releaseList");
    $urlRouterProvider.otherwise('/releaseList');
    $stateProvider
        .state("releaseList", {
            url: "/releaseList",
            templateUrl: 'tpls/releaseList.html',
            title:"发布列表"/*,
            controller:"releaseListCtrl"*/
        })
        .state("release", {
            url: "/release",
            templateUrl: 'tpls/release.html',
            title:"发布"/*,
            controller:"releaseCtrl"*/
        })
        .state("myRelease", {
            url: "/myRelease",
            templateUrl: 'tpls/myRelease.html',
            title:"我的发布"/*,
            controller:"myReleaseCtrl"*/
        })
        .state("itemDetails", {
            url: "/itemDetails",
            templateUrl: 'tpls/itemDetails.html',
            title:"物品详情"/*,
            controller:"itemDetailsCtrl"*/
        })
})