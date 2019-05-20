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
        colNames: ['序号', '用户名称', '用户密码', '用户类别', '当前余额'],
        colModel: [
            {
                key: true,
                name: 'id',
                search: true,
                editable: false,
                sorttype: 'int',
            },
            {
                name: 'userName',
                index: 'userName',
                editable: true
            },
            {
                name: 'password',
                index: 'password',
                editable: true,
                formatter: function (cellValue, options, rowObject) {
                    return '*'.repeat(cellValue.length);
                }
            },
            {
                name: 'type',
                index: 'type',
                editable: true,
                formatter: function (cellValue, options, rowObject) {
                    var role = '';
                    switch (cellValue) {
                        case 0:
                            role = '管理员';
                            break;
                        case 1:
                            role = '买家';
                            break;
                        case 2:
                            role = '卖家';
                            break;
                        default:
                            break;
                    }
                    return role;
                }
            },
            {
                name: 'money',
                index: 'money',
                editable: false,
                sorttype: "int",
                formatter: function (cellValue, options, rowObject) {
                    return '¥ ' + cellValue;
                }
            }
        ],
        pager: "#paper-user-list",
        viewrecords: true,
        add: false,
        edit: false,
        addtext: 'Add',
        edittext: 'Edit',
        hidegrid: false
    };

    $.get(url.user.list, function (response, status, xhr) {
        if (xhr.status == 500) response = [];
        options.data = response;

        $("#user-list").jqGrid(options);

        // Add selection
        $("#user-list").setSelection(4, true);

        // Setup buttons
        $("#user-list").jqGrid('navGrid', '#paper-user-list', {
            edit: false,
            add: false,
            del: false,
            search: true
        }, {
            height: 200,
            reloadAfterSubmit: true
        });
        
        $("#user-list").navButtonAdd('#paper-user-list', {
            caption: '',
            title: '删除',
            position: 'first',
            buttonicon: 'glyphicon glyphicon-trash',
            onClickButton: deleteUsers,
        });

        $("#user-list").navButtonAdd('#paper-user-list', {
            caption: '',
            title: '修改',
            position: 'first',
            buttonicon: 'glyphicon glyphicon-edit',
            onClickButton: showEditUser,
        });

        $("#user-list").navButtonAdd('#paper-user-list', {
            caption: '',
            title: '添加',
            position: "first",
            buttonicon: "glyphicon glyphicon-plus",
            onClickButton: showAddUser,
        });

        // Add responsive to jqGrid
        $(window).bind('resize', function () {
            var width = $('.jqGrid_wrapper').width();
            $('#user-list').setGridWidth(width);
        });
    }, 'json');
});

function showAddUser () {
    return false;
}
function showEditUser () {
    return false;
}
function deleteUsers () {
    return false;
}
