"use strict";

$(document).ready(function () {
    // 初始化表格
    $.jgrid.defaults.styleUI = 'Bootstrap';
    // 初始化选项
    var options = {
        data: null,
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
                search: true,
                editable: false,
                sorttype: 'int',
            },
            {
                name: 'imgUrl',
                editable: true,
                edittype: 'file',
                editoptions: {enctype: 'multipart/form-data'},
                index: 'previewImg',
                formatter: function (cellValue, options, rowObject) {
                    return '<img src="' + cellValue + '" class="good-preview-image" onerror="imgLoadFailed(this)">';
                }
            },
            {
                name: 'title',
                index: 'title',
                editable: true,
                edittype: 'text',
                editrules: {
                    required: true
                },
                formatter: function (cellValue, options, rowObject) {
                    return '<a target="_blank" href="./good_info.html?id=' + rowObject.id + '">' + cellValue + '</a>';
                }
            },
            {
                name: 'price',
                index: 'price',
                editable: true,
                edittype:'int',
            },
            {
                name: 'sale',
                index: 'sale',
                editable: true,
                edittype:'int',
            },
            {
                align: "left",
                editable: true,
                name: 'category',
                index: 'categoryid',
                // formatter: function (cellValue, options, rowObject) {
                //     $.get(url.category.);
                //     return '<a target="_blank" href="./good_info.html?id=' + rowObject.id + '">' + cellValue + '</a>';
                // }
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
        if (xhr.status == 200) {
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
        }
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
                url: url.classify.list,
                success: function (response, status, xhr) {
                    if (xhr.status == 200) {
                        for (var i = 0; i < response.length; i++) {
                            var optionItem = classifyArgs();
                            optionItem.value = response[i].title;
                            optionItem.innerText = response[i].title;
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
                box.find('#hidden-file-input').click();
            });

            // 预览当前上传的图片
            box.find('#goods-form #hidden-file-input').change(function () {
                if (this.files.length != 0) {
                    var imageUploadDom = box.find('#goods-form .goods-image-upload');
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
                nodeType: 'p',
                id: 'image',
                class: 'goods-form-item goods-image-upload'
            },
            {
                type: 'file',
                nodeType: 'input',
                id: 'hidden-file-input'
            }
        ]
    }
];