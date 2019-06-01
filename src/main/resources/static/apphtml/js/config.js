var baseUrl = "http://100.68.69.153:8090"
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
        edit: '/goodsitem/',
        add: '/goodsitem/create',
        delete: '/goodsitem/delete',
        update: '/goodsitem/update',
        info: '/goodsitem/queryById',
        list: '/goodsitem/selectByVendor',
    },
    slider: {
        add: baseUrl + '/banner/insert',
        list: baseUrl + '/banner/allinfos',
        delete: baseUrl + '/banner/deleteById'
    },
    category: {
        add: '/category/create',
        list: '/category/allinfos',
        info: '/category/queryById',
        delete: '/category/deletebyid',
    },
    classify: {
        add: '/homepageclassify/insert',
        list: '/homepageclassify/allinfos',
        delete: '/homepageclassify/deleteById'
    },
    classifyImage: {
        add: '/goodsinfo/insert',
        list: '/goodsinfo/allinfos',
        delete: '/goodsinfo/deleteByBelong2Title'
    },
    comment: {
        delete: '/comment/delete',
        list: '/comment/queryByVendor',
        goods: '/comment/queryByGoodsId'
    }
};
