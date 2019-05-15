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

// 自定义
function imgLoadFailed(image) {
    image.src = '../assets/img/404.png';
    image.parentNode.classList.add('fadeInDown');
}