/**
 * Created by Administrator on 2016/9/19.
 */
var appDirectives = angular.module('appDirectives',[]);
if(sessionStorage.getItem("login")) {
    if (sessionStorage.getItem("login") == true) {
        sessionStorage.setItem("login",true);
    }else {
        sessionStorage.setItem("login",false);
    }
}else {
    sessionStorage.setItem("login",false);
}

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
                                window.token = res.token;
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
/***注册指令***/
/****************************/
appDirectives.directive('register',['$http','$state',function($http,$state) {
    return {
        restrict:'AE',
        link: function(scope,element,attrs) {
            element.bind('click',function() {
                var telInput = $("#tel").val();
                var passwordInput = $("#password").val();
                var code = $("#code").val();
                //注册指令，发送手机号，密码，验证码，token
                $.ajax("http://www.desckie.com/iwantrent/signup/",{
                    type: "POST",
                    contentType: 'application/x-www-form-urlencoded',
                    data:{
                        'username': telInput,
                        'token': token,
                        'password': passwordInput,
                        'code': code
                    },
                    success: function(data) {
                        var res = JSON.parse(data);
                        if(res.flag === true) {
                            alert('注册成功');
                            $state.go('login');
                        }else {
                            alert(res.message)
                        }
                    }
                })
            })
        }
    }
}]);

/****************************/
/***登录指令***/
/****************************/
appDirectives.directive('login',['$http','$state',function($http,$state) {
    return {
        restrict:'AE',
        link: function(scope,element,attrs) {
            element.bind('click',function() {
                var username = $("#name").val();
                var passwordInput = $("#password").val();
                //登录指令，发送手机号，密码
                $.ajax("http://www.desckie.com/iwantrent/login/",{
                    type: "POST",
                    contentType: 'application/x-www-form-urlencoded',
                    data:{
                        'username': username,
                        'password': passwordInput
                    },
                    success: function(data) {
                        var res = JSON.parse(data);
                        if(res.flag == true) {
                            login = true;
                            $state.go('releaseList');
                            document.cookie="sessionid="+res.sessionid;
                            sessionStorage.setItem("sessionid",res.sessionid);
                        }else {
                            alert(res.message)
                        }
                    }
                })
            })
        }
    }
}])

/****************************/
/***商品列表指令***/
/****************************/
appDirectives.directive('releaseList',['$http',function($http) {
    return {
        restrict: 'AE',
        link: function(scope, element, attrs) {
            var DateTime = new Date();
            console.log(DateTime);
            $http.get('http://www.desckie.com/iwantrent/getAllProduct/').success(function(res) {
                if(res.flag == true) {
                    scope.lists = res.data.data;
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
appDirectives.directive('myRelease',['$http','$state',function($http,$state) {
    return {
        restrict: 'AE',
        link: function(scope, element, attrs) {
            var sessionid = sessionStorage.getItem("sessionid");
            $.ajax("http://www.desckie.com/iwantrent/wxgetMyRental/",{
                type: "POST",
                contentType: 'application/x-www-form-urlencoded',
                data: {
                    sessionid: sessionid
                },
                success: function(data) {
                    var res = JSON.parse(data);
                    if(res.flag == true) {
                        if(res.data.length !== 0) {
                            scope.lists = res.data;
                            scope.$apply();
                        }else {
                            $(".lists")[0].style.display = 'none';
                        }
                    }else {
                        if(res.errid == '00031') {
                            $state.go('login');
                            login = false;
                        }
                    }
                }
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
            var itemId = sessionStorage.getItem("uuid");
            $.ajax("http://www.desckie.com/iwantrent/getProductInfo/",{
                type: "POST",
                contentType: 'application/x-www-form-urlencoded',
                data:{
                    'uuid':itemId
                },
                success: function(response) {
                    var res = JSON.parse(response);
                    if (res.flag === true) {
                        scope.publish_date = res.data.publish_date;
                        scope.price        = res.data.price;
                        scope.product_name = res.data.product_name;
                        scope.deposit      = res.data.deposit;
                        scope.cardFree     = res.data.cardFree;
                        scope.renter       = res.data.renter;
                        scope.description  = res.data.description;
                        scope.thumbnail    = res.data.thumbnail;
                        scope.$apply();
                        console.log(res.data.thumbnail);
                        picCarousel(res.data.thumbnail.length);
                    } else {
                        $state.go('releaseList');
                        alert(res.message);
                    }
                }
            });
            function picCarousel(length) {
                setTimeout(function() {
                    $('.jquery-reslider').reSlider({
                        speed:1000,//设置轮播的高度
                        delay:5000,//设置轮播的延迟时间
                        imgCount:length,//设置轮播的图片数
                        dots:true,//设置轮播的序号点
                        autoPlay:true//设置轮播是否自动播放
                    });
                    scope.loadingToggle = false;
                    scope.$apply()
                },0);

            }
        }
    }
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
