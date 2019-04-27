FlowerShop.Tools = function (app) {
    this.app = app;
};

/**
 *  传入一个构造好的对象/数组
 * @param domList 传入一个数组形似:
 * @return buildDom 返回一个DOM对象.
 */
FlowerShop.Tools.prototype.createDom = function (domList) {
    var buildDom = Array();
    for (var item in domList) {
        var dom = document.createElement(domList[item]['nodeType']);
        if (typeof domList[item]['nodeType'] != 'undefined') {
            for (var attr in domList[item]) {
                if (attr == 'nodeType') {
                    continue;
                } else if (attr.toLocaleLowerCase() == 'innerhtml') {
                    var resDom = this.createDom(domList[item][attr]);
                    for (var domItem in resDom) {
                        dom.appendChild(resDom[domItem]);
                    }
                } else if (attr.toLocaleLowerCase() == 'innertext') {
                    var textNode = document.createTextNode(domList[item][attr]);
                    dom.appendChild(textNode);
                } else {
                    dom.setAttribute(attr, domList[item][attr]);
                }
            }
            buildDom.push(dom);
        }
    }
    return buildDom;
};

/**
 * 将字符串转换为DOM对象.
 * @param domStr;
 * @return resDom;
 */
FlowerShop.Tools.prototype.strToDom = function (domStr) {
    var tmpDiv = document.createElement('div');
    tmpDiv.innerHTML = domStr;
    var resDom = tmpDiv.children;
    return resDom;
};

/**
 * 过滤字符串中的emoji表情.
 * @param text
 * @returns str
 */
FlowerShop.Tools.prototype.emojiFliter = function (text) {
    var ranges = [
        '\ud83c[\udf00-\udfff]',
        '\ud83d[\udc00-\ude4f]',
        '\ud83d[\ude80-\udeff]'
    ];
    return text.replace(new RegExp(ranges.join('|'), 'g'), '');
};

/**
 * 在一个对象haystack中寻找needle
 * @param  needle 需要寻找的值
 * @param  Object haystack 待检索的对象
 * @return Boolean 返回一个Bool类型的值
 */
FlowerShop.Tools.prototype.inObject = function (needle, haystack) {
    for (var item in haystack) {
        if (haystack[item] === needle) {
            return true;
        }
    }
    return false;
};



// 轮播控件
var Carousel = {
    // 获取到的轮播图片列表
    list: {},
    // 请求url
    add_url: '/banner/insert',
    list_url: '/banner/allinfos',
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
            var html = '';
            var slideBox = document.querySelector('.slide-box');
            for (var i = 0; i < Carousel.list.length; i++) {
                var slideItemArgs = [
                    {
                        nodeType: 'div',
                        'data-silde-id': i,
                        class: 'slide-item animated',
                        innerHTML: [
                            {
                                nodeType: 'img',
                                src: Carousel.list[i]['imgUrl'],
                                alt: Carousel.list[i]['name'],
                                onerror: 'imgLoadFailed(this);'
                            },
                            {nodeType: 'h4', innerText: Carousel.list[i]['name']},
                            {nodeType: 'p'}
                        ]
                    }
                ];
                var slideItem = FlowerShop.Tools.prototype.createDom(slideItemArgs)[0];
                slideBox.insertBefore(slideItem, slideBox.querySelector('.slide-item.add-new'));
            }
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

function imgLoadFailed(image) {
    image.src = '../img/404.png';
    image.parentNode.classList.add('fadeInDown');
}

