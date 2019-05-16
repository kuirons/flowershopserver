"use strict";

$(document).ready(function () {
    // 初始化表格
    $.jgrid.defaults.styleUI = 'Bootstrap';
    // Examle data for jqGrid
    var mydata
    $.ajax({
        type: 'post',
        url: vendorOrder,
        dataType: 'json',
        async: false,
        success: function (data) {
            mydata = data
        }
    })
    // Configuration for jqGrid Example 2
    $("#order-list").jqGrid({
        data: mydata,
        datatype: "local",
        height: 450,
        autowidth: true,
        shrinkToFit: true,
        rowNum: 20,
        rowList: [10, 20, 30],
        colNames: ['序号', '源订单', '商家', '订单状态', '买家', '地址', '总额', '支付方式', '确认发货'],
        colModel: [
            {
                name: 'id',
                index: 'id',
                editable: false,
                width: 60,
                sorttype: "int",
                search: true
            },
            {
                name: 'orderId',
                index: 'orderId',
                editable: false,
                width: 60,
                sorttype: "int",
                search: true,
                hidden: true
            },
            {
                name: 'vendor',
                index: 'vendor',
                editable: false,
                width: 100,
                hidden: true
            },
            {
                name: 'status',
                index: 'status',
                editable: false,
                width: 100,
                formatter: function statusMap(cellvalue, options, rowObject) {
                    if ("1" == cellvalue)
                        return '已发货'
                    return '待发货'
                }
            },
            {
                name: 'buyUser',
                index: 'buyUser',
                editable: false,
                width: 100
            },
            {
                name: 'address',
                index: 'address',
                editable: false,
                width: 120
            },
            {
                name: 'amount',
                index: 'amount',
                editable: true,
                width: 80,
                align: "left",
                sorttype: "float",
                formatter: "number"
            },
            {
                name: 'payChannel',
                index: 'payChannel',
                editable: false,
                width: 100,
            },
            {
                name: 'operate', index: 'operate',
                reloadAfterSubmit: true,
                formatter: function (value, grid, rows, state) {
                    if ("-1" == rows.status)
                        return '<a href="javascript:void(0)" style="color:#f60" onclick="sendGoods(' + JSON.stringify(rows).replace(/"/g, '&quot;') + ',' + JSON.stringify(grid).replace(/"/g, '&quot;') + ')">确认发货</a>';
                    return ''
                }
            }
        ],
        pager: "#paper-order-list",
        viewrecords: true,
        caption: "订单管理",
        add: true,
        edit: true,
        addtext: 'Add',
        edittext: 'Edit',
        hidegrid: false
    });

    // Add selection
    $("#order-list").setSelection(4, true);

    // Setup buttons
    $("#order-list").jqGrid('navGrid', '#paper-order-list', {
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
        $('#order-list').setGridWidth(width);
    });
});

function sendGoods(rows, grid) {
    rows.status = 1
    console.log(rows)
    $.ajax({
        type: "POST",
        url: sendGoodss,
        data: JSON.stringify(rows),
        contentType: "application/json",
        dataType: "json",
        success: function (msg) {
            layer.msg("确认发货成功，等待买家收货")
            $("#order-list").setCell(grid.rowId, 3, "1")
            $("#order-list").setCell(grid.rowId, 8, "1")
        },
        error: function (msg) {
            layer.msg("确认发货失败，请联系管理员")
        }
    });
}
