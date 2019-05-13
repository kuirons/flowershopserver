var FlowerShop = {};

FlowerShop.App = function () {
    this.controllers = {};
};

FlowerShop.App.prototype.get = function(controller) {
    return this.controllers[controller];
};

FlowerShop.App.prototype.getTopDocument = FlowerShop.App.__proto__.getTopDocument = function () {
    return window.top != window.self ? window.top.document : document;
};

FlowerShop.App.prototype.execute = function() {
    for (var className in FlowerShop) {
        if (className !== "App") {
            var controller = new FlowerShop[className](this);
            this.controllers[className] = controller;

            if (typeof controller.execute === "function") {
                controller.execute();
            }

            if (typeof controller.listen === "function") {
                controller.listen();
            }

            if (typeof controller.focus === "function") {
                controller.focus();
            }

            // 快捷键操作
            if (typeof controller.keyboardShortcuts === "function") {
                controller.keyboardShortcuts(e);
            }

            // 执行每个模块中以init开头的初始化函数
            if (typeof this.controllers[className].init != 'undefined') {
                for (var initName in this.controllers[className].init) {
                    if (typeof this.controllers[className].init[initName] === 'function') {
                        this.controllers[className].init[initName]();
                    }
                }
            }

        }
    }

    this.keyboardShortcuts();
};


FlowerShop.App.prototype.keyboardShortcuts = function () {
    var self = this;

    $(document).keyup(function (e) {
        e = e || window.event;
        var keyCode = e.keyCode;
        switch (keyCode) {
            case 27:
                var confirm = FlowerShop.App.getTopDocument().querySelector('#confirm-box');
                var uploadBox = FlowerShop.App.getTopDocument().querySelector('#image-upload-box');

                if (confirm.className.indexOf('confirm-box-open') >= 0) {
                    self.get('Modal').closeConfirm();
                }
                if (uploadBox !== null && typeof uploadBox !== "undefined" && uploadBox.classList.contains('upload-box-open')) {
                    uploadBox.querySelector('.close-upload-btn').click();
                }
                break;
            default:
                break;
        }
    });
};