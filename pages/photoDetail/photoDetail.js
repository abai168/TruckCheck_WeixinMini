var app = getApp()
Page({
    data: {
        photoDetail: ''
    },
    onLoad: function(option) {
        this.setData({
            photoDetail: JSON.parse(option.photoDetail)
        })
    }
})