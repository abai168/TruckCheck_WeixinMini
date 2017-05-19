var rest = require('../../utils/rest.js')
Page({
    data: {
        illegalInfo: '',
        para: ''
    },
    onLoad: function(option) {
        var that = this
        that.setData({
                para: JSON.parse(option.para)
            })
            //测试
            // var result = [{ "DegreePoundage": 0, "SecondaryUniqueCode": 1508522752, "Other": "0", "CanprocessMsg": null, "UniqueCode": "f499d42e82da738ea6981be5f58cbc1d", "CanProcess": "0", "Poundage": "0", "RecordType": "实时数据", "DataSourceID": "9992", "LocationName": "广东深圳", "Locationid": "4403", "Illegalentry": null, "Punishmentaccording": null, "Latefine": "0", "Category": "", "Excutedepartment": null, "Excutelocation": null, "Telephone": null, "Archive": "4403107900171384", "Code": "1352A", "Degree": "3", "department": "深圳市公安局交通警察支队西部高速公路大队二中队", "status": "0", "count": "150", "Reason": "驾驶中型以上载客载货汽车、危险物品运输车辆以外的其他机动车行驶超过规定时速10%未达20%的", "Location": "南光高速-S33（南光高速北行27KM）", "Time": "2016-12-15 09:53:29" }, { "DegreePoundage": 0, "SecondaryUniqueCode": 1508522752, "Other": "0", "CanprocessMsg": null, "UniqueCode": "f499d42e82da738ea6981be5f58cbc1d", "CanProcess": "0", "Poundage": "0", "RecordType": "实时数据", "DataSourceID": "9992", "LocationName": "广东深圳", "Locationid": "4403", "Illegalentry": null, "Punishmentaccording": null, "Latefine": "0", "Category": "", "Excutedepartment": null, "Excutelocation": null, "Telephone": null, "Archive": "4403107900171384", "Code": "1352A", "Degree": "3", "department": "深圳市公安局交通警察支队西部高速公路大队二中队", "status": "0", "count": "150", "Reason": "驾驶中型以上载客载货汽车、危险物品运输车辆以外的其他机动车行驶超过规定时速10%未达20%的", "Location": "南光高速-S33（南光高速北行27KM）", "Time": "2016-12-15 09:53:29" }]
            // that.setData({
            //         illegalInfo: result
            //     })
        rest.POST({
            api: { ctrl: 'Violation', action: 'QueryViolation' },
            params: that.data.para,
            success: function(res) {
                // 没有违章记录跳回查询页面
                if (res.result.length <= 0) {
                    wx.showModal({
                        title: '提示',
                        showCancel: false,
                        content: '无违章记录，点击确定，返回违章查询页面',
                        success: function(res) {
                            if (res.confirm) {
                                console.log('用户点击确定')
                                wx.redirectTo({
                                    url: '../illegalQuery/illegalQuery'
                                })
                            }
                        }
                    })
                    return
                }
                that.setData({
                    illegalInfo: res.result
                })
            }
        })

    },
    dealwith: function() {
        wx.navigateTo({
            url: '../differentDealWith/differentDealWith?para=' + JSON.stringify(this.data.para)
        })
    }
})