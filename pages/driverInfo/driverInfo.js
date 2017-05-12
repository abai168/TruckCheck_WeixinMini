var rest = require('../../utils/rest.js')
var app = getApp()
Page({
    data: {
        driver: {
            UserName: '',
            CardID: ''
        }
    },
    bindUserName: function(e) {
        this.setData({
            'driver.UserName': e.detail.value
        })
    },
    bindCardID: function(e) {
        this.setData({
            'driver.CardID': e.detail.value
        })
    },
    search: function() {
        // wx.navigateTo({
        //         url: '../driverDetail/driverDetail'
        //     })
        rest.POST({
            api: { ctrl: 'IDCardVerification', action: 'QueryIDCardInfo' },
            params: this.data.driver,
            success: function(res) {
                wx.navigateTo({
                    url: '../driverDetail/driverDetail?detail=' + JSON.stringify(res.result)
                })
            }
        })
    }
})