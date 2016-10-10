/**
 * Created by Administrator on 2016/9/19.
 */
var appDirectives = angular.module('appDirectives',[]);
var login = false;

/****************************/
/***获取验证码指令***/
/****************************/
appDirectives.directive('getCode',['$http','md5',function($http,md5) {
    return {
        restrict: 'AE',
        link: function(scope, element, attrs) {
            element.bind('click', function() {
                var inpTel = document.getElementById("tel");
                if (inpTel.checkValidity() == false) {
                }
                else {
                    var telInput = $("#tel").val();
                    var timeStamp = md5.createHash(Date.parse(new Date()).toString());
                    var telStamp  = md5.createHash(telInput);
                    var md5Tel = telInput.substring(0,1) + timeStamp + telInput.substring(1,10) + telStamp + telInput.substring(10,11);
                    console.log(md5Tel);
                    //获取token,有效时间1小时
                    $.ajax("http://www.desckie.com/iwantrent/getToken/", {

                        type: "POST",
                        contentType: 'application/x-www-form-urlencoded',
                        data:{
                            '1487a6bc2902fe7e4238eb0cc8144381':md5Tel,
                            'e51d0160easdasdasd33cea5b':'ec134dfb1f011990'
                        },
                        success: function(res) {
                            if(res.flag = true) {
                                //获取到token之后进行验证码请求
                                getCode(res.token);
                                countDown(60);
                            }else {
                                console.log("2")
                            }
                        }

                    });
                    //send: tel、token
                    getCode = function(token) {
                        $.ajax("http://www.desckie.com/iwantrent/sendSMSVerificationCode/",{
                            type: "POST",
                            contentType: 'application/x-www-form-urlencoded',
                            data:{
                                'username':telInput,
                                'token':token
                            },
                            success: function(res) {
                                if(res.flag = true) {
                                    scope.regToggle = true
                                }else {
                                    alert(res.message)
                                }
                            }

                        })
                    };
                    //60秒后获取验证码按钮可用
                    countDown = function(num) {
                        setInterval(function() {
                            if(num > 0) {
                                num = num - 1;
                                scope.validateCode = num + '秒再次获取';
                                scope.getCodeToggle = true
                            }else{
                                scope.validateCode = '获取验证码';
                                scope.getCodeToggle = false
                            }
                            scope.$apply();
                        },1000)
                    }
                }
            })
        }
    }
}]);

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
/*appDirectives.directive('shouQuan',['$http',function($http) {
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
}]);*/

/****************************/
/***商品列表指令***/
/****************************/
appDirectives.directive('releaseList',['$http',function($http) {
    return {
        restrict: 'AE',
        link: function(scope, element, attrs) {
            var DateTime = new Date();
            console.log(DateTime);
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
appDirectives.directive('itemDetail',['$http','$state',function($http,$state) {
    return {
        restrict: 'AE',
        link: function(scope, element, attrs) {
            $('.jquery-reslider').reSlider({
                speed:1000,//设置轮播的高度
                delay:5000,//设置轮播的延迟时间
                imgCount:3,//设置轮播的图片数
                dots:true,//设置轮播的序号点
                autoPlay:true//设置轮播是否自动播放
            });
            /*var itemId = sessionStorage.getItem("uuid");
            $http.post('https://www.desckie.com/iwantrent/getProductInfo/',{param:{uuid:itemId}}).success(function(res) {
                if (res.flag === true) {
                    scope.publish_date = res.data.publish_date;
                    scope.price        = res.data.price;
                    scope.product_name = res.data.product_name;
                    scope.deposit      = res.data.deposit;
                    scope.cardFree     = res.data.cardFree;
                    scope.renter       = res.data.renter;
                    scope.description  = res.data.description;
                } else {
                    $state.go('releaseList');
                    alert(res.message);
                }
            }).error(function() {
                alert("error")
            })*/
        }
    }
}]);

/****************************/
/***发布指令***/
/****************************/
appDirectives.directive('ngThumb', ['$http','$window', function($http,$window) {
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
/**输入不许为空，不许小于0指令**/
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
/****************************/
/**判断是否为登录指令**/
/****************************/
/*
appDirectives.directive('ifLogin', [function() {
    return {
        restrict: 'AE',
        link: function(scope,element, attributes) {
            /!***判断是否登录***!/
            if(login == false) {
                scope.goLogin()
            }
        }
    };
}]);*/
