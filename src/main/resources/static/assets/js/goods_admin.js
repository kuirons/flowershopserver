"use strict";

$(document).ready(function () {
    // 初始化表格
    $.jgrid.defaults.styleUI = 'Bootstrap';
    // 初始化选项
    var options = {
        data: [],
        rowNum: 20,
        height: 640,
        autowidth: true,
        datatype: "local",
        shrinkToFit: true,
        rowList: [20, 50, 100],
        colNames: ['序号', '图片', '名称', '价格', '销量', '分类'],
        colModel: [
            {
                key: true,
                name: 'id',
                index: 'id',
                search: true,
                editable: false,
                sorttype: 'int',
                formatter: function (cellValue, options, rowObject) {
                    return '<span data-source="' + cellValue + '">' + options.rowId + '</span>';
                }
            },
            {
                search: false,
                name: 'imgUrl',
                editable: true,
                sortable: false,
                edittype: 'file',
                editoptions: {enctype: 'multipart/form-data'},
                index: 'previewImg',
                formatter: function (cellValue, options, rowObject) {
                    return '<img src="' + cellValue + '" class="good-preview-image" onerror="imgLoadFailed(this)" onclick=\'layerImage(this, ' + JSON.stringify(rowObject) + ')\'>';
                }
            },
            {
                name: 'name',
                index: 'name',
                editable: true,
                edittype: 'text',
                editrules: {
                    required: true
                }
                // formatter: function (cellValue, options, rowObject) {
                //     return '<a target="_blank" href="./good_info.html?id=' + rowObject.id + '">' + cellValue + '</a>';
                // }
            },
            {
                name: 'price',
                index: 'price',
                editable: true,
                edittype: 'int',
            },
            {
                name: 'sale',
                index: 'sale',
                editable: true,
                edittype: 'int',
            },
            {
                align: "left",
                editable: true,
                name: 'categoryId',
                index: 'categoryId',
                formatter: function (cellValue, options, rowObject) {
                    var name = '';
                    $.ajax({
                        type: 'get',
                        async: false,
                        data: {id: cellValue},
                        url: url.category.info,
                        success: function (response, status, xhr) {
                            name = response[0].name;
                        }
                    });
                    return name;
                }
            }
        ],
        pager: "#paper-goods-list",
        viewrecords: true,
        add: true,
        edit: true,
        addtext: 'Add',
        edittext: 'Edit',
        hidegrid: false
    };
    $.get(url.goods.list, function (response, status, xhr) {
        if (xhr.status == 500) response = [];
        options.data = response;

        $("#goods-list").jqGrid(options);

        // Add selection
        $("#goods-list").setSelection(4, true);

        // Setup buttons
        $("#goods-list").jqGrid('navGrid', '#paper-goods-list', {
            edit: false,
            add: false,
            del: false,
            search: true
        }, {
            height: 200,
            reloadAfterSubmit: true
        });

        $("#goods-list").navButtonAdd('#paper-goods-list', {
            caption: '',
            title: '删除',
            position: 'first',
            buttonicon: 'glyphicon glyphicon-trash',
            onClickButton: deleteGoods,
        });

        $("#goods-list").navButtonAdd('#paper-goods-list', {
            caption: '',
            title: '修改',
            position: 'first',
            buttonicon: 'glyphicon glyphicon-edit',
            onClickButton: showEditGoods,
        });

        $("#goods-list").navButtonAdd('#paper-goods-list', {
            caption: '',
            title: '添加',
            position: "first",
            buttonicon: "glyphicon glyphicon-plus",
            onClickButton: showAddGoods,
        });

        // Add responsive to jqGrid
        $(window).bind('resize', function () {
            var width = $('.jqGrid_wrapper').width();
            $('#goods-list').setGridWidth(width);
        });
    }, 'json');
});


