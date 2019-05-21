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
                sorttype: 'int',
                formatter: function (cellValue, options, rowObject) {
                    return options.rowId;
                }
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
                    return '<span data-source="' + btoa(cellValue) + '">' + '*'.repeat(cellValue.length) + '</span>';
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
                    return '<span data-source="' + cellValue + '">' + role + '</span>';
                }
            },
            {
                name: 'money',
                index: 'money',
                editable: false,
                sorttype: "int",
                formatter: function (cellValue, options, rowObject) {
                    return '<span data-source="' + cellValue + '">¥ ' + cellValue + '</span>';
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


var userFormArgs = [
    {
        id: 'user-form',
        nodeType: 'form',
        class: 'layer-form',
        innerHTML: [
            {
                nodeType: 'p',
                id: 'user-type',
                class: 'layer-form-item',
                innerHTML: [
                    {
                        nodeType: 'select',
                        innerHTML: [
                            {
                                value: 2,
                                innerText: '卖家',
                                nodeType: 'option'
                            },
                            {
                                value: 1,
                                innerText: '买家',
                                nodeType: 'option'
                            },
                            {
                                value: 0,
                                innerText: '管理员',
                                nodeType: 'option'
                            }
                        ]
                    }
                ]
            },
            {
                id: 'username',
                nodeType: 'p',
                class: 'layer-form-item',
                innerHTML: [
                    {
                        type: 'text',
                        nodeType: 'input',
                        placeholder: '请输入用户名'
                    }
                ]
            },
            {
                id: 'password',
                nodeType: 'p',
                class: 'layer-form-item',
                innerHTML: [
                    {
                        type: 'password',
                        nodeType: 'input',
                        placeholder: '请输入用户密码'
                    }
                ]
            },
            {
                id: 'balance',
                nodeType: 'p',
                class: 'layer-form-item',
                innerHTML: [
                    {
                        min: 0,
                        value: 0,
                        type: 'number',
                        nodeType: 'input',
                        placeholder: '请输入用户初始余额'
                    }
                ]
            },
            {
                nodeType: 'p',
                id: 'user-avatar',
                class: 'layer-form-item layer-image-upload user-avatar-upload'
            },
            {
                type: 'file',
                nodeType: 'input',
                class: 'hidden-file-input',
                id: 'user-avatar-file-input',
                accept: 'image/gif, image/jpeg, image/png'
            }
        ]
    }
];

function showAddUser() {
    layer.closeAll();
    layer.open({
        type: 1,
        shadeClose: true,
        title: '添加新用户',
        skin: 'add-user-box',
        btn: ['创建', '重置'],
        area: ['480px', '320px'],
        yes: function (index, box) {
            var money = box.find('#balance input').val();
            var username = box.find('#username input').val();
            var password = box.find('#password input').val();
            var userType = box.find('#user-type select').val();

            if (username.length == 0 || password.length == 0) {
                layer.alert('用户名或密码不能为空',
                    {
                        icon: 0,
                        title: '警告',
                        shadeClose: true
                    });
                return false;
            }

            // 组合数据
            var formData = new FormData();
            var jsonValue = {
                userinfo: JSON.stringify({
                    logo_url: "",
                    type: userType,
                    userName: username,
                    password: password,
                    money: money ? money : 0
                })
            };
            formData.append('userinfo', jsonValue.userinfo);
            $.ajax({
                type: 'post',
                data: formData,
                url: url.user.add,
                processData: false,
                contentType: false,
                complete: function (xhr, textStatus) {
                    var status = xhr.status;
                    var resData = xhr.responseText.length != 0 ? JSON.parse(xhr.responseText) : null;
                    if (status == 200) {
                        layer.close(index);
                        layer.alert('新建用户成功!',
                            {
                                icon: 1,
                                title: '成功',
                                shadeClose: true,
                                yes: function () {
                                    window.location.reload();
                                }
                            });
                    } else {
                        layer.alert('创建失败, 请重试或联系管理员',
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
            box.find('#user-form .layer-image-upload').removeAttr('style');
            box.find('#user-form')[0].reset();
            return false;
        },
        success: function (box, index) {
            // 初始化创建表单

            // 初始化类别选择
            box.find('#user-type select').selectpicker({});

            // 绑定选择图片事件
            box.find('#user-form .layer-image-upload').click(function () {
                box.find('#user-form #user-avatar-file-input').click();
            });

            // 预览当前上传的图片
            box.find('#user-form #user-avatar-file-input').change(function () {
                if (this.files.length != 0) {
                    var imageUploadDom = box.find('#user-form .user-avatar-upload');
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
            return FlowerShop.Tools.prototype.createDom(userFormArgs)[0].outerHTML;
        }()
    });
}

function showEditUser() {
    var rowId = $('#user-list').jqGrid('getGridParam', 'selrow');
    if (!rowId) {
        layer.alert('未选择用户',
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
        title: '编辑用户',
        skin: 'edit-user-box',
        btn: ['更新', '重置'],
        area: ['480px', '320px'],
        yes: function (index, box) {
            var money = box.find('#balance input').val();
            var username = box.find('#username input').val();
            var password = box.find('#password input').val();
            var userType = box.find('#user-type select').val();

            if (username.length == 0 || password.length == 0) {
                layer.alert('用户名或密码不能为空',
                    {
                        icon: 0,
                        title: '警告',
                        shadeClose: true
                    });
                return false;
            }

            // 组合数据
            var formData = new FormData();
            var jsonValue = {
                userinfo: JSON.stringify({
                    logo_url: "",
                    type: userType,
                    userName: username,
                    password: password,
                    money: money ? money : 0
                })
            };
            formData.append('userInfoJson', jsonValue.userinfo);
            $.ajax({
                type: 'post',
                data: formData,
                processData: false,
                contentType: false,
                url: url.user.update,
                complete: function (xhr, textStatus) {
                    var status = xhr.status;
                    var resData = xhr.responseText.length != 0 ? JSON.parse(xhr.responseText) : null;
                    if (status == 200) {
                        layer.close(index);
                        layer.alert('更新用户成功!',
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
            box.find('#user-form .layer-image-upload').removeAttr('style');
            box.find('#user-form')[0].reset();
            return false;
        },
        success: function (box, index) {
            // 获取当前选中对象的数据
            // 后端没写接口, 所以从表格中获取数据.
            var rowData = $("#user-list").jqGrid('getRowData', rowId);

            // 初始化用户信息
            box.find('#username input').val(rowData.userName);
            box.find('#balance input').val(FlowerShop.Tools.prototype.getSource(rowData.money));
            box.find('#password input').val(atob(FlowerShop.Tools.prototype.getSource(rowData.password)));
            box.find('#user-type select').selectpicker({
                defaultValue: FlowerShop.Tools.prototype.getSource(rowData.type)
            });

            // 绑定选择图片事件
            box.find('#user-form .layer-image-upload').click(function () {
                box.find('#user-form #user-avatar-file-input').click();
            });

            // 预览当前上传的图片
            box.find('#user-form #user-avatar-file-input').change(function () {
                if (this.files.length != 0) {
                    var imageUploadDom = box.find('#user-form .user-avatar-upload');
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
            return FlowerShop.Tools.prototype.createDom(userFormArgs)[0].outerHTML;
        }()
    });
}

function deleteUsers() {
    var rowId = $('#user-list').jqGrid('getGridParam', 'selrow');
    if (!rowId) {
        layer.alert('未选择用户',
            {
                icon: 0,
                shadeClose: true,
                title: '警告'
            });
        return false;
    }
    layer.closeAll();
    var rowData = $("#user-list").jqGrid('getRowData', rowId);
    layer.confirm(
        '确定要删除 ' + rowData.userName + ' 用户吗？',
        {icon: 3, title: '提示'},
        function (index_1, element) {
            layer.close(index_1);
            $.get(url.user.delete, {userName: rowData.userName}, function () {
                layer.alert('用户 ' + rowData.userName + '已成功删除.',
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
