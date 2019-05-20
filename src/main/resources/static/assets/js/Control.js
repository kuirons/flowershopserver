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
        var isCategory = imageUploadBtn.classList.contains('category-image-box');
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
                                            class: (isCategory ? 'hidden-dom ' : '') + 'upload-image-name-ipt'
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
        var uploadBox = topDocument.querySelector('#image-upload-box');
        if (!uploadBox) {
            self.init.ImageUploadControlDom();
            uploadBox = topDocument.querySelector('#image-upload-box');
        }
        if (uploadBox !== null && typeof uploadBox !== "undefined" && uploadBox.classList.contains('upload-box-open')) {
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
                                        shadeClose: true,
                                        title: '成功'
                                    });

                                // todo - 实时刷新上传的图片


                                // 关闭上传窗口
                                var closeBtn = topDocument.querySelector('.close-upload-btn');
                                if (closeBtn !== null && typeof closeBtn !== "undefined") {
                                    closeBtn.click();
                                } else {
                                    topDocument.querySelector('#image-reset-btn').click();
                                    self.closeUpload();
                                }
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
                    // todo - 三张图上传
                    // var bannerInfo = {
                    //     id: id,
                    //     type: 0,
                    //     imgUrl: '',
                    //     name: imgName.value.trim()
                    // };
                    // var newFile = new File(
                    //     [blob],
                    //     file.name.trim(),
                    //     {
                    //         type: blob.type,
                    //         lastModified: Date.now()
                    //     }
                    // );
                    // formData.append('file', newFile);
                    // formData.append('bannerInfo', JSON.stringify(bannerInfo));
                    //
                    // $.ajax({
                    //     type: 'post',
                    //     data: formData,
                    //     url: atob(ajaxTarget),
                    //     processData: false,
                    //     contentType: false,
                    //     complete: function (xhr, textStatus) {
                    //         var status = xhr.status;
                    //         var resData = xhr.responseText.length != 0 ? JSON.parse(xhr.responseText) : null;
                    //         if (status == 200) {
                    //             layer.alert('上传成功!',
                    //                 {
                    //                     icon: 1,
                    //                     shadeClose: true,
                    //                     title: '成功'
                    //                 });
                    //
                    //             // todo - 实时刷新上传的图片
                    //
                    //
                    //             // 关闭上传窗口
                    //             var closeBtn = topDocument.querySelector('.close-upload-btn');
                    //             if (closeBtn !== null && typeof closeBtn !== "undefined") {
                    //                 closeBtn.click();
                    //             } else {
                    //                 topDocument.querySelector('#image-reset-btn').click();
                    //                 self.closeUpload();
                    //             }
                    //         } else {
                    //             layer.alert('上传失败, 请重试或联系管理员',
                    //                 {
                    //                     icon: 2,
                    //                     shadeClose: true,
                    //                     title: '错误'
                    //                 });
                    //         }
                    //     }
                    // });
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

