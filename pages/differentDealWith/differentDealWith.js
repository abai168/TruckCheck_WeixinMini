var rest = require('../../utils/rest.js')
Page({
    data: {
        info: ''
    },
    onLoad: function(option) {
        var info = JSON.parse(option.para)
        this.setData({
            info: info
        })
        console.log(this.data.info)
    },
    bindUserName: function(e) {
        this.setData({
            'info.username': e.detail.value
        })
    },
    bindPhone: function(e) {
        this.setData({
            'info.phone': e.detail.value
        })
    },
    bindPlateNo: function(e) {
        this.setData({
            'info.carnumber': e.detail.value
        })
    },
    bindCarCode: function(e) {
        this.setData({
            'info.carcode': e.detail.value
        })
    },
    bindCarDriveNumber: function(e) {
        this.setData({
            'info.cardrivenumber': e.detail.value
        })
    },
    submit: function() {
        // console.log(this.data.info)
        wx.showModal({
                title: '提示',
                content: '提交成功',
                success: function(res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })
            //后台接口未提供
            // rest.POST({
            //     api: { ctrl: 'Violation', action: 'QueryViolation' },
            //     params: this.data.para,
            //     success: function(res) {
            // wx.showModal({
            //         title: '提示',
            //         content: '提交成功',
            //         success: function(res) {
            //             if (res.confirm) {
            //                 console.log('用户点击确定')
            //             } else if (res.cancel) {
            //                 console.log('用户点击取消')
            //             }
            //         }
            //     })
            //     }
            // })
    }
})