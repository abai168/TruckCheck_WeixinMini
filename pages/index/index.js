//index.js
var rest = require('../../utils/rest.js')
var filter = require('../../utils/filter.js')
    //获取应用实例
var app = getApp()
Page({
    data: {
        PlateNo: '',
        PlateNo2: '',
        currentTab: 0,
        date: '查询日期', //默认日期
        minDate: '2007-01-01', //开始日期上限
        maxDte: '2027-12-31' //结束日期下限
    },
    // 页面渲染完成
    onReady: function() {
        rest.GET({
            api: { ctrl: 'User', action: 'Auth' }
        })
    },
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
    //实时定位
    bindPlateNo: function(e) {
        this.setData({
            PlateNo: e.detail.value
        })
    },
    searchPosition: function() {
        rest.POST({
            api: { ctrl: 'Vehicle', action: 'QueryLastPosition' },
            params: this.data.PlateNo,
            success: function(res) {
                res.result = { "vno": null, "lat": 220718680, "lon": 707097600, "adr": "山东省淄博市周村区周隆路凤阳家具城西２００米路北旺德福酒楼，向西北方向，24米", "utc": "1493175423693", "spd": 15.0, "drc": 82.0, "bst": 786627, "alc": null, "est": 0 };
                if (!res.result) {
                    wx.showModal({
                        title: '提示',
                        content: '该车无定位信息',
                        success: function(res) {
                            if (res.confirm) {
                                console.log('用户点击确定')
                            } else if (res.cancel) {
                                console.log('用户点击取消')
                            }
                        }
                    })
                    return
                }
                wx.redirectTo({
                    // wx.navigateTo()是保留当前页面，跳转到某个页面，跳转页面后可以返回上一页
                    url: '../lastPosition/lastPosition?velinfo=' + JSON.stringify(res.result)
                })
            }
        })
    },
    //轨迹
    dateChange: function(e) {
        this.setData({
            date: e.detail.value
        })
    },
    bindPlateNo2: function(e) {
        this.setData({
            PlateNo2: e.detail.value
        })
    },
    searchTrajectory: function() {
        var searchDay = new Date(this.data.date.replace(/-/g, '/'))
        var s = [{ "latitude": 22039459 / 600000.0, "longitude": 70821988 / 600000.0, }, { "latitude": 23039459 / 600000.0, "longitude": 71821988 / 600000.0 }, { "latitude": 24039459 / 600000.0, "longitude": 72821988 / 600000.0 }, { "latitude": 25039459 / 600000.0, "longitude": 73821988 / 600000.0 }, { "latitude": 26039459 / 600000.0, "longitude": 74821988 / 600000.0 }, { "latitude": 27039459 / 600000.0, "longitude": 75821988 / 600000.0 }, { "latitude": 28039459 / 600000.0, "longitude": 76821988 / 600000.0 }, { "latitude": 29039459 / 600000.0, "longitude": 77821988 / 600000.0 }, { "latitude": 30039459 / 600000.0, "longitude": 78821988 / 600000.0 }, { "latitude": 31039459 / 600000.0, "longitude": 79821988 / 600000.0 }, { "latitude": 32039459 / 600000.0, "longitude": 80821988 / 600000.0 }, { "latitude": 33039459 / 600000.0, "longitude": 81821988 / 600000.0 }, { "latitude": 34039459 / 600000.0, "longitude": 82821988 / 600000.0 }, { "latitude": 34039459 / 600000.0, "longitude": 83821988 / 600000.0 }, { "latitude": 35039459 / 600000.0, "longitude": 84821988 / 600000.0 }, { "latitude": 36039459 / 600000.0, "longitude": 85821988 / 600000.0 }, { "latitude": 37039459 / 600000.0, "longitude": 86821988 / 600000.0 }, { "latitude": 38039459 / 600000.0, "longitude": 87821988 / 600000.0 }, { "latitude": 39039459 / 600000.0, "longitude": 88821988 / 600000.0 }, { "latitude": 40039459 / 600000.0, "longitude": 89821988 / 600000.0 }, { "latitude": 41039459 / 600000.0, "longitude": 86821988 / 600000.0 }, { "latitude": 42039459 / 600000.0, "longitude": 87821988 / 600000.0 }, { "latitude": 43039459 / 600000.0, "longitude": 88821988 / 600000.0 }, { "latitude": 44039459 / 600000.0, "longitude": 70821988 / 600000.0 }, { "latitude": 46039459 / 600000.0, "longitude": 81821988 / 600000.0 }, { "latitude": 46039459 / 600000.0, "longitude": 83821988 / 600000.0 }]
        wx.setStorageSync('Trajectory', s)
            // wx.setStorageSync('Trajectory', res.result.Data)
        wx.redirectTo({
                // wx.navigateTo()是保留当前页面，跳转到某个页面，跳转页面后可以返回上一页
                url: '../queryTrajectory/queryTrajectory'
            })
            // rest.POST({
            //     api: { ctrl: 'Vehicle', action: 'QueryTrajectory' },
            //     params: {
            //         PlateNo: this.data.PlateNo2,
            //         Start: filter.filterTime(searchDay),
            //         End: filter.filterTime(searchDay.setDate(searchDay.getDate() + 1)),
            //     },
            //     success: function(res) {
            //         if (!res.result) {
            //             wx.showModal({
            //                 title: '提示',
            //                 content: '该车无轨迹信息',
            //                 success: function(res) {
            //                     if (res.confirm) {
            //                         console.log('用户点击确定')
            //                     } else if (res.cancel) {
            //                         console.log('用户点击取消')
            //                     }
            //                 }
            //             })
            //             return
            //         }
            //         wx.setStorageSync('Trajectory', s)
            //             // wx.setStorageSync('Trajectory', res.result.Data)
            //         wx.redirectTo({
            //             // wx.navigateTo()是保留当前页面，跳转到某个页面，跳转页面后可以返回上一页
            //             url: '../queryTrajectory/queryTrajectory'
            //         })
            //     }
            // })
    },
    // 违章查询
    toIllegalQuery: function() {
        wx.redirectTo({
            url: '../illegalQuery/illegalQuery'
        })
    },
    toPhoto: function() {
        wx.redirectTo({
            url: '../photo/photo'
        })
    }
})