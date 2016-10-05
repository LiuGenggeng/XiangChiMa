/**
 * Created by Administrator on 2016/9/19.
 */
var appDirectives = angular.module('appDirectives',[]);
/****************************/
/***删除发布物品指令***/
/****************************/
appDirectives.directive('deleteIt',['$http',function($http) {
    return {
        restrict: 'AE',
        link: function(scope, element, attrs) {
            element.bind('click', function() {
                scope.$emit('loading', true);
                $http.post('http://www.desckie.com/iwantrent/deleteRental/',{param:{uuid:"1"}}).success(function(res) {
                    if(res.flag === true) {
                        alert("删除成功");
                        window.location.reload()
                    }else{
                        alert("error")
                    }
                }).error(function() {
                    alert("error")
                });
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
appDirectives.directive('ngThumb', ['$window', function($window) {
    var helper = {
        support: !!($window.FileReader && $window.CanvasRenderingContext2D),
        isFile: function(item) {
            return angular.isObject(item) && item instanceof $window.File;
        },
        isImage: function(file) {
            var type =  '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    };

    return {
        restrict: 'A',
        template: '<canvas/>',
        link: function(scope, element, attributes) {
            if (!helper.support) return;

            var params = scope.$eval(attributes.ngThumb);

            if (!helper.isFile(params.file)) return;
            if (!helper.isImage(params.file)) return;

            var canvas = element.find('canvas');
            var reader = new FileReader();

            reader.onload = onLoadFile;
            reader.readAsDataURL(params.file);

            function onLoadFile(event) {
                var img = new Image();
                img.onload = onLoadImage;
                img.src = event.target.result;
            }

            function onLoadImage() {
                var width = params.width || this.width / this.height * params.height;
                var height = params.height || this.height / this.width * params.width;
                canvas.attr({ width: width, height: height });
                canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
            }
        }
    };
}]);
/****************************/
/***输入不许为空，不许小于0指令***/
/****************************/
appDirectives.directive('noZero', [function() {
    return {
        restrict: 'AE',
        require: '?ngModel',
        scope: {},
        link: function(scope,element, attributes,ngmodel) {
            element.bind('blur',function(){
                if(ngmodel.$viewValue == "" || ngmodel.$viewValue <= 0) {
                    ngmodel.$setViewValue(0);
                    ngmodel.$render();
                }
            })
        }
    };
}]);