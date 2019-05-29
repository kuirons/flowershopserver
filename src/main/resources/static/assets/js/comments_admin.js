"use strict";

$(document).ready(function () {
    // 初始化表格
    $.jgrid.defaults.styleUI = 'Bootstrap';

    var options = {
        data: [],
        height: 450,
        autowidth: true,
        shrinkToFit: true,
        datatype: "local",
        rowNum: 20,
        rowList: [10, 20, 30],
        colNames: ['序号', '商品名称', '评论用户', '评论事件', '评论内容'],
        colModel: [
            {
                key: true,
                name: 'id',
                search: true,
                editable: false,
                sorttype: 'int',
            },
            {
                name: 'goodsName',
                index: 'goodName',
                editable: false
                // formatter:
            },
            {
                name: 'createUser',
                index: 'createUser',
                editable: false
            },
            {
                name: 'createTime',
                index: 'createTime',
                editable: false,
                sorttype: "date",
                formatter: function (cellValue, options, rowObject) {
                    var date = new Date(parseInt(cellValue));
                    var dateStr = date.getFullYear() + '年' + date.getMonth() + '月' + date.getDate() + '日 ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
                    return dateStr;
                }
            },
            {
                name: 'comment',
                index: 'comment',
                editable: true,
                edittype: 'text'
            }
        ],
        pager: "#paper-comments-list",
        viewrecords: true,
        add: false,
        edit: false,
        addtext: 'Add',
        edittext: 'Edit',
        hidegrid: false
    };

    $.get(url.comment.list, function (response, status, xhr) {
        if (xhr.status == 500) response = [];
        options.data = response;

        $("#comments-list").jqGrid(options);

        // Add selection
        $("#comments-list").setSelection(4, true);

        // Setup buttons
        $("#comments-list").jqGrid('navGrid', '#paper-comments-list', {
            edit: false,
            add: false,
            del: false,
            search: true
        }, {
            height: 200,
            reloadAfterSubmit: true
        });

        // $("#comments-list").navButtonAdd('#paper-comments-list', {
        //     caption: '',
        //     title: '删除',
        //     position: 'first',
        //     buttonicon: 'glyphicon glyphicon-trash',
        //     onClickButton: deleteComment,
        // });

        // Add responsive to jqGrid
        $(window).bind('resize', function () {
            var width = $('.jqGrid_wrapper').width();
            $('#comments-list').setGridWidth(width);
        });
    }, 'json');
});


// function deleteComment () {
//     return false
// }