// 添加商品
// 使用Layer弹窗
function showAddGoods() {
    layer.closeAll();
    layer.open({
        type: 1,
        shadeClose: true,
        title: '添加新商品',
        skin: 'add-goods-box',
        btn: ['发布', '重置'],
        yes: function (index, box) {
            var itemImage = null;
            var infoImage = null;
            var title = box.find('#title input').val();
            var classify = box.find('#classify select').val();
            var sale = box.find('#sale input').val() ? box.find('#sale input').val() : 0;
            var price = box.find('#price input').val() ? box.find('#price input').val() : 0;
            if (box.find('#hidden-file-input').length != 0 && box.find('#hidden-file-input')[0].files.length != 0) {
                itemImage = box.find('#hidden-file-input')[0].files[0];
            }
            if (box.find('#info-hidden-file-input').length != 0 && box.find('#info-hidden-file-input')[0].files.length != 0) {
                infoImage = box.find('#info-hidden-file-input')[0].files;
            }

            // 组合数据
            var formData = new FormData();
            var jsonValue = {
                goodsItemInfoJson: JSON.stringify({
                    id: 0,
                    imgUrl: '',
                    vendor: '',
                    sale: sale,
                    name: title,
                    price: price,
                    campaignId: 0,
                    categoryId: classify,
                    detailInfosImgUrl: []
                })
            };
            for (var imgIndex = 0; imgIndex < infoImage.length; imgIndex++) {
                formData.append('detailsInfos', infoImage[imgIndex]);
            }
            formData.append('goodsitemfile', itemImage);
            formData.append('goodsItemInfoJson', jsonValue.goodsItemInfoJson);
            $.ajax({
                type: 'post',
                data: formData,
                url: url.goods.add,
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
                                shadeClose: true,
                                yes: function () {
                                    window.location.reload();
                                }
                            });
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
        },
        btn2: function (index, box) {
            box.find('#goods-form .goods-image-upload').removeAttr('style');
            box.find('#goods-form')[0].reset();
            return false;
        },
        area: ['800px', '600px'],
        success: function (box, index) {
            // 初始化创建表单

            // 初始化类别选择
            $.ajax({
                type: 'GET',
                async: false,
                dataType: 'json',
                url: url.category.list,
                success: function (response, status, xhr) {
                    if (xhr.status == 200) {
                        for (var i = 0; i < response.length; i++) {
                            var optionItem = classifyArgs();
                            optionItem.value = response[i].id;
                            optionItem.innerText = response[i].name;
                            box.find('#classify select').append($(FlowerShop.Tools.prototype.createDom({optionItem})[0]));
                        }
                    } else {
                        layer.msg('数据获取错误, 请刷新重试');
                    }
                },
                error: function (xhr, textStatus, errorThrown) {
                    layer.msg('error: ' + textStatus);
                }
            });
            box.find('#classify select').selectpicker({});

            // 绑定选择图片事件
            box.find('#goods-form .goods-image-upload').click(function () {
                var id = $(this).prop('id');
                if (id == 'goods-item-image') {
                    box.find('#hidden-file-input').click();
                } else if (id == 'goods-item-info-image') {
                    box.find('#info-hidden-file-input').click();
                }
            });

            // 预览当前上传的图片
            box.find('#goods-form #hidden-file-input').change(function () {
                if (this.files.length != 0) {
                    var imageUploadDom = box.find('#goods-form #goods-item-image');
                    FlowerShop.Tools.prototype.getImage(this.files[0], function (image) {
                        // 展示图片DOM的比例
                        // var imageBoxRatio = parseInt(imageUploadDom.css('width')) / parseInt(imageUploadDom.css('height'));
                        // 图片原始比例
                        var imageRatio = parseInt(image.naturalWidth) / parseInt(image.naturalHeight);
                        // 计算需要展示图片的大小
                        var compWidth = null, compHeight = null;
                        // 图片缩放后的长宽
                        var backgroundSize = null;
                        var zoomImageWidth = parseInt(parseInt(imageUploadDom.css('height')) * parseInt(imageRatio));
                        var zoomImageHeight = parseInt(parseInt(imageUploadDom.css('width')) / parseInt(imageRatio));
                        // 根据已有信息判断是否缩放图片
                        if (image.naturalWidth > parseInt(imageUploadDom.css('width')) || image.naturalHeight > parseInt(imageUploadDom.css('height'))) {
                            if (zoomImageHeight > parseInt(imageUploadDom.css('height'))) {
                                zoomImageHeight = parseInt(imageUploadDom.css('height')) * 0.95;
                                zoomImageWidth = zoomImageHeight * imageRatio;
                            } else if (zoomImageWidth > parseInt(imageUploadDom.css('width'))) {
                                zoomImageWidth = parseInt(imageUploadDom.css('width')) * 0.95;
                                zoomImageHeight = zoomImageWidth / imageRatio;
                            } else {
                                zoomImageHeight = zoomImageHeight * 0.95;
                                zoomImageWidth = zoomImageHeight * imageRatio;
                            }
                            backgroundSize = zoomImageWidth + 'px ' + zoomImageHeight + 'px';
                        } else {
                            backgroundSize = 'auto';
                        }
                        // 根据设置计算后的数值.
                        var cssValue = 'url("' + image.src + '") no-repeat';
                        imageUploadDom.css('background', cssValue);
                        imageUploadDom.css('background-size', backgroundSize);
                        imageUploadDom.css('background-position', 'center');
                    });
                }
            });

            // 预览选择图片, 只展示第一张, 没时间做.
            box.find('#goods-form #info-hidden-file-input').change(function () {
                if (this.files.length != 0) {
                    var imageUploadDom = box.find('#goods-form #goods-item-info-image');
                    FlowerShop.Tools.prototype.getImage(this.files[0], function (image) {
                        // 展示图片DOM的比例
                        // var imageBoxRatio = parseInt(imageUploadDom.css('width')) / parseInt(imageUploadDom.css('height'));
                        // 图片原始比例
                        var imageRatio = parseInt(image.naturalWidth) / parseInt(image.naturalHeight);
                        // 计算需要展示图片的大小
                        var compWidth = null, compHeight = null;
                        // 图片缩放后的长宽
                        var backgroundSize = null;
                        var zoomImageWidth = parseInt(parseInt(imageUploadDom.css('height')) * parseInt(imageRatio));
                        var zoomImageHeight = parseInt(parseInt(imageUploadDom.css('width')) / parseInt(imageRatio));
                        // 根据已有信息判断是否缩放图片
                        if (image.naturalWidth > parseInt(imageUploadDom.css('width')) || image.naturalHeight > parseInt(imageUploadDom.css('height'))) {
                            if (zoomImageHeight > parseInt(imageUploadDom.css('height'))) {
                                zoomImageHeight = parseInt(imageUploadDom.css('height')) * 0.95;
                                zoomImageWidth = zoomImageHeight * imageRatio;
                            } else if (zoomImageWidth > parseInt(imageUploadDom.css('width'))) {
                                zoomImageWidth = parseInt(imageUploadDom.css('width')) * 0.95;
                                zoomImageHeight = zoomImageWidth / imageRatio;
                            } else {
                                zoomImageHeight = zoomImageHeight * 0.95;
                                zoomImageWidth = zoomImageHeight * imageRatio;
                            }
                            backgroundSize = zoomImageWidth + 'px ' + zoomImageHeight + 'px';
                        } else {
                            backgroundSize = 'auto';
                        }
                        // 根据设置计算后的数值.
                        var cssValue = 'url("' + image.src + '") no-repeat';
                        imageUploadDom.css('background', cssValue);
                        imageUploadDom.css('background-size', backgroundSize);
                        imageUploadDom.css('background-position', 'center');
                    });
                }
            });
        },
        content: function () {
            return FlowerShop.Tools.prototype.createDom(goodsFormArgs)[0].outerHTML;
        }()
    });
}


