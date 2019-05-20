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
    $("#comments-list").jqGrid({
        data: mydata,
        datatype: "local",
        height: 450,
        autowidth: true,
        shrinkToFit: true,
        rowNum: 20,
        rowList: [10, 20, 30],
        colNames: ['序号', '商品名称', '评论用户', '评论时间', '评论内容'],
        colModel: [
            {
                key: true,
                name: 'id',
                search: true,
                editable: false,
                sorttype: 'int',
            },
            {
                name: 'goodsId',
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
            },
        ],
        pager: "#paper-comments-list",
        viewrecords: true,
        add: false,
        edit: false,
        addtext: 'Add',
        edittext: 'Edit',
        hidegrid: false
    });

    // Add selection
    $("#comments-list").setSelection(4, true);

    // Setup buttons
    $("#comments-list").jqGrid('navGrid', '#paper-comments-list', {
        edit: false,
        add: false,
        del: true,
        search: true
    }, {
        height: 200,
        reloadAfterSubmit: true
    });

    // Add responsive to jqGrid
    $(window).bind('resize', function () {
        var width = $('.jqGrid_wrapper').width();
        $('#comments-list').setGridWidth(width);
    });
});
