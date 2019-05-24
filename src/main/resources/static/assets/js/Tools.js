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

/**
 * 实例化图片, 在onload事件中回调
 *
 * @param target File
 * @param 图片加载完成后执行的回调
 */
FlowerShop.Tools.prototype.getImage = function (target, callback) {
    if (target instanceof File) {
        var image = null, imageUrl = null;
        imageUrl = window.URL.createObjectURL(target);
        image = new Image();
        image.src = imageUrl;
        image.onload = function () {
            callback(image);
        };
    }
};

/**
 * 获取DOM字符串中的原数据(需要特定DOM结构)
 *
 * @param rowData
 */
FlowerShop.Tools.prototype.getSource = function (cellValue) {
    var dom = this.strToDom(cellValue);
    if (dom) {
        return dom[0].getAttribute('data-source');
    } else {
        return null;
    }
    // return $(cellValue).attr('data-source');
};

/**
 * 将Base64转换为Blob对象
 *
 * @param dataUrl
 * @returns {Blob}
 */
FlowerShop.Tools.prototype.dataURLtoBlob = function (dataUrl) {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type: mime});
};

/**
 * 将Blob对象转换为File对象
 *
 * @param theBlob
 * @param fileName
 * @returns File
 */
FlowerShop.Tools.prototype.blobToFile = function (blob) {
    var newFile = new File(
        [blob],
        blob.name.trim(),
        {
            type: blob.type,
            lastModified: Date.now()
        }
    );
    return newFile;
};

// 自定义
function imgLoadFailed(image) {
    image.src = '../assets/img/404.png';
    image.parentNode.classList.add('fadeInDown');
}

function layerImage (image, rowData) {
    if (image.src.indexOf(404) >= 0) {
        return false;
    }
    layer.photos({
        anim: 5, //0-6的选择，指定弹出图片动画类型，默认随机（请注意，3.0之前的版本用shift参数）
        photos: {
            "start": 0,
            "id": rowData.id,
            "title": rowData.name,
            "data": [
                {
                    "src": rowData.imgUrl,
                    "thumb": rowData.imgUrl,
                    "pid": 'img_' + rowData.id,
                    "alt": 'img_' + rowData.name,
                }
            ]
        }
    });
}