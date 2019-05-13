"use strict";

$(document).ready(function () {
    // 初始化表格
    $.jgrid.defaults.styleUI = 'Bootstrap';
    // Examle data for jqGrid
    // todo 补一个Ajax方法进行数据拉取
    var mydata = [
        {
            id: "1",
            invdate: "2010-05-24",
            name: "test",
            note: "note",
            tax: "10.00",
            total: "2111.00"
        },
        {
            id: "2",
            invdate: "2010-05-25",
            name: "test2",
            note: "note2",
            tax: "20.00",
            total: "320.00"
        },
        {
            id: "3",
            invdate: "2007-09-01",
            name: "test3",
            note: "note3",
            tax: "30.00",
            total: "430.00"
        },
        {
            id: "4",
            invdate: "2007-10-04",
            name: "test",
            note: "note",
            tax: "10.00",
            total: "210.00"
        },
        {
            id: "5",
            invdate: "2007-10-05",
            name: "test2",
            note: "note2",
            tax: "20.00",
            total: "320.00"
        },
        {
            id: "6",
            invdate: "2007-09-06",
            name: "test3",
            note: "note3",
            tax: "30.00",
            total: "430.00"
        },
        {
            id: "7",
            invdate: "2007-10-04",
            name: "test",
            note: "note",
            tax: "10.00",
            total: "210.00"
        },
        {
            id: "8",
            invdate: "2007-10-03",
            name: "test2",
            note: "note2",
            amount: "300.00",
            tax: "21.00",
            total: "320.00"
        },
        {
            id: "9",
            invdate: "2007-09-01",
            name: "test3",
            note: "note3",
            amount: "400.00",
            tax: "30.00",
            total: "430.00"
        },
        {
            id: "11",
            invdate: "2007-10-01",
            name: "test",
            note: "note",
            amount: "200.00",
            tax: "10.00",
            total: "210.00"
        },
        {
            id: "12",
            invdate: "2007-10-02",
            name: "test2",
            note: "note2",
            amount: "300.00",
            tax: "20.00",
            total: "320.00"
        },
        {
            id: "13",
            invdate: "2007-09-01",
            name: "test3",
            note: "note3",
            amount: "400.00",
            tax: "30.00",
            total: "430.00"
        },
        {
            id: "14",
            invdate: "2007-10-04",
            name: "test",
            note: "note",
            amount: "200.00",
            tax: "10.00",
            total: "210.00"
        },
        {
            id: "15",
            invdate: "2007-10-05",
            name: "test2",
            note: "note2",
            amount: "300.00",
            tax: "20.00",
            total: "320.00"
        },
        {
            id: "16",
            invdate: "2007-09-06",
            name: "test3",
            note: "note3",
            amount: "400.00",
            tax: "30.00",
            total: "430.00"
        },
        {
            id: "17",
            invdate: "2007-10-04",
            name: "test",
            note: "note",
            amount: "200.00",
            tax: "10.00",
            total: "210.00"
        },
        {
            id: "18",
            invdate: "2007-10-03",
            name: "test2",
            note: "note2",
            amount: "300.00",
            tax: "20.00",
            total: "320.00"
        },
        {
            id: "19",
            invdate: "2007-09-01",
            name: "test3",
            note: "note3",
            amount: "400.00",
            tax: "30.00",
            total: "430.00"
        },
        {
            id: "21",
            invdate: "2007-10-01",
            name: "test",
            note: "note",
            amount: "200.00",
            tax: "10.00",
            total: "210.00"
        },
        {
            id: "22",
            invdate: "2007-10-02",
            name: "test2",
            note: "note2",
            amount: "300.00",
            tax: "20.00",
            total: "320.00"
        },
        {
            id: "23",
            invdate: "2007-09-01",
            name: "test3",
            note: "note3",
            amount: "400.00",
            tax: "30.00",
            total: "430.00"
        },
        {
            id: "24",
            invdate: "2007-10-04",
            name: "test",
            note: "note",
            amount: "200.00",
            tax: "10.00",
            total: "210.00"
        },
        {
            id: "25",
            invdate: "2007-10-05",
            name: "test2",
            note: "note2",
            amount: "300.00",
            tax: "20.00",
            total: "320.00"
        },
        {
            id: "26",
            invdate: "2007-09-06",
            name: "test3",
            note: "note3",
            amount: "400.00",
            tax: "30.00",
            total: "430.00"
        },
        {
            id: "27",
            invdate: "2007-10-04",
            name: "test",
            note: "note",
            amount: "200.00",
            tax: "10.00",
            total: "210.00"
        },
        {
            id: "28",
            invdate: "2007-10-03",
            name: "test2",
            note: "note2",
            amount: "300.00",
            tax: "20.00",
            total: "320.00"
        },
        {
            id: "29",
            invdate: "2007-09-01",
            name: "test3",
            note: "note3",
            amount: "400.00",
            tax: "30.00",
            total: "430.00"
        }
    ];

    // Configuration for jqGrid Example 2
    $("#order-list").jqGrid({
        data: mydata,
        datatype: "local",
        height: 450,
        autowidth: true,
        shrinkToFit: true,
        rowNum: 20,
        rowList: [10, 20, 30],
        colNames: ['序号', '日期', '客户', '金额', '运费', '总额', '备注'],
        colModel: [
            {
                name: 'id',
                index: 'id',
                editable: true,
                width: 60,
                sorttype: "int",
                search: true
            },
            {
                name: 'invdate',
                index: 'invdate',
                editable: true,
                width: 90,
                sorttype: "date",
                formatter: "date"
            },
            {
                name: 'name',
                index: 'name',
                editable: true,
                width: 100
            },
            {
                name: 'amount',
                index: 'amount',
                editable: true,
                width: 80,
                align: "right",
                sorttype: "float",
                formatter: "number"
            },
            {
                name: 'tax',
                index: 'tax',
                editable: true,
                width: 80,
                align: "right",
                sorttype: "float"
            },
            {
                name: 'total',
                index: 'total',
                editable: true,
                width: 80,
                align: "right",
                sorttype: "float"
            },
            {
                name: 'note',
                index: 'note',
                editable: true,
                width: 100,
                sortable: false
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