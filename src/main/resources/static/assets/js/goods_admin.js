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
        colNames: ['序号', '缩略图', '名称', '分类'],
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
                edittype: 'image',
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
                align: "left",
                editable: true,
                name: 'classify',
                index: 'classify',
                edittype: 'select',
                editoptions: {
                    value: function () {
                        var tmpAry = {};
                        var selectAry = {};
                        $.ajax({
                            type: 'GET',
                            async: false,
                            dataType: 'json',
                            url: url.classify.list,
                            success: function (response, status, xhr) {
                                if (xhr.status == 200) {
                                    tmpAry = response;
                                } else {
                                    layer.msg('数据获取错误, 请刷新重试');
                                }
                            },
                            error: function (xhr, textStatus, errorThrown) {
                                layer.msg('error: ' + textStatus);
                            }
                        });
                        for (var i = 0; i < tmpAry.length; i++) {
                            selectAry[tmpAry[i].title] = tmpAry[i].title;
                        }
                        return selectAry;
                    }
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
    // todo 补一个Ajax方法进行数据拉取
    $.get(url.goods.list, function (response, status, xhr) {
        if (xhr.status == 200) {
            options.data = response;

            $("#goods-list").jqGrid(options);

            // Add selection
            $("#goods-list").setSelection(4, true);

            // Setup buttons
            $("#goods-list").jqGrid('navGrid', '#paper-goods-list', {
                edit: true,
                add: true,
                del: true,
                search: true
            }, {
                height: 200,
                reloadAfterSubmit: true
            });

            // Add responsive to jqGrid
            $(window).bind('resize', function () {
                var width = $('.jqGrid_wrapper').width();
                $('#goods-list').setGridWidth(width);
            });
        }
    }, 'json');
});
