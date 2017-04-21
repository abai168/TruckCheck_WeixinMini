//login.js
// 导入js
var rest = require('../../utils/rest.js')
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
        rest.POST({
            api: { ctrl: 'User', action: 'Login' },
            params: {
                UserName: this.data.UserName,
                Password: this.data.Password
            },
            success: function(res) {
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
        })
    }
})