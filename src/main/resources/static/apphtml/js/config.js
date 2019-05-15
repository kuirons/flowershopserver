var baseUrl = "http://192.168.43.252:8090"
var detail = baseUrl + "/goodsitem/queryById"
var url = {
    goods: {
        add: '/goodsinfo/insert',
        edit: '',
        list: '/goodsinfo/allinfos',
        delete: '/goodsinfo/deleteByBelong2Title'
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