FlowerShop.Control.prototype.createFilterDom = function () {
    var filterData = FlowerShop.Control.prototype.initData['filter'];
    var filterBox = document.querySelector('.filter-control-box');
    var activeSlug = filterBox.getAttribute('data-active-slug');
    var activeParentSlug = filterBox.getAttribute('data-active-parent-slug');
    if (typeof filterBox == "undefined" || filterBox == null) {
        return false;
    }
    var filterType = filterBox.getAttribute('data-filter-type');
    switch (filterType) {
        case 'enquiry_tax':
            var locationsHtmlStr = '';
            var functionsHtmlStr = '';
            var software_industrysHtmlStr = '';

            var locations = filterData[filterType]['location'];
            var functions = filterData[filterType]['function'];
            var software_industrys = filterData[filterType]['software_industry'];

            var locationListDom = $('.filter-control-row[data-tax-type=location] .filter-control-options');
            var functionListDom = $('.filter-control-row[data-tax-type=function] .filter-control-options');
            var softIndyListDom = $('.filter-control-row[data-tax-type=software_industry] .filter-control-options');

            for (var idx in locations) {
                var activeClass = (locations[idx]['slug'] == activeSlug || locations[idx]['slug'] == activeParentSlug) ? 'active-filter-control-item' : '';
                if (typeof locations[idx]['child'] != "undefined" && locations[idx]['child'] != null) {
                    locationsHtmlStr += '<li class="filter-control-item ' + activeClass + ' filter-control-item-has-child" data-item-id="' + locations[idx]['term_id'] + '"><a href="//' + window.location.host + '/enquiry/?tax_type=location&tax_slug=' + locations[idx]['slug'] + '">' + locations[idx]['name'] + ' <i class="fa fa-caret-down"></i></a></li>'
                } else {
                    locationsHtmlStr += '<li class="filter-control-item ' + activeClass + '"><a href="//' + window.location.host + '/enquiry/?tax_type=location&tax_slug=' + locations[idx]['slug'] + '">' + locations[idx]['name'] + '</a></li>'
                }
            }

            for (var idx in functions) {
                var activeClass = (functions[idx]['slug'] == activeSlug || functions[idx]['slug'] == activeParentSlug) ? 'active-filter-control-item' : '';
                if (typeof functions[idx]['child'] != "undefined" && functions[idx]['child'] != null) {
                    functionsHtmlStr += '<li class="filter-control-item ' + activeClass + ' filter-control-item-has-child" data-item-id="' + functions[idx]['term_id'] + '"><a href="//' + window.location.host + '/enquiry/?tax_type=function&tax_slug=' + functions[idx]['slug'] + '">' + functions[idx]['name'] + ' <i class="fa fa-caret-down"></i></a></li>'
                } else {
                    functionsHtmlStr += '<li class="filter-control-item ' + activeClass + '"><a href="//' + window.location.host + '/enquiry/?tax_type=function&tax_slug=' + functions[idx]['slug'] + '">' + functions[idx]['name'] + '</a></li>'
                }
            }

            for (var idx in software_industrys) {
                var activeClass = (software_industrys[idx]['slug'] == activeSlug || software_industrys[idx]['slug'] == activeParentSlug) ? 'active-filter-control-item' : '';
                if (typeof software_industrys[idx]['child'] != "undefined" && software_industrys[idx]['child'] != null) {
                    software_industrysHtmlStr += '<li class="filter-control-item ' + activeClass + ' filter-control-item-has-child" data-item-id="' + software_industrys[idx]['term_id'] + '"><a href="//' + window.location.host + '/enquiry/?tax_type=software_industry&tax_slug=' + software_industrys[idx]['slug'] + '">' + software_industrys[idx]['name'] + ' <i class="fa fa-caret-down"></i></a></li>'
                } else {
                    software_industrysHtmlStr += '<li class="filter-control-item ' + activeClass + '"><a href="//' + window.location.host + '/enquiry/?tax_type=software_industry&tax_slug=' + software_industrys[idx]['slug'] + '">' + software_industrys[idx]['name'] + '</a></li>'
                }
            }

            locationListDom.append(locationsHtmlStr);
            functionListDom.append(functionsHtmlStr);
            softIndyListDom.append(software_industrysHtmlStr);
            if (parseInt(locationListDom.css('height')) - 20 > parseInt(locationListDom.find('.filter-control-item').css('height'))) {
                locationListDom.css('height', 41);
                locationListDom.parent().append('<span class="filter-control-more" data-extend="0"><i class="fa fa-plus"></i> 展开</span>');
            }

            if (parseInt(functionListDom.css('height')) - 20 > parseInt(functionListDom.find('.filter-control-item').css('height'))) {
                functionListDom.css('height', 41);
                functionListDom.parent().append('<span class="filter-control-more" data-extend="0"><i class="fa fa-plus"></i> 展开</span>');
            }

            if (parseInt(softIndyListDom.css('height')) - 20 > parseInt(softIndyListDom.find('.filter-control-item').css('height'))) {
                softIndyListDom.css('height', 41);
                softIndyListDom.parent().append('<span class="filter-control-more" data-extend="0"><i class="fa fa-plus"></i> 展开</span>');
            }

            $('.filter-control-more').on('click', function () {

                if ($(this).attr('data-extend') == 0) {
                    $(this).attr('data-extend', 1);
                    $(this).prev().css('height', 'auto');
                    $(this).html('<i class="fa fa-minus"></i> 收起');
                } else {
                    $(this).attr('data-extend', 0);
                    $(this).prev().css('height', 41);
                    $(this).html('<i class="fa fa-plus"></i> 展开');
                }
            });

            var list = $('.filter-control-item-has-child');
            list.on('mouseenter mouseleave', function (event) {

                if (event.type == 'mouseenter') {
                    var childHtml = '';
                    var termId = $(this).attr('data-item-id');
                    var offTop = parseInt(this.offsetTop) + parseInt(this.offsetHeight) - 5;
                    var taxType = $(this).parents('.filter-control-row').attr('data-tax-type');
                    var taxChildData = FlowerShop.Control.prototype.initData['filter'][filterType][taxType][termId]['child'];
                    for (var idx in taxChildData) {
                        var activeClass = taxChildData[idx]['slug'] == activeSlug ? 'active-filter-control-item' : '';
                        childHtml += '<li class="filter-control-item ' + activeClass + '"><a href="//' + window.location.host + '/enquiry/?tax_type=' + filterType + '&tax_slug=' + taxChildData[idx]['slug'] + '&tax_parent_slug=' + FlowerShop.Control.prototype.initData['filter'][filterType][taxType][termId]['slug'] + '">' + taxChildData[idx]['name'] + '</a></li>';
                    }
                    $(this).append('<div class="filter-control-child-row" style="top: ' + offTop + 'px">' + childHtml + '</div>');
                } else {
                    $(this).find('.filter-control-child-row').remove();
                }
            });

            break;
        case 'special_tax':
            var functionsHtmlStr = '';
            var specialCatsHtmlStr = '';
            var software_industrysHtmlStr = '';

            var functions = filterData[filterType]['function'];
            var specialCats = filterData[filterType]['special_cat'];
            var software_industrys = filterData[filterType]['software_industry'];

            var functionListDom = $('.filter-control-row[data-tax-type=function] .filter-control-options');
            var specialCatListDom = $('.filter-control-row[data-tax-type=special_cat] .filter-control-options');
            var softIndyListDom = $('.filter-control-row[data-tax-type=software_industry] .filter-control-options');

            for (var idx in specialCats) {
                var activeClass = (specialCats[idx]['slug'] == activeSlug || specialCats[idx]['slug'] == activeParentSlug) ? 'active-filter-control-item' : '';
                if (typeof specialCats[idx]['child'] != "undefined" && specialCats[idx]['child'] != null) {
                    specialCatsHtmlStr += '<li class="filter-control-item ' + activeClass + ' filter-control-item-has-child" data-item-id="' + specialCats[idx]['term_id'] + '"><a href="//' + window.location.host + '/special/?tax_type=special_cat&tax_slug=' + specialCats[idx]['slug'] + '">' + specialCats[idx]['name'] + ' <i class="fa fa-caret-down"></i></a></li>'
                } else {
                    specialCatsHtmlStr += '<li class="filter-control-item ' + activeClass + '"><a href="//' + window.location.host + '/special/?tax_type=special_cat&tax_slug=' + specialCats[idx]['slug'] + '">' + specialCats[idx]['name'] + '</a></li>'
                }
            }

            for (var idx in functions) {
                var activeClass = (functions[idx]['slug'] == activeSlug || functions[idx]['slug'] == activeParentSlug) ? 'active-filter-control-item' : '';
                if (typeof functions[idx]['child'] != "undefined" && functions[idx]['child'] != null) {
                    functionsHtmlStr += '<li class="filter-control-item ' + activeClass + ' filter-control-item-has-child" data-item-id="' + functions[idx]['term_id'] + '"><a href="//' + window.location.host + '/special/?tax_type=function&tax_slug=' + functions[idx]['slug'] + '">' + functions[idx]['name'] + ' <i class="fa fa-caret-down"></i></a></li>'
                } else {
                    functionsHtmlStr += '<li class="filter-control-item ' + activeClass + '"><a href="//' + window.location.host + '/special/?tax_type=function&tax_slug=' + functions[idx]['slug'] + '">' + functions[idx]['name'] + '</a></li>'
                }
            }

            for (var idx in software_industrys) {
                var activeClass = (software_industrys[idx]['slug'] == activeSlug || software_industrys[idx]['slug'] == activeParentSlug) ? 'active-filter-control-item' : '';
                if (typeof software_industrys[idx]['child'] != "undefined" && software_industrys[idx]['child'] != null) {
                    software_industrysHtmlStr += '<li class="filter-control-item ' + activeClass + ' filter-control-item-has-child" data-item-id="' + software_industrys[idx]['term_id'] + '"><a href="//' + window.location.host + '/special/?tax_type=software_industry&tax_slug=' + software_industrys[idx]['slug'] + '">' + software_industrys[idx]['name'] + ' <i class="fa fa-caret-down"></i></a></li>'
                } else {
                    software_industrysHtmlStr += '<li class="filter-control-item ' + activeClass + '"><a href="//' + window.location.host + '/special/?tax_type=software_industry&tax_slug=' + software_industrys[idx]['slug'] + '">' + software_industrys[idx]['name'] + '</a></li>'
                }
            }

            functionListDom.append(functionsHtmlStr);
            specialCatListDom.append(specialCatsHtmlStr);
            softIndyListDom.append(software_industrysHtmlStr);
            if (parseInt(functionListDom.css('height')) - 20 > parseInt(functionListDom.find('.filter-control-item').css('height'))) {
                functionListDom.css('height', 41);
                functionListDom.parent().append('<span class="filter-control-more" data-extend="0"><i class="fa fa-plus"></i> 展开</span>');
            }

            if (parseInt(specialCatListDom.css('height')) - 20 > parseInt(specialCatListDom.find('.filter-control-item').css('height'))) {
                specialCatListDom.css('height', 41);
                specialCatListDom.parent().append('<span class="filter-control-more" data-extend="0"><i class="fa fa-plus"></i> 展开</span>');
            }

            if (parseInt(softIndyListDom.css('height')) - 20 > parseInt(softIndyListDom.find('.filter-control-item').css('height'))) {
                softIndyListDom.css('height', 41);
                softIndyListDom.parent().append('<span class="filter-control-more" data-extend="0"><i class="fa fa-plus"></i> 展开</span>');
            }

            $('.filter-control-more').on('click', function () {

                if ($(this).attr('data-extend') == 0) {
                    $(this).attr('data-extend', 1);
                    $(this).prev().css('height', 'auto');
                    $(this).html('<i class="fa fa-minus"></i> 收起');
                } else {
                    $(this).attr('data-extend', 0);
                    $(this).prev().css('height', 41);
                    $(this).html('<i class="fa fa-plus"></i> 展开');
                }
            });

            var list = $('.filter-control-item-has-child');
            list.on('mouseenter mouseleave', function (event) {

                if (event.type == 'mouseenter') {
                    var childHtml = '';
                    var termId = $(this).attr('data-item-id');
                    var offTop = parseInt(this.offsetTop) + parseInt(this.offsetHeight) - 5;
                    var taxType = $(this).parents('.filter-control-row').attr('data-tax-type');
                    var taxChildData = FlowerShop.Control.prototype.initData['filter'][filterType][taxType][termId]['child'];
                    for (var idx in taxChildData) {
                        var activeClass = taxChildData[idx]['slug'] == activeSlug ? 'active-filter-control-item' : '';
                        childHtml += '<li class="filter-control-item ' + activeClass + '"><a href="//' + window.location.host + '/special/?tax_type=' + taxType + '&tax_slug=' + taxChildData[idx]['slug'] + '&tax_parent_slug=' + FlowerShop.Control.prototype.initData['filter'][filterType][taxType][termId]['slug'] + '">' + taxChildData[idx]['name'] + '</a></li>';
                    }
                    $(this).append('<div class="filter-control-child-row" style="top: ' + offTop + 'px">' + childHtml + '</div>');
                } else {
                    $(this).find('.filter-control-child-row').remove();
                }
            });

            break;
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
