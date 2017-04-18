//login.js
var app = getApp()
Page({
    data: {
        UserName: '',
        Password: '',
        Token: '',
        response: ''
    },
    // 事件处理函数
    bindUserName: function(e) {
        this.setData({
            UserName: e.detail.value
        })
    },
    bindPassword: function(e) {
        this.setData({
            Password: e.detail.value
        })
    },
    login: function() {
        var that = this
        wx.request({
            url: 'http://172.16.19.27:8032/wxmini/User/Login',
            data: {
                UserName: this.data.UserName,
                Password: this.data.Password
            },
            method: 'POST',
            header: {
                'content-type': 'application/json'
            },
            success: function(res) {
                if (res.data.code == 1001) {
                    that.setData({
                        //eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJJZCI6IjM0YmU0ODAwLTIxMDMtNDQ0Yy1iMTBmLWE2NGEwYjBkMzY4YyIsIktleSI6bnVsbCwiRGF0ZSI6IlwvRGF0ZSgxNDkzNzk1MjYwMTk5KVwvIn0.Cuc4rXm1OpgeJBN3J14qWYEIGSVXI-xXqflrNXps0ck
                        Token: res.data.result,
                        response: res
                    })
                    try {
                        wx.setStorageSync('Token', res.data.result)
                    } catch (e) {

                    }
                    wx.navigateTo({
                        url: '../index/index'
                    })
                    console.log(res.data);
                }

            },
            faile: function(res) {
                console.log(res.data);
                console.log('is failed')
            }
        })
    }
})