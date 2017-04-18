//index.js
//获取应用实例
var app = getApp()
Page({
    onReady: function() {
        var token = wx.getStorageSync('Token')
        wx.request({
            url: 'http://172.16.19.27:8032/wxmini/User/Auth',
            method: 'GET',
            header: {
                'content-type': 'application/json',
                'token': token
            },
            success: function(res) {
                if (res.data.code == 1002 || res.data.code == 1003 || res.data.code == 1004 || res.data.code == 1005) {
                    wx.redirectTo({
                        url: '../login/login'
                    })
                }
            },
            faile: function(res) {
                console.log(res.data);
                console.log('is failed')
            }
        })
    },
    data: {
        PlateNo: '',
        currentTab: 0,
        date: '查询日期', //默认日期
        minDate: '2007-01-01', //开始日期上限
        maxDte: '2027-12-31' //结束日期下限
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