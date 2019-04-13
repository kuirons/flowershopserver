"use strict";

// 轮播控件
var Carousel = {
    // 获取到的轮播图片列表
    list: {},
    // 请求url
    add_url: 'http://192.168.43.252:8090/banner/insert',
    list_url: 'http://192.168.43.252:8090/banner/allinfos',
    // 默认设置
    config: {
        interval: 4000, // 图片切换时间, 单位微秒
        ratio: 16 / 9, // 图片长宽比
        height: 720, // 图片默认高度
        width: 1280, // 图片默认宽度
        unit: 'px' // 单位
    },
    // 初始化方法
    __init: {
        list: function () {
            let html = '';
            for (var i = 0; i < Carousel.list.length; i++) {
                html += '<div class="slide-item" data-silde-id="' + Carousel.list[i]['id'] + '"><img src="' + Carousel.list[i]['imgUrl'] + '" alt="' + Carousel.list[i]['name'] + '"><h4>' + Carousel.list[i]['name'] + '</h4><p></p></div>';
            }
            document.querySelector('.slide-box').innerHTML += html;
        },
        preview: function () {

        }
    },
    __action: {
        add: function (formData, success, error) {
            // 先用着jQuery, 后面再换.
            $.ajax({
                type: "post",
                data: formData,
                datatype: "json",
                processData: false,
                contentType: false,
                error: error,
                success: success,
                url: Carousel.add_url
            });
        },
        delete: function () {

        },
        update: function () {

        }
    }
};



// 初始化轮播管理

$(document).ready(function () {
    $.get(Carousel.list_url, function (data) {
        if (typeof data != 'undefined' && data.length != 0) {
            Carousel.list = data;
            for (var key in Carousel.__init) {
                Carousel.__init[key]();
            }
        }
    });

    $('.slide-box .add-new').on('click', function () {
        $('.slide-box input[type=file]').click();
    });
    $('.slide-box input[type=file]').on('change', function () {
        let img = this.files[0];
        let formData = new FormData();
        formData.append('file', img);
        formData.append('name', '测试图片');
        Carousel.__action.add(formData, function (data, textStatus, jqXHR) {
            if (data.length == 0)
                alert('上传成功!');
            else
                alert('上传失败!');
        }, function (data) {
            alert('上传失败!');
            console.log(data);
        })
    });
});


