var rest = require('../../utils/rest.js')
Page({
    data: {
        PlateNo: ''
    },
    bindPlateNo: function(e) {
        this.setData({
            PlateNo: e.detail.value
        })
    },
    search: function() {
        var message = {
            'yes': '车辆已入网',
            'no': '车辆未入网'
        }
        rest.POST({
            api: { ctrl: 'Vehicle', action: 'CheckVehicleExist' },
            params: JSON.stringify(this.data.PlateNo),
            success: function(res) {
                wx.showModal({
                    title: '提示',
                    content: message[res.result],
                    success: function(res) {
                        if (res.confirm) {
                            console.log('用户点击确定')
                        } else if (res.cancel) {
                            console.log('用户点击取消')
                        }
                    }
                })
            }
        })
    }
})