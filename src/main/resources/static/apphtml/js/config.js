var baseUrl = "http://127.0.0.1:8090"
var detail = baseUrl + "/goodsitem/queryById"
var vendorOrder = baseUrl + "/order/selectVendorOrder"
var sendGoodss = baseUrl + "/order/sendGoods"
var detail = baseUrl + "/goodsitem/queryById"
var url = {
    user: {
        add: '/ffsuser/create',
        login: '/ffsuser/login',
        list: '/ffsuser/getAllUser',
        update: '/ffsuser/updateUserInfo',
        delete: '/ffsuser/deleteUserByName',
    },
    goods: {
        add: '/goodsitem/create',
        edit: '/goodsitem/',
        list: '/goodsitem/selectByVendor',
        delete: '/goodsitem/delete'
    },
    slider: {
        add: '/banner/insert',
        list: '/banner/allinfos',
        delete: '/banner/deleteById'
    },
    category: {
        add: '/category/create',
        list: '/category/allinfos',
        delete: '/category/deletebyid'
    },
    classify: {
        add: '/homepageclassify/insert',
        list: '/homepageclassify/allinfos',
        delete: '/homepageclassify/deleteById'
    }
};
