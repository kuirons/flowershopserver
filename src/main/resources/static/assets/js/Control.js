"use strict";

FlowerShop.Control = function (app) {
    this.app = app;
};

FlowerShop.Control.prototype.init = {
    /**
     * 上传图片控件
     * 初始化Cropper
     */
    ImageUploadControlCss: function () {
        var headDom = document.querySelector('head');
        var cropperJs = document.createElement('script');
        var cropperCss = document.createElement('link');
        cropperCss.setAttribute('rel', 'stylesheet');
        cropperCss.href = '../assets/css/cropper.css';
        cropperJs.src = '../assets/js/cropper.min.js';
        headDom.appendChild(cropperCss);
        headDom.appendChild(cropperJs);
    },
    ImageUploadControlDom: function () {
        var topDocument = window.top.document;
        var imageUploadBtn = document.querySelector('.image-upload');
        if (imageUploadBtn === null || typeof imageUploadBtn === "undefined") {
            return false;
        }
        var imageUploadBox = topDocument.querySelector('.image-upload-box');
        var maxFileSize = imageUploadBtn.getAttribute('data-max-file-size') !== null ? (parseInt(imageUploadBtn.getAttribute('data-max-file-size')) / 1048576) : '2';
        var promptSize = '图片大小不得超过' + maxFileSize + 'MB';
        if (imageUploadBox === null || typeof imageUploadBox === "undefined") {
            // 图片上传表单容器
            var imageUploadBoxArgs = [
                {
                    nodeType: 'form',
                    id: 'image-upload-box',
                    enctype: 'multipart/form-data',
                    class: 'upload-box upload-box-close animated',
                    accept: 'image/jpg, image/png, image/gif',
                    innerHTML: [
                        {
                            nodeType: 'div',
                            id: 'choice-image-tab',
                            class: 'upload-image-tab',
                            innerHTML: [
                                {
                                    nodeType: 'div',
                                    class: 'choice-image-box',
                                    innerHTML: [
                                        {
                                            nodeType: 'a',
                                            class: 'choice-image-btn'
                                        },
                                        {
                                            nodeType: 'p',
                                            class: 'choice-image-prompt',
                                            innerHTML: [
                                                {
                                                    nodeType: 'span',
                                                    innerText: '请选择gif, jpg, png格式的图片'
                                                },
                                                {
                                                    nodeType: 'br'
                                                },
                                                {
                                                    nodeType: 'span',
                                                    innerText: promptSize
                                                }
                                            ]
                                        },
                                        {
                                            nodeType: 'input',
                                            type: 'file',
                                            autocomplete: 'off',
                                            class: 'image-upload-hidden-input'
                                        }
                                    ]
                                },
                                {
                                    nodeType: 'a',
                                    class: 'close-upload-btn',
                                    style: 'position: absolute; top: 5px; right: 10px; font-size: 22px; color: #bfbfbf; cursor: pointer;',
                                    innerHTML: [
                                        {
                                            nodeType: 'i',
                                            class: 'fa fa-times'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            nodeType: 'div',
                            id: 'image-crop-tab',
                            class: 'upload-image-tab',
                            innerHTML: [
                                {
                                    nodeType: 'div',
                                    class: 'upload-image-crop-box',
                                    innerHTML: [
                                        {
                                            nodeType: 'img',
                                            class: 'crop-view-image'
                                        }
                                    ]
                                },
                                {
                                    nodeType: 'div',
                                    class: 'upload-image-btn-box',
                                    innerHTML: [
                                        {
                                            nodeType: 'input',
                                            placeholder: '请输入图片名称',
                                            class: 'upload-image-name-ipt'
                                        },
                                        {
                                            nodeType: 'a',
                                            innerText: '裁剪',
                                            id: 'image-crop-btn',
                                            class: 'upload-image-btn'
                                        },
                                        {
                                            nodeType: 'button',
                                            innerText: '重置',
                                            type: 'reset',
                                            id: 'image-reset-btn',
                                            'data-target-order': '0',
                                            class: 'upload-image-btn upload-image-next-page',
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            nodeType: 'a',
                            class: 'close-upload-btn',
                            style: 'position: absolute; top: 5px; right: 10px; font-size: 22px; color: #bfbfbf; cursor: pointer;',
                            innerHTML: [
                                {
                                    nodeType: 'i',
                                    class: 'fa fa-times'
                                }
                            ]
                        }
                    ]
                }
            ];
            var imageUploadBoxDom = FlowerShop.Tools.prototype.createDom(imageUploadBoxArgs);
            for (var item in imageUploadBoxDom) {
                topDocument.body.appendChild(imageUploadBoxDom[item]);
            }
            ;
        }
    },
};
FlowerShop.Control.prototype.initData = {
    filter: {},
};

FlowerShop.Control.prototype.listen = function () {
    var self = this;
    var topDocument = window.top.document;

    $(document).off('click', '.image-upload').on('click', '.image-upload', function () {

        this.classList.add('category-upload-image-click');
        var isCategory = this.classList.contains('category-image-poster');
        var uploadBox = topDocument.querySelector('#image-upload-box');
        var iptHiddenDom = uploadBox.querySelector('.upload-image-name-ipt.hidden-dom');
        if (iptHiddenDom) {
            iptHiddenDom.classList.remove('hidden-dom');
        }
        if (!uploadBox) {
            self.init.ImageUploadControlDom();
            uploadBox = topDocument.querySelector('#image-upload-box');
        }
        if (isCategory) {
            uploadBox.querySelector('.upload-image-name-ipt').classList.add('hidden-dom');
        }
        if (uploadBox && uploadBox.classList.contains('upload-box-open')) {
            self.closeUpload();
        } else {
            self.openUpload();
        }
    });

    if (window.self === window.top) {
        $(topDocument).off('click', '.choice-image-box').on('click', '.choice-image-box', function () {
            this.querySelector('.image-upload-hidden-input').click();
        });
    }

    if (window.self === window.top) {
        $(topDocument).off('change', '.image-upload-hidden-input').on('change', '.image-upload-hidden-input', function () {
            // 从input中生成图像Object赋值给imgage标签
            var img = this.files[0];
            var imgObject = window.URL.createObjectURL(img);
            var $image = $('.upload-image-crop-box .crop-view-image');

            // 判断图像的格式是否符合要求
            var uploadBoxBtn = document.querySelector('.image-upload');
            if (uploadBoxBtn === null || typeof uploadBoxBtn === "undefined") {
                uploadBoxBtn = document.querySelector('#J_iframe').contentDocument.querySelector('.image-upload');
            }
            var maxFileSize = uploadBoxBtn.getAttribute('data-max-file-size');
            var allowMimeType = uploadBoxBtn.getAttribute('data-allow-mime-type');
            var proportion = JSON.parse(uploadBoxBtn.getAttribute('data-proportion'));
            var minRecomReso = JSON.parse(uploadBoxBtn.getAttribute('data-min-recom-resolution'));

            if (allowMimeType !== null && typeof allowMimeType !== "undefined") {
                if (allowMimeType.toLocaleLowerCase().indexOf('image/*') >= 0) {
                    if (img.type.indexOf('image') < 0) {
                        layer.alert('选择图片的格式不符合要求, 请重试.',
                            {
                                icon: 2,
                                shadeClose: true,
                                title: '错误'
                            });
                        return false;
                    }
                }
            }

            if (maxFileSize !== null && typeof maxFileSize !== "undefined") {
                if (img.size > maxFileSize) {
                    layer.alert('选择文件过大, 请重试.',
                        {
                            icon: 0,
                            shadeClose: true,
                            title: '错误'
                        });
                    return false;
                }
            }

            // 绑定dom对象
            var cropperContainer = topDocument.querySelector('.cropper-container');
            if (cropperContainer == null || typeof cropperContainer == "undefined") {
                var cropperOption = {
                    viewMode: 1,
                    guides: true,
                    zoomable: true,
                    scalable: true,
                    rotatable: true,
                    dragMode: 'move',
                    responsive: true,
                    zoomOnTouch: true
                };
                if (proportion !== null && typeof proportion !== "undefined") {
                    cropperOption.aspectRatio = proportion[0] / proportion[1];
                }
                $image.prop('src', imgObject);
                $image.cropper(cropperOption);
            } else {
                $image.cropper('replace', imgObject);
            }
            // 翻页
            var index = 1;
            self.pageJump(index);


            if (minRecomReso !== null && typeof minRecomReso !== "undefined") {
                var tmpImg = new Image();
                tmpImg.src = imgObject;
                tmpImg.onload = function () {
                    if (tmpImg.naturalWidth < minRecomReso[0] || tmpImg.naturalHeight < minRecomReso[1]) {
                        topDocument.querySelector('#image-upload-box').style.cssText += 'visibility: hidden';
                        self.app.get('Modal').openConfirm(
                            '<p style="color: black; font-size: 16px; margin: 60px auto 0px auto;white-space: normal; width: 85%;">您当前选择的图片分辨率低于推荐分辨率<br>上传后可能会出现模糊的情况, 仍要继续？</p><p style="color: #bfbfbf; font-size: 14px;">提示：推荐图片大小为: <span style="color: #d1191a;">' + minRecomReso[0] + ' x ' + minRecomReso[1] + '</span></p>',
                            function () {
                                self.openUpload();
                                topDocument.querySelector('#image-upload-box').removeAttribute('style');
                            },
                            function () {
                                var resetBtn = document.querySelector('#image-reset-btn');
                                if (resetBtn !== null && typeof resetBtn !== "undefined")
                                    resetBtn.click();
                                topDocument.querySelector('#image-upload-box').removeAttribute('style');
                                self.openUpload();
                                return false;
                            }
                        );
                    }
                    this.onload = null;
                };
            }
        });
    }

    if (window.self === window.top) {
        $(topDocument).off('click', '#image-crop-btn').on('click', '#image-crop-btn', function () {
            // 点击裁剪按钮切换为上传按钮.
            this.innerHTML = '上传';
            this.id = 'image-submit-btn';
            var cas = $('.upload-image-crop-box .crop-view-image').cropper('getCroppedCanvas');
            // self.get('Tools').strToDom('<image src="">');
            // var base64url = cas.toDataURL('image/png');
            cas.toBlob(function (blob) {
                var viewImg = new Image();
                var url = window.URL.createObjectURL(blob);

                viewImg.src = url;
                $('.upload-image-crop-box .crop-view-image').cropper('destroy');
                topDocument.querySelector('.upload-image-crop-box').innerHTML = '<canvas class="crop-image-preview"></canvas>';
                viewImg.onload = function () {
                    var cas = topDocument.querySelector('.crop-image-preview');
                    var ctx = cas.getContext('2d');
                    cas.width = this.naturalWidth;
                    cas.height = this.naturalHeight;
                    ctx.drawImage(this, 0, 0, this.naturalWidth, this.naturalHeight);
                };
            })
        });
    }

    if (window.self === window.top) {
        $(topDocument).off('click', '#image-submit-btn').on('click', '#image-submit-btn', function () {
            var file = topDocument.querySelector('.image-upload-hidden-input').files[0];
            var imgName = this.parentNode.querySelector('input.upload-image-name-ipt');
            // 上传
            var cas = topDocument.querySelector('.crop-image-preview');
            // 获取裁剪的图像blob并且格式化上传的数据.
            cas.toBlob(function (blob) {
                var formObj = document.querySelector('.image-upload');
                if (formObj === null || typeof formObj === "undefined") {
                    formObj = topDocument.querySelector('#J_iframe').contentDocument.querySelector('.image-upload');
                }
                var id = formObj.getAttribute('data-id') ? 0 : formObj.getAttribute('data-id');
                var ajaxTarget = formObj.getAttribute('data-target');
                var formData = new FormData();

                if (ajaxTarget == null) {
                    layer.alert('出现了一点小问题, 请刷新页面重试.',
                        {
                            icon: 0,
                            shadeClose: true,
                            title: '错误'
                        });
                    return false;
                }

                // 获取数据并插入.
                if (!imgName.classList.contains('hidden-dom')) {
                    if (!imgName.value) {
                        layer.alert('请填写图片名称', {
                            icon: 0,
                            shadeClose: true,
                            title: '警告'
                        });
                        return false;
                    }
                    var bannerInfo = {
                        id: id,
                        type: 0,
                        imgUrl: '',
                        name: imgName.value.trim()
                    };
                    var newFile = new File(
                        [blob],
                        file.name.trim(),
                        {
                            type: blob.type,
                            lastModified: Date.now()
                        }
                    );
                    formData.append('file', newFile);
                    formData.append('bannerInfo', JSON.stringify(bannerInfo));

                    $.ajax({
                        type: 'post',
                        data: formData,
                        url: atob(ajaxTarget),
                        processData: false,
                        contentType: false,
                        complete: function (xhr, textStatus) {
                            var status = xhr.status;
                            var resData = xhr.responseText.length != 0 ? JSON.parse(xhr.responseText) : null;
                            if (status == 200) {
                                layer.alert('上传成功!',
                                    {
                                        icon: 1,
                                        title: '成功',
                                        shadeClose: true
                                    });
                                // 关闭上传窗口
                                var closeBtn = topDocument.querySelector('.close-upload-btn');
                                if (closeBtn !== null && typeof closeBtn !== "undefined") {
                                    closeBtn.click();
                                } else {
                                    topDocument.querySelector('#image-reset-btn').click();
                                    self.closeUpload();
                                }

                                // 刷新图片
                                var slideItemArgs = [
                                    {
                                        nodeType: 'div',
                                        class: 'slide-item animated',
                                        'data-slider-id': resData['id'],
                                        innerHTML: [
                                            {
                                                nodeType: 'i',
                                                class: 'fa fa-close slider-list-item-delete'
                                            },
                                            {
                                                nodeType: 'img',
                                                src: resData['imgUrl'],
                                                alt: resData['name'],
                                                onerror: 'imgLoadFailed(this);'
                                            },
                                            {nodeType: 'h4', innerText: resData['name']},
                                            {nodeType: 'p'}
                                        ]
                                    }
                                ];
                                var slideBox = document.querySelector('.slide-config-box') || document.querySelector('#J_iframe').contentDocument.querySelector('.slide-config-box');
                                var slideItem = FlowerShop.Tools.prototype.createDom(slideItemArgs)[0];
                                slideBox.insertBefore(slideItem, slideBox.querySelector('.slide-item.add-new'));
                            } else {
                                layer.alert('上传失败, 请重试或联系管理员',
                                    {
                                        icon: 2,
                                        shadeClose: true,
                                        title: '错误'
                                    });
                            }
                        }
                    });
                } else {
                    var clickDom = document.querySelector('.category-upload-image-click') || document.querySelector('#J_iframe').contentDocument.querySelector('.category-upload-image-click');
                    var imageDom = clickDom.querySelector('img');
                    imageDom.src = window.URL.createObjectURL(blob);
                    clickDom.setAttribute('title', file.name);
                    clickDom.setAttribute('data-image', cas.toDataURL('image/png'));
                    // 关闭上传窗口
                    var closeBtn = topDocument.querySelector('.close-upload-btn');
                    if (closeBtn) {
                        closeBtn.click();
                    } else {
                        topDocument.querySelector('#image-reset-btn').click();
                        self.closeUpload();
                    }
                    clickDom.classList.remove('category-upload-image-click');
                    clickDom.querySelector('.hidden-dom').classList.remove('hidden-dom');
                }
            });
        });
    }

    if (window.self === window.top) {
        $(topDocument).off('click', '#image-reset-btn').on('click', '#image-reset-btn', function () {
            var index = this.getAttribute('data-target-order');
            var cropBox = topDocument.querySelector('.upload-image-crop-box');
            var imageUploadForm = topDocument.querySelector('#image-upload-box');
            var uploadBtn = topDocument.querySelector('.upload-image-btn-box #image-submit-btn');
            var imageNameIpt = topDocument.querySelector('.upload-image-btn-box .upload-image-name-ipt');

            imageNameIpt.value = '';
            cropBox.innerHTML = '<img class="crop-view-image">';
            if (uploadBtn !== null && typeof uploadBtn !== "undefined") {
                uploadBtn.innerHTML = '裁剪';
                uploadBtn.id = 'image-crop-btn';
            }
            imageUploadForm.removeAttribute('style');
            imageUploadForm.reset();
            self.pageJump(index);
        });
    }

    if (window.self === window.top) {
        $(topDocument).off('click', '.close-upload-btn').on('click', '.close-upload-btn', function () {
            topDocument.querySelector('#image-reset-btn').click();
            self.closeUpload();
        });
    }
};


FlowerShop.Control.prototype.openUpload = function () {
    var uploadMask = FlowerShop.App.getTopDocument().querySelector('#modal-mask');
    var uploadBox = FlowerShop.App.getTopDocument().querySelector('#image-upload-box');
    uploadBox.className = uploadBox.className.replace('upload-box-close', 'upload-box-open');
    uploadMask.className = uploadMask.className.replace('modal-mask-close', 'modal-mask-open');
    uploadBox.classList.add('fadeInDown');
};

FlowerShop.Control.prototype.closeUpload = function () {
    var uploadMask = FlowerShop.App.getTopDocument().querySelector('#modal-mask');
    var uploadBox = FlowerShop.App.getTopDocument().querySelector('#image-upload-box');
    uploadBox.className = uploadBox.className.replace('upload-box-open', 'upload-box-close');
    uploadMask.className = uploadMask.className.replace('modal-mask-open', 'modal-mask-close');
    uploadBox.classList.remove('fadeInDown');
};

FlowerShop.Control.prototype.pageJump = function (index) {
    var uploadOrderTab = FlowerShop.App.getTopDocument().querySelector('#image-upload-box .upload-image-tab');
    var aloneWidth = parseInt(getComputedStyle(uploadOrderTab, null)['width']);
    var xMargin = aloneWidth * index;
    uploadOrderTab.style.cssText += 'margin-left: -' + xMargin + 'px';
};


// 轮播控件
var Carousel = {
    // 获取到的轮播图片列表
    list: {},
    // 请求url
    add_url: url.slider.add,
    list_url: url.slider.list,
    delete_url: url.slider.delete,
    // 默认设置
    config: {
        interval: 4000, // 图片切换时间, 单位微秒
        ratio: 21 / 9, // 图片长宽比
        height: 720, // 图片默认高度
        width: 1680, // 图片默认宽度
        unit: 'px' // 单位
    },
    // 初始化方法
    __init: {
        list: function () {
            var html = '';
            var slideBox = document.querySelector('.slide-config-box');
            for (var i = 0; i < Carousel.list.length; i++) {
                var slideItemArgs = [
                    {
                        nodeType: 'div',
                        class: 'slide-item animated',
                        'data-slider-id': Carousel.list[i]['id'],
                        innerHTML: [
                            {
                                nodeType: 'i',
                                class: 'fa fa-close slider-list-item-delete'
                            },
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
