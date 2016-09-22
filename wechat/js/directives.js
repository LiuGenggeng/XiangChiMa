/**
 * Created by Administrator on 2016/9/19.
 */
var appDirectives = angular.module('appDirectives',[]);
appDirectives.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs, ngModel) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            element.bind('change', function(event){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
                //附件预览
                scope.file = (event.srcElement || event.target).files[0];
                scope.getFile();
            });
        }
    };
}]);
appDirectives.directive('delete',[function($http) {
    return {
        restrict: 'AE',
        link: function(scope, element, attrs, ngModel) {
            element.bind('click', function() {
                $http({
                    url: 'http://www.desckie.com/iwantrent/deleteRental/',
                    method: 'POST',
                    params: {
                        uuid : scope.project
                    }
                }).then(function (res) {
                    if (res.data.status === 0) {
                        scope.progress = res.data.body;
                    } else {
                        alert(res.data.body);
                    }
                }, function (res) {
                    alert('error');
                })
            })
        }
    };
}])