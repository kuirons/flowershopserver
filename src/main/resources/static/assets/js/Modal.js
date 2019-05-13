"use strict";

FlowerShop.Modal = function (app) {
    this.app = app;
};

FlowerShop.Modal.prototype.init = {};

FlowerShop.Modal.prototype.init['ModalMask'] = function () {
    var modalMask = FlowerShop.App.getTopDocument().querySelector('#modal-mask');
    if (modalMask !== null && typeof modalMask !== "undefined") {
        return false;
    }
    var bgMaskArgs = [
        {
            nodeType: 'div',
            id: 'modal-mask',
            class: 'modal-mask modal-mask-close'
        }
    ];
    var bgMask = FlowerShop.Tools.prototype.createDom(bgMaskArgs);
    for (var item in bgMask) {
        FlowerShop.App.getTopDocument().body.appendChild(bgMask[item]);
    }
};

FlowerShop.Modal.prototype.init['Confirm'] = function () {
    var confirmBox = FlowerShop.App.getTopDocument().querySelector('#confirm-box');
    if (confirmBox !== null && typeof confirmBox !== "undefined") {
        return false;
    }
    var confirmBoxArgs = [
        {
            nodeType: 'div',
            id: 'confirm-box',
            class: 'modal-box confirm-box confirm-box-close',
            innerHTML: [
                {
                    nodeType: 'div',
                    class: 'confirm-content'
                },
                {
                    nodeType: 'div',
                    class: 'confirm-operating',
                    innerHTML: [
                        {
                            nodeType: 'a',
                            innerText: '取消',
                            class: 'confirm-cancel',
                            href: 'javascript: void(0)',
                        },
                        {
                            nodeType: 'a',
                            innerText: '确认',
                            class: 'confirm-yes',
                            href: 'javascript: void(0)',
                        }
                    ],
                }
            ]
        }
    ];
    var confirmBox = FlowerShop.Tools.prototype.createDom(confirmBoxArgs);
    for (var item in confirmBox) {
        FlowerShop.App.getTopDocument().body.appendChild(confirmBox[item]);
    }
};

FlowerShop.Modal.prototype.openConfirm = function (content, confirmCallback, cancelCallback) {
    var self = this;
    self.openMask();
    var confirm = this.app.getTopDocument().querySelector('.confirm-box');
    confirm.children[0].innerHTML = content;
    confirm.className = confirm.className.replace('confirm-box-close', 'confirm-box-open');

    // 若传入相应事件则绑定
    confirm.querySelector('.confirm-yes').onclick = function () {
        self.closeConfirm();
        if (typeof confirmCallback === "function")
            confirmCallback();
    };
    confirm.querySelector('.confirm-cancel').onclick = function () {
        self.closeConfirm();
        if (typeof cancelCallback === "function")
            cancelCallback();
    }
};


FlowerShop.Modal.prototype.closeConfirm = function () {
    this.closeMask();
    var confirm = this.app.getTopDocument().querySelector('.confirm-box');
    confirm.children[0].innerHTML = '';
    confirm.className = confirm.className.replace('confirm-box-open', 'confirm-box-close');
};

FlowerShop.Modal.prototype.openMask = function () {
    var modalMask = this.app.getTopDocument().querySelector('#modal-mask');
    modalMask.className = modalMask.className.replace('modal-mask-close', 'modal-mask-open');
};

FlowerShop.Modal.prototype.closeMask = function () {
    var modalMask = this.app.getTopDocument().querySelector('#modal-mask');
    modalMask.className = modalMask.className.replace('modal-mask-open', 'modal-mask-close');
};