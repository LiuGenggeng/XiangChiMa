/**
 * Created by Administrator on 2016/9/12.
 */
/****************************/
/***不同页面设置不同的title***/
/****************************/
angular.module('xzm', [ ] )
.run(['$location','$rootScope',function($location, $rootScope){
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        $rootScope.title = toState.title
    });
}]);