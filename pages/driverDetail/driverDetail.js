var app = getApp()
Page({
    data: {
        detail: ''
    },
    onLoad: function(option) {
        // var info = {
        //         idCardName: "刘晶晶",
        //         idCardCode: "430223198806176593",
        //         idCardPhoto: "/Pic/430223198806176593.jpg",
        //         message: "一致"
        //     }
        var info = JSON.parse(option.detail)
        info.idCardPhoto = app.globalData.baseURL_pre + info.idCardPhoto
        this.setData({
            detail: info
        })
    }
})