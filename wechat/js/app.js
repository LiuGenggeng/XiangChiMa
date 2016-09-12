/**
 * Created by Administrator on 2016/9/12.
 */
var app = angular.module('xzm',['ui.router']);
app.config(function ($stateProvider, $urlRouterProvider)  {
    $urlRouterProvider.when("", "/releaseList");
    $urlRouterProvider.otherwise('/releaseList');
    $stateProvider
        .state("releaseList", {
            url: "/releaseList",
            templateUrl: 'tpls/releaseList.html',
            title:"发布列表"
        })
        .state("myRelease", {
            url: "/myRelease",
            templateUrl: 'tpls/myRelease.html',
            title:"我的发布"
        })
        .state("release", {
            url: "/release",
            templateUrl: 'tpls/release.html',
            title:"发布"
        })
        .state("itemDetails", {
            url: "/itemDetails",
            templateUrl: 'tpls/itemDetails.html',
            title:"物品详情"
        })
})