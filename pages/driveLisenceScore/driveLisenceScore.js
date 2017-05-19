var rest = require('../../utils/rest.js')
Page({
    data: {
        license: {
            licensenumber: '',
            licenseid: ''
        }
    },
    bindLicensenumber: function(e) {
        this.setData({
            'license.licensenumber': e.detail.value
        })
    },
    bindLicenseid: function(e) {
        this.setData({
            'license.licenseid': e.detail.value
        })
    },
    search: function() {
        // var info = { "licensenumber": "37062819640724071X", "licenseid": "370600812283", "realname": "崔宝庆", "enddate": "2024-11-26", "score": "6" }

        // wx.navigateTo({
        //         url: '../scoreDetail/scoreDetail?score=' + JSON.stringify(info)
        //     })
        rest.POST({
            api: { ctrl: 'DriverLisenceScore', action: 'QueryDriverLisenceScore' },
            params: this.data.license,
            success: function(res) {
                wx.navigateTo({
                    url: '../scoreDetail/scoreDetail?score=' + JSON.stringify(res.result)
                })
            }
        })
    }
})