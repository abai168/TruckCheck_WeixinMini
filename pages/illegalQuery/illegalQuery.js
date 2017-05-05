/**
 * 违章查询
 */
var list = require('../../utils/list.js')
var rest = require('../../utils/rest.js')
var app = getApp()
Page({
    data: {
        showHelp: false,
        carNumberTypeArray_keys: [],
        carNumberTypeArray_values: [],
        index: 0,
        query: {
            carnumber: '',
            carcode: '',
            cardrivenumber: '',
            phone: '',
            cartype: ''
        }
    },
    onLoad: function() {
        // 配合picker组件，取出下拉值
        var keys = []
        var values = []
        for (var i = 0; i < list.carNumberType.length; i++) {
            keys.push(list.carNumberType[i].key)
            values.push(list.carNumberType[i].value)
        }
        this.setData({
            carNumberTypeArray_keys: keys,
            carNumberTypeArray_values: values,
        })
    },
    // 车牌号
    bindPlateNo: function(e) {
        this.setData({
            'query.carNumberType': e.detail.value
        })
    },
    // 车辆类型
    bindCarType: function(e) {
        this.setData({
            index: e.detail.value,
            'query.cartype': this.data.carNumberTypeArray_keys[e.detail.value]
        })
    },
    // 车架号
    bindCarCode: function(e) {
        this.setData({
            'query.carcode': e.detail.value
        })
    },
    // 发动机号
    bindCarDriveNumber: function(e) {
        this.setData({
            'query.cardrivenumber': e.detail.value
        })
    },
    //手机号码
    bindPhone: function(e) {
        this.setData({
            'query.phone': e.detail.value
        })
    },
    helpCarCodeDrive: function() {
        showHelp
    },
    // 查一查
    search: function() {
        var that = this
        rest.POST({
            api: { ctrl: 'User', action: 'Login' },
            params: that.data.query,
            success: function(res) {

                console.log(res.data);
            }
        })
    }


})