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

