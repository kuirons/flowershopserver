"use strict";

$(function () {
    //菜单点击
    $(".J_menuItem").on('click', function () {
        var url = $(this).attr('href');
        $("#J_iframe").attr('src', url);
        return false;
    });

    //粒子背景特效
    if (typeof $('body').particleground != 'undefined') {
        $('body').particleground({
            dotColor: 'white',
            lineColor: '#5cbdaa'
        });
    }

    // 登陆页面切换
    $('.login-tab .change-tab').on('click', function () {
        var firstTab = $(this).parents('.admin_login').children('.login-tab:first-child');
        if ($(this).hasClass('right-tab')) {
            firstTab.css('margin-left', 'calc(-100% - 40px)');
        } else {
            firstTab.removeAttr('style');
        }
    });

    // 监听输入事件
    $('.admin_login').on('keyup', 'input', function (event) {
        event = event || window.event;
        var keyCode = event.which || event.keyCode;
        if (keyCode === 13) {
            $(this).parents('.login-tab').find('.submit_btn').click();
        }
    });

    $('.submit_btn').on('click', function () {
        // 登陆请求url
        var requestUrl = '/ffsuser/login';
        // 当前选择登陆Tab
        var loginTab = $(this).parents('.login-tab');
        var loginType = loginTab.attr('data-type-login') == 'admin' ? 0 : 2;
        // 提交前校验
        var user = loginTab.find('.J_username');
        var passwd = loginTab.find('.J_password');
        var checkCode = loginTab.find('.J_codetext');
        var checkCodeBox = loginTab.find('.J_codeimg');

        if (user.val().trim().length == 0) {
            layer.alert('用户名不能为空.',
                {
                    icon: 0,
                    shadeClose: true,
                    title: '警告'
                }
            );
            return false;
        }
        if (passwd.val().trim().length == 0) {
            layer.alert('密码不能为空.',
                {
                    icon: 0,
                    shadeClose: true,
                    title: '警告'
                }
            );
            return false;
        }
        if (checkCode.val().trim().length == 0) {
            layer.alert('验证码不能为空.',
                {
                    icon: 0,
                    shadeClose: true,
                    title: '警告'
                }
            );
            return false;
        }
        if (checkCode.val().toLowerCase().trim() != checkCodeBox.attr('data-check-code')) {
            layer.alert('请输入正确的验证码.',
                {
                    icon: 0,
                    shadeClose: true,
                    title: '警告'
                }
            );
            return false;
        }
        // 校验完成登陆
        // 获取表单数据
        var userInfo = {
            type: loginType,
            userName: user.val().trim(),
            password: passwd.val().trim()
        };
        $.ajax({
            type: 'POST',
            data: {
                userinfo: JSON.stringify(userInfo)
            },
            url: requestUrl,
            dataType: 'json',
            success: function (response, status, xhr) {
                if (xhr.status == 200 && response.result != 'failed') {
                    var cookie = 'userType=';
                    switch (loginType) {
                        case 0:
                            cookie += 'admin';
                            window.location.href = '/admin/index.html';
                            break;
                        case 2:
                            cookie += 'seller';
                            window.location.href = '/seller/index.html';
                            break;
                        default:
                            break;
                    }
                    document.cookie = cookie;
                } else {
                    layer.alert(response.message,
                        {
                            icon: 2,
                            shadeClose: true,
                            title: '登陆失败'
                        }
                    );
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                layer.alert(errorThrown,
                    {
                        icon: 2,
                        shadeClose: true,
                        title: '登陆错误'
                    }
                );
            }
        });
    });

    var codeList = document.querySelectorAll('.J_codeimg');
    createCode(codeList[0]);
    createCode(codeList[1]);

    // 验证码刷新
    $('.J_codeimg').on('click', function () {
        createCode(this);
    });

});


function createCode(canvas) {
    var show_num = [];
    var canvas_width = $('.J_codeimg').width();
    var canvas_height = $('.J_codeimg').height();
    var context = canvas.getContext("2d");//获取到canvas画图的环境，演员表演的舞台
    canvas.width = canvas_width;
    canvas.height = canvas_height;
    var sCode = "a,b,c,d,e,f,g,h,i,j,k,m,n,p,q,r,s,t,u,v,w,x,y,z,A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0";
    var aCode = sCode.split(",");
    var aLength = aCode.length;//获取到数组的长度

    for (var i = 0; i < 5; i++) {  //这里的for循环可以控制验证码位数（如果想显示6位数，4改成6即可）
        var j = Math.floor(Math.random() * aLength);//获取到随机的索引值
        // var deg = Math.random() * 30 * Math.PI / 180;//产生0~30之间的随机弧度
        var deg = Math.random() - 0.5; //产生一个随机弧度
        var txt = aCode[j];//得到随机的一个内容
        show_num[i] = txt.toLowerCase();
        var x = 10 + i * 20;//文字在canvas上的x坐标
        var y = 20 + Math.random() * 8;//文字在canvas上的y坐标
        context.font = "bold 23px 微软雅黑";

        context.translate(x, y);
        context.rotate(deg);

        context.fillStyle = randomColor();
        context.fillText(txt, 0, 0);

        context.rotate(-deg);
        context.translate(-x, -y);
    }
    for (var i = 0; i <= 5; i++) { //验证码上显示线条
        context.strokeStyle = randomColor();
        context.beginPath();
        context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);
        context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);
        context.stroke();
    }
    for (var i = 0; i <= 30; i++) { //验证码上显示小点
        context.strokeStyle = randomColor();
        context.beginPath();
        var x = Math.random() * canvas_width;
        var y = Math.random() * canvas_height;
        context.moveTo(x, y);
        context.lineTo(x + 1, y + 1);
        context.stroke();
    }
    canvas.setAttribute('data-check-code', show_num.join(''));
}

//得到随机的颜色值
function randomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + "," + g + "," + b + ")";
}