function showEditGoods() {
    // 获取当前选中的行
    var rowId = $('#goods-list').jqGrid('getGridParam', 'selrow');
    if (!rowId) {
        layer.alert('未选择商品',
            {
                icon: 0,
                shadeClose: true,
                title: '警告'
            });
        return false;
    }

    layer.closeAll();
    layer.open({
        type: 1,
        shadeClose: true,
        title: '更新商品',
        skin: 'add-goods-box',
        btn: ['更新', '重置'],
        yes: function (index, box) {
            var itemImage = null;
            var infoImage = null;
            var sale = box.find('#sale input').val();
            var price = box.find('#price input').val();
            var title = box.find('#title input').val();
            var classify = box.find('#classify select').val();
            var goodsInfo = JSON.parse(box.attr('data-info'));
            if (box.find('#hidden-file-input').length != 0 && box.find('#hidden-file-input')[0].files.length != 0) {
                itemImage = box.find('#hidden-file-input')[0].files[0];
            }
            if (box.find('#info-hidden-file-input').length != 0 && box.find('#info-hidden-file-input')[0].files.length != 0) {
                infoImage = box.find('#info-hidden-file-input')[0].files;
            }
            // 后端没做过滤,所以需要检验数据.
            if (!infoImage && !infoImage) {
                layer.alert('请选择需要更新的图片',
                    {
                        icon: 2,
                        shadeClose: true,
                        title: '错误'
                    });
                return false;
            }

            // 组合数据
            var formData = new FormData();
            var jsonValue = {
                goodsItemInfoJson: JSON.stringify({
                    imgUrl: '',
                    sale: sale,
                    name: title,
                    price: price,
                    id: goodsInfo.id,
                    categoryId: classify,
                    vendor: goodsInfo.vendor,
                    campaignId: goodsInfo.campaignId,
                    detailInfosImgUrl: [
                        {
                            id: 0,
                            imgurl: '',
                            goodsitemid: goodsInfo.id,
                        }
                    ]
                })
            };
            for (var imgIndex = 0; imgIndex < infoImage.length; imgIndex++) {
                formData.append('detailsInfos', infoImage[imgIndex]);
            }
            formData.append('goodsitemfile', itemImage);
            formData.append('itemjson', jsonValue.goodsItemInfoJson);
            $.ajax({
                type: 'post',
                data: formData,
                url: url.goods.update,
                processData: false,
                contentType: false,
                complete: function (xhr, textStatus) {
                    var status = xhr.status;
                    var resData = xhr.responseText.length != 0 ? JSON.parse(xhr.responseText) : null;
                    if (status == 200) {
                        layer.alert('更新成功!',
                            {
                                icon: 1,
                                title: '成功',
                                shadeClose: true,
                                yes: function () {
                                    window.location.reload();
                                }
                            });
                    } else {
                        layer.alert('更新失败, 请重试或联系管理员',
                            {
                                icon: 2,
                                shadeClose: true,
                                title: '错误'
                            });
                    }
                }
            });
        },
        btn2: function (index, box) {
            box.find('#goods-form .goods-image-upload').removeAttr('style');
            box.find('#goods-form')[0].reset();
            return false;
        },
        area: ['800px', '600px'],
        success: function (box, index) {
            // 初始化创建表单
            var goodsInfo = {};
            var rowData = $("#goods-list").jqGrid('getRowData', rowId);
            var goodsId = FlowerShop.Tools.prototype.getSource(rowData.id);
            $.ajax({
                type: 'GET',
                async: false,
                dataType: 'json',
                url: url.goods.info,
                data: {id: goodsId},
                success: function (response, status, xhr) {
                    if (xhr.status == 200) {
                        if (response) {
                            goodsInfo = response;
                        }
                    } else {
                        layer.msg('数据获取错误, 请刷新重试');
                        return false;
                    }
                }
            });

            // 初始化类别选择
            $.ajax({
                type: 'GET',
                async: false,
                dataType: 'json',
                url: url.category.list,
                success: function (response, status, xhr) {
                    if (xhr.status == 200) {
                        for (var i = 0; i < response.length; i++) {
                            var optionItem = classifyArgs();
                            optionItem.value = response[i].id;
                            optionItem.innerText = response[i].name;
                            box.find('#classify select').append($(FlowerShop.Tools.prototype.createDom({optionItem})[0]));
                        }
                    } else {
                        layer.msg('数据获取错误, 请刷新重试');
                    }
                },
                error: function (xhr, textStatus, errorThrown) {
                    layer.msg('error: ' + textStatus);
                }
            });
            // 初始化用户信息
            box.find('#sale input').val(goodsInfo.sale);
            box.find('#title input').val(goodsInfo.name);
            box.find('#price input').val(goodsInfo.price);
            box.attr('data-info', JSON.stringify(goodsInfo));
            box.find('#classify select').selectpicker('val', goodsInfo.categoryId);

            // 绑定选择图片事件
            box.find('#goods-form .goods-image-upload').click(function () {
                var id = $(this).prop('id');
                if (id == 'goods-item-image') {
                    box.find('#hidden-file-input').click();
                } else if (id == 'goods-item-info-image') {
                    box.find('#info-hidden-file-input').click();
                }
            });

            // 预览当前上传的图片
            box.find('#goods-form #hidden-file-input').change(function () {
                if (this.files.length != 0) {
                    var imageUploadDom = box.find('#goods-form #goods-item-image');
                    FlowerShop.Tools.prototype.getImage(this.files[0], function (image) {
                        // 展示图片DOM的比例
                        // var imageBoxRatio = parseInt(imageUploadDom.css('width')) / parseInt(imageUploadDom.css('height'));
                        // 图片原始比例
                        var imageRatio = parseInt(image.naturalWidth) / parseInt(image.naturalHeight);
                        // 计算需要展示图片的大小
                        var compWidth = null, compHeight = null;
                        // 图片缩放后的长宽
                        var backgroundSize = null;
                        var zoomImageWidth = parseInt(parseInt(imageUploadDom.css('height')) * parseInt(imageRatio));
                        var zoomImageHeight = parseInt(parseInt(imageUploadDom.css('width')) / parseInt(imageRatio));
                        // 根据已有信息判断是否缩放图片
                        if (image.naturalWidth > parseInt(imageUploadDom.css('width')) || image.naturalHeight > parseInt(imageUploadDom.css('height'))) {
                            if (zoomImageHeight > parseInt(imageUploadDom.css('height'))) {
                                zoomImageHeight = parseInt(imageUploadDom.css('height')) * 0.95;
                                zoomImageWidth = zoomImageHeight * imageRatio;
                            } else if (zoomImageWidth > parseInt(imageUploadDom.css('width'))) {
                                zoomImageWidth = parseInt(imageUploadDom.css('width')) * 0.95;
                                zoomImageHeight = zoomImageWidth / imageRatio;
                            } else {
                                zoomImageHeight = zoomImageHeight * 0.95;
                                zoomImageWidth = zoomImageHeight * imageRatio;
                            }
                            backgroundSize = zoomImageWidth + 'px ' + zoomImageHeight + 'px';
                        } else {
                            backgroundSize = 'auto';
                        }
                        // 根据设置计算后的数值.
                        var cssValue = 'url("' + image.src + '") no-repeat';
                        imageUploadDom.css('background', cssValue);
                        imageUploadDom.css('background-size', backgroundSize);
                        imageUploadDom.css('background-position', 'center');
                    });
                }
            });

            // 预览选择图片, 只展示第一张, 没时间做.
            box.find('#goods-form #info-hidden-file-input').change(function () {
                if (this.files.length != 0) {
                    var imageUploadDom = box.find('#goods-form #goods-item-info-image');
                    FlowerShop.Tools.prototype.getImage(this.files[0], function (image) {
                        // 展示图片DOM的比例
                        // var imageBoxRatio = parseInt(imageUploadDom.css('width')) / parseInt(imageUploadDom.css('height'));
                        // 图片原始比例
                        var imageRatio = parseInt(image.naturalWidth) / parseInt(image.naturalHeight);
                        // 计算需要展示图片的大小
                        var compWidth = null, compHeight = null;
                        // 图片缩放后的长宽
                        var backgroundSize = null;
                        var zoomImageWidth = parseInt(parseInt(imageUploadDom.css('height')) * parseInt(imageRatio));
                        var zoomImageHeight = parseInt(parseInt(imageUploadDom.css('width')) / parseInt(imageRatio));
                        // 根据已有信息判断是否缩放图片
                        if (image.naturalWidth > parseInt(imageUploadDom.css('width')) || image.naturalHeight > parseInt(imageUploadDom.css('height'))) {
                            if (zoomImageHeight > parseInt(imageUploadDom.css('height'))) {
                                zoomImageHeight = parseInt(imageUploadDom.css('height')) * 0.95;
                                zoomImageWidth = zoomImageHeight * imageRatio;
                            } else if (zoomImageWidth > parseInt(imageUploadDom.css('width'))) {
                                zoomImageWidth = parseInt(imageUploadDom.css('width')) * 0.95;
                                zoomImageHeight = zoomImageWidth / imageRatio;
                            } else {
                                zoomImageHeight = zoomImageHeight * 0.95;
                                zoomImageWidth = zoomImageHeight * imageRatio;
                            }
                            backgroundSize = zoomImageWidth + 'px ' + zoomImageHeight + 'px';
                        } else {
                            backgroundSize = 'auto';
                        }
                        // 根据设置计算后的数值.
                        var cssValue = 'url("' + image.src + '") no-repeat';
                        imageUploadDom.css('background', cssValue);
                        imageUploadDom.css('background-size', backgroundSize);
                        imageUploadDom.css('background-position', 'center');
                    });
                }
            });
        },
        content: function () {
            return FlowerShop.Tools.prototype.createDom(goodsFormArgs)[0].outerHTML;
        }()
    });
}

function deleteGoods() {
    // 获取当前选中的行
    var rowId = $('#goods-list').jqGrid('getGridParam', 'selrow');
    if (!rowId) {
        layer.alert('未选择商品',
            {
                icon: 0,
                shadeClose: true,
                title: '警告'
            });
        return false;
    }
    layer.closeAll();
    var rowData = $("#goods-list").jqGrid('getRowData', rowId);
    layer.confirm(
        '确定要删除 ' + rowData.name + ' 商品吗？',
        {icon: 3, title: '提示'},
        function (index_1, element) {
            layer.close(index_1);
            $.get(url.goods.delete, {id: FlowerShop.Tools.prototype.getSource(rowData.id)}, function () {
                layer.alert('商品 ' + rowData.name + '已成功删除.',
                    {
                        icon: 1,
                        title: '成功',
                        shadeClose: true,
                        yes: function (index_2, element) {
                            layer.close(index_2);
                            window.location.reload();
                        }
                    });
            });
        }
    );
}

// 分类选项DOM模板
var classifyArgs = function () {
    return {
        value: '',
        innerText: '',
        nodeType: 'option'
    };
};
// 增改表单页面DOM
var goodsFormArgs = [
    {
        id: 'goods-form',
        nodeType: 'form',
        innerHTML: [
            {
                id: 'title',
                nodeType: 'p',
                class: 'goods-form-item',
                innerHTML: [
                    {
                        type: 'text',
                        nodeType: 'input',
                        placeholder: '请输入商品名称'
                    }
                ]
            },
            {
                id: 'price',
                nodeType: 'p',
                class: 'goods-form-item',
                innerHTML: [
                    {
                        min: 0,
                        type: 'number',
                        nodeType: 'input',
                        placeholder: '请输入商品价格(RMB)'
                    }
                ]
            },
            {
                id: 'sale',
                nodeType: 'p',
                class: 'goods-form-item',
                innerHTML: [
                    {
                        min: 0,
                        type: 'number',
                        nodeType: 'input',
                        placeholder: '请输入商品库存'
                    }
                ]
            },
            {
                id: 'classify',
                nodeType: 'p',
                class: 'goods-form-item',
                innerHTML: [
                    {
                        nodeType: 'select',
                        placeholder: '请选择商品类别'
                    }
                ]
            },
            {
                nodeType: 'span',
                innerText: '商品图片',
                class: 'goods-form-prompt'
            },
            {
                nodeType: 'p',
                id: 'goods-item-image',
                class: 'goods-form-item goods-image-upload'
            },
            {
                nodeType: 'span',
                class: 'goods-form-prompt',
                innerText: '商品详细介绍图片(选择多张只展示第一张)'
            },
            {
                nodeType: 'p',
                id: 'goods-item-info-image',
                class: 'goods-form-item goods-image-upload'
            },
            {
                type: 'file',
                nodeType: 'input',
                id: 'hidden-file-input',
                accept: 'image/gif, image/jpeg, image/png'
            },
            {
                type: 'file',
                nodeType: 'input',
                multiple: 'multiple',
                id: 'info-hidden-file-input',
                accept: 'image/gif, image/jpeg, image/png'
            }
        ]
    }
];