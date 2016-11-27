/**
 * Created by Administrator on 2016/9/12.
 */
var app = angular.module('xzm',['ui.router','appCtrls','appDirectives','angularFileUpload','appServers','angular-md5']);
app.config(function ($stateProvider, $urlRouterProvider)  {
    $urlRouterProvider.when("", "/releaseList");
    $urlRouterProvider.otherwise('/releaseList');
    $stateProvider
        .state("releaseList", {
            url: "/releaseList",
            templateUrl: 'tpls/releaseList.html',
            title:"发布列表",
            controller:"releaseListCtrl"
        })
        .state("release", {
            url: "/release",
            templateUrl: 'tpls/release.html',
            title:"发布",
            controller:"releaseCtrl"
        })
        .state("myRelease", {
            url: "/myRelease",
            templateUrl: 'tpls/myRelease.html',
            title:"我的发布",
            controller:"myReleaseCtrl"
        })
        .state("itemDetails", {
            url: "/itemDetails",
            templateUrl: 'tpls/itemDetails.html',
            title:"物品详情",
            controller:"itemDetailsCtrl"
        })
        .state("register", {
            url: "/register",
            templateUrl: 'tpls/register.html',
            title:"注册",
            controller:"registerCtrl"
        })
        .state("login",{
            url: "/login",
            templateUrl: 'tpls/login.html',
            title:"登录",
            controller: "loginCtrl"
        })
})