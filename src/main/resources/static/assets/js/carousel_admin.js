'use strict';

$(document).ready(function () {
    // 初始化首页导航列表
    $.get(url.classify.list, function (response, status) {
        for (var i = 0; i < response.length; i++) {
            var navItemArgs = [
                {
                    nodeType: 'li',
                    'data-list-id': response[i]['id'],
                    class: 'nav-list-item nav-list-order-item d-' + response[i]['id'] + 1,
                    innerHTML: [
                        {
                            nodeType: 'i',
                            class: 'fa fa-close nav-list-order-item-delete'
                        },
                        {
                            nodeType: 'span',
                            innerText: response[i]['title']
                        }
                    ]
                }
            ];
            var navItem = FlowerShop.Tools.prototype.createDom(navItemArgs)[0];
            document.querySelector('.nav-list-box').insertBefore(navItem, document.querySelector('.nav-list-item.add-nav-item'));
        }
    }, 'json');
    $('.nav-list-order-item').arrangeable();
    /*
                        <li class="nav-list-item nav-list-order-item d-1" data-list-id="0">
                            <i class="fa fa-close nav-list-order-item-delete"></i>
                            <span>测试数据0</span>
                        </li>
    * */

    // 绑定添加事件
    $('.add-nav-item').on('click', function () {
        var navIndex = document.querySelectorAll('.add-nav-item').length;
        var navItemArgs = [
            {
                nodeType: 'li',
                'data-list-id': navIndex,
                class: 'nav-list-item nav-list-order-item d-' + navIndex + 1,
                innerHTML: [
                    {
                        nodeType: 'i',
                        class: 'fa fa-close nav-list-order-item-delete'
                    },
                    {
                        nodeType: 'span',
                        innerText: '请输入导航名称'
                    }
                ]
            }
        ];
        var navItem = FlowerShop.Tools.prototype.createDom(navItemArgs)[0];
        this.parentNode.insertBefore(navItem, this);
    });
    // todo 绑定删除事件
    $('.nav-list-box').on('click', '.nav-list-order-item-delete', function () {
        var orderItemsList = this.parentNode.parentNode;
        var orderItems = orderItemsList.querySelector('.nav-list-order-item');
        this.parentNode.parentNode.removeChild(this.parentNode);
        for (var i = 0; i < orderItems.length; i++) {
            orderItems[i].className = 'nav-list-item nav-list-order-item d-' + (i + 1);
        }
    });

    // todo 绑定修改事件
    $('.nav-list-box').on('dblclick', '.nav-list-order-item', function () {
        var id = this.getAttribute('data-id');
        var itemIpt = this.querySelector('span');
        var oldValue = itemIpt.innerText;
        // 行内编辑的方式
        // var editDomArgs = [
        //     {
        //         nodeType: 'i',
        //         class: 'fa fa-close nav-list-order-item-delete'
        //     },
        //     {
        //         type: 'text',
        //         value: value,
        //         nodeType: 'input',
        //         'data-old-value': value,
        //         class: 'nav-list-order-item-edit'
        //     }
        // ];
        // var editDoms = FlowerShop.Tools.prototype.createDom(editDomArgs);
        // while (this.hasChildNodes())
        //     this.removeChild(this.firstChild);
        // for (var j = 0; j < editDoms.length; j++)
        //     this.appendChild(editDoms[j]);
        // this.querySelector('.nav-list-order-item-edit').focus();


        // 弹出框编辑的方式
        layer.prompt({
                value: oldValue,
                shadeClose: true,
                title: '编辑导航条目',
            }, function (val, index, element) {
                var jsonData = JSON.stringify({id: 0, title: val});
                // todo 调用ajax修改导航条目
                $.get(url.classify.add, {classinfos: jsonData}, function (response, status, xhr) {
                    // 成功则回调更改原条目
                    if (xhr.status == 200) {
                        itemIpt.innerText = val;
                    } else {
                        layer.msg('插入失败!');
                    }
                    layer.close(index);
                });
            }
        );
    });

    // 配置行内编辑的编辑
    // $('.nav-list-box').on('blur', '.nav-list-order-item-edit', function () {
    //     if (this.value == null || this.value.length == 0 || this.value == this.getAttribute('data-old-value')) {
    //         resetNavItem(this.parentNode, this.getAttribute('data-old-value'));
    //     } else {
    //         resetNavItem(this.parentNode, this.value);
    //     }
    // });
    //
    // $('.nav-list-box').on('keyup', '.nav-list-order-item-edit', function (event) {
    //     event = event || window.event;
    //     var keyCode = event.keyCode || event.which;
    //     switch (keyCode) {
    //         case 13:
    //             resetNavItem(this.parentNode, this.value);
    //             break;
    //         case 27:
    //             resetNavItem(this.parentNode, this.getAttribute('data-old-value'));
    //             break;
    //         default:
    //             break;
    //     }
    // });

    // 初始化轮播管理
    $.get(Carousel.list_url, function (data) {
        if (typeof data != 'undefined' && data.length != 0) {
            Carousel.list = data;
            for (var key in Carousel.__init) {
                Carousel.__init[key]();
            }
        }
    },"json");
    // 删除轮播图片
    $('.slide-config-box').on('click', '.slider-list-item-delete', function () {
        var sliderItem = this.parentNode;
        var sliderId = this.parentNode.getAttribute('data-slider-id');
        $.get(Carousel.delete_url, {bannerId: sliderId}, function (data) {
            sliderItem.parentNode.removeChild(sliderItem);
            console.log(data);
        });
    });

    // 分类列表编辑
    $('.category-select-box').selectpicker({});

    // 添加分类
    $('.add-category-item').click(function () {
        layer.prompt({
            title: '新增分类',
            shadeClose: true,
            yes: function (val, index) {
                // todo 调用ajax创建新的分类


                layer.close(index);
            }
        });
    });
});

// 首页导航调整.
function changeNav() {
}

// 首页导航重置单个(行内编辑)
// function resetNavItem(itemDom, value) {
//     var navItemArgs = [
//         {
//             nodeType: 'i',
//             class: 'fa fa-close nav-list-order-item-delete'
//         },
//         {
//             nodeType: 'span',
//             innerText: value
//         }
//     ];
//
//     var navItem = FlowerShop.Tools.prototype.createDom(navItemArgs);
//     while (itemDom.hasChildNodes())
//         itemDom.removeChild(itemDom.firstChild);
//     for (var i = 0; i < navItem.length; i++)
//         itemDom.appendChild(navItem[i]);
// }

// 首页轮播图片上传

// $('.slide-box input[type=file]').on('change', function () {
//     var img = this.files[0];
//     var formData = new FormData();
//     formData.append('file', img);
//     formData.append('name', '测试图片');
//     Carousel.__action.add(formData, function (data, textStatus, jqXHR) {
//         if (data.length == 0)
//             alert('上传成功!');
//         else
//             alert('上传失败!');
//     }, function (data) {
//         alert('上传失败!');
//         console.log(data);
//     })
// });
