'use strict';

$(document).ready(function () {
    // 初始化首页导航列表
    $.get(url.category.list, function (response, status) {
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
                            innerText: response[i]['name']
                        }
                    ]
                }
            ];
            var navItem = FlowerShop.Tools.prototype.createDom(navItemArgs)[0];
            document.querySelector('.nav-list-box').insertBefore(navItem, document.querySelector('.nav-list-item.add-nav-item'));
        }
    }, 'json');
    $('.nav-list-order-item').arrangeable();

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

    // 绑定删除事件
    $('.nav-list-box').on('click', '.nav-list-order-item-delete', function () {
        var self = this;
        var orderItemsList = this.parentNode.parentNode;
        var id = this.parentNode.getAttribute('data-list-id');
        var orderItems = orderItemsList.querySelector('.nav-list-order-item');
        $.get(url.category.delete, {id: id}, function (respnose, status, xhr) {
            if (xhr.status == 200) {
                self.parentNode.parentNode.removeChild(self.parentNode);
                for (var i = 0; i < orderItems.length; i++) {
                    orderItems[i].className = 'nav-list-item nav-list-order-item d-' + (i + 1);
                }
            } else {
                layer.alert('删除导航条目失败, 请重试',
                    {
                        icon: 0,
                        title: '错误',
                        shadeClose: true
                    });
            }
        });
    });

    // 绑定修改事件
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
                var jsonData = JSON.stringify({id: 0, name: val});
                $.get(url.category.add, {infosJosn: jsonData}, function (response, status, xhr) {
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
    }, "json");
    // 删除轮播图片
    $('.slide-config-box').on('click', '.slider-list-item-delete', function () {
        var sliderItem = this.parentNode;
        var sliderId = this.parentNode.getAttribute('data-slider-id');
        $.get(Carousel.delete_url, {bannerId: sliderId}, function (data) {
            sliderItem.parentNode.removeChild(sliderItem);
        });
    });

    // 分类列表初始化
    var categoryOptionArgs = function () {
        return {
            value: '',
            innerText: '',
            nodeType: 'option'
        }
    };
    $.get(url.classify.list, function (response) {
        if (response) {
            var optionsArgs = [];
            var imagesArray = {};
            for (var i = 0; i < response.length; i++) {
                var optionItem = new categoryOptionArgs();
                optionItem.value = response[i].id;
                optionItem.innerText = response[i].title;
                optionsArgs[i] = optionItem;
                imagesArray[response[i].title] = [];
            }
            // 创建DOM
            var optionsDom = FlowerShop.Tools.prototype.createDom(optionsArgs);
            for (var i = 0; i < optionsDom.length; i++) {
                document.querySelector('.goods-config-box .category-select-box').appendChild(optionsDom[i]);
            }
            // 获取类别图片信息并将信息存储到相应DOM上.
            $.get(url.classifyImage.list, function (imageInfos) {
                var choiceClassifyImgs = imagesArray[response[0].title];
                var imagesDom = document.querySelectorAll('.category-edit-box img');
                for (var j = 0; j < imageInfos.length; j++) {
                    imagesArray[imageInfos[j].belong2Title].push({
                        id: imageInfos[j].id,
                        title: imageInfos[j].title,
                        image: imageInfos[j].imgUrl,
                        belong2Title: imageInfos[j].belong2Title
                    });
                }
                document.querySelector('.goods-config-box .category-select-box').setAttribute('data-images-info', JSON.stringify(imagesArray));
                for (var imgIndex = 0; imgIndex < imagesDom.length; imgIndex++) {
                    if (choiceClassifyImgs.length != 0) {
                        imagesDom[imgIndex].src = choiceClassifyImgs[imgIndex].image;
                        imagesDom[imgIndex].title = choiceClassifyImgs[imgIndex].title;
                    } else {
                        imagesDom[imgIndex].src = '../assets/img/upload.png';
                    }
                }
                $('.category-select-box').selectpicker({});
            }, 'json');
        }
    }, "json");

    // 分类改变触发内容的改变
    $('.category-select-box').change(function () {
        var title = this.options[this.selectedIndex].text;
        var imagesDom = document.querySelectorAll('.category-edit-box img');
        var choiceClassifyImages = JSON.parse(this.getAttribute('data-images-info'))[title];
        for (var imgIndex = 0; imgIndex < imagesDom.length; imgIndex++) {
            if (choiceClassifyImages.length != 0) {
                imagesDom[imgIndex].src = choiceClassifyImages[imgIndex].image;
                imagesDom[imgIndex].title = choiceClassifyImages[imgIndex].title;
            } else {
                imagesDom[imgIndex].src = '../assets/img/upload.png';
            }
            imagesDom[imgIndex].removeAttribute('data-image-base64');
        }
    });

    // 添加分类
    $('.add-category-item').click(function () {
        layer.prompt({
            title: '新增分类',
            shadeClose: true,
        }, function (val, index, element) {
            var jsonData = JSON.stringify({id: 0, title: val});
            $.get(url.classify.add, {classinfos: jsonData}, function (response, status, xhr) {
                if (xhr.status == 200) {
                    window.location.reload();
                } else {
                    layer.msg('插入失败!');
                }
                layer.close(index);
            });
        });
    });

    // 分类图片上传
    $('.save-category-item').click(function () {
        var inertObjects = [];
        var formData = new FormData();
        var posterDomList = document.querySelectorAll('.category-image-poster');
        var choiceCategory = document.querySelector('.category-select-box select');
        var classifyArray = JSON.parse(choiceCategory.getAttribute('data-images-info'));
        for (var i = 0; i < posterDomList.length; i++) {
            var tmpFile = null;
            var fileName = posterDomList[i].getAttribute('title');
            var base64Data = posterDomList[i].getAttribute('data-image');
            var belong2Title = choiceCategory.options[choiceCategory.selectedIndex].text;
            if (!base64Data) {
                layer.alert('请选择所有三张图片',
                    {
                        icon: 0,
                        title: '警告',
                        shadeClose: true
                    });
                return false;
            }
            tmpFile = FlowerShop.Tools.prototype.blobToFile(FlowerShop.Tools.prototype.dataURLtoBlob(base64Data), fileName);
            inertObjects[i] = {
                id: 0,
                imgUrl: '',
                title: tmpFile.name,
                belong2Title: belong2Title
            };
            formData.append('file', tmpFile);
        }
        // 整理数据等待上传
        var tmpArray = classifyArray[choiceCategory.options[choiceCategory.selectedIndex].text];
        if (tmpArray && tmpArray.length === 3) {
            inertObjects = tmpArray;
        }
        formData.append('inertObjectsJson', JSON.stringify(inertObjects));
        $.ajax({
            type: 'post',
            data: formData,
            processData: false,
            contentType: false,
            url: url.classifyImage.add,
            complete: function (xhr, textStatus) {
                var status = xhr.status;
                var resData = xhr.responseText.length != 0 ? JSON.parse(xhr.responseText) : null;
                if (status == 200) {
                    layer.alert('保存成功!',
                        {
                            icon: 1,
                            title: '成功',
                            shadeClose: true,
                            yes: function () {
                                window.location.reload();
                            }
                        });
                } else {
                    layer.alert('保存失败, 请重试或联系管理员',
                        {
                            icon: 2,
                            title: '错误',
                            shadeClose: true
                        });
                }
            }
        });
    });

    // 删除当前整个分类
    $('.delete-category-item').click(function () {
        var choiceCategory = document.querySelector('.category-select-box select');
        var belong2Title = choiceCategory.options[choiceCategory.selectedIndex].text;
        layer.confirm(
            '确定要删除 ' + belong2Title + ' 分类吗？',
            {icon: 3, title: '提示'},
            function (index_1, element) {
                layer.close(index_1);
                $.get(url.user.delete, {belong2Title: belong2Title}, function () {
                    layer.alert('分类 ' + belong2Title + '已成功删除.',
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
