//index.js
var rest = require('../../utils/rest.js')
    //获取应用实例
var app = getApp()
Page({
    data: {
        PlateNo: '',
        currentTab: 0,
        date: '查询日期', //默认日期
        minDate: '2007-01-01', //开始日期上限
        maxDte: '2027-12-31' //结束日期下限
    },
    // 页面渲染完成
    onReady: function() {
        var token = wx.getStorageSync('Token')
        rest.GET({
            api: { ctrl: 'User', action: 'Auth' },
            params: {},
            header: {
                'content-type': 'application/json',
                'token': token
            },
            success: function() {}
        })
    },
    //事件处理函数
    //切换
    switchNav: function(e) {
        var that = this;
        if (this.data.currentTab === e.target.dataset.current) {
            return false;
        } else {
            that.setData({
                currentTab: e.target.dataset.current
            })
        }
    },
    bindChange: function(e) {
        var that = this;
        that.setData({
            currentTab: e.detail.current
        });
    },
    //日期
    dateChange: function(e) {
        this.setData({
            date: e.detail.value
        })
    },
    bindPlateNo: function(e) {
        this.setData({
            PlateNo: e.detail.value
        })
    },
    searchPosition: function() {
        wx.request({
            url: '/cmd.svc/Admin/Vehicle/VehicleManager/QuerySingleLastPosition',
            data: {
                PlateNo: this.data.PlateNo
            },
            header: {
                'content-type': 'application/json'
            },
            success: function(res) {
                console.log(res.data)
            }
        })
    },
    toPhoto: function() {
        wx.navigateTo({
            url: '../photo/photo'
        })
    }
})