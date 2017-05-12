var app = getApp()
Page({
    data: {
        score: ''
    },
    onLoad: function(option) {
        var info = JSON.parse(option.score)
        info.date = info.enddate.slice(5)
        this.setData({
            score: info
        })
    }
})