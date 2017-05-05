/**
 * 封装请求
 */
var enums = require('enums.js')

var BASE_URL = "http://172.16.19.106:8888/wxmini"
    // var BASE_URL = "http://61.144.244.17:800/wxmini"

var requestHandler = {
    api: {},
    params: {},
    header: {},
    success: function() {}
}

// GET请求
function GET(requestHandler) {
    request('GET', requestHandler)
}

// POST请求
function POST(requestHandler) {
    request('POST', requestHandler)
}

function request(method, requestHandler) {
    var API_URL = BASE_URL + '/' + requestHandler.api.ctrl + '/' + requestHandler.api.action;
    if (typeof requestHandler.params == 'string') {
        requestHandler.params = JSON.stringify(requestHandler.params)
    }
    wx.request({
        url: API_URL,
        data: requestHandler.params,
        method: method,
        header: requestHandler.header || {
            'content-type': method == 'GET' ? 'application/json' : 'application/x-www-form-urlencoded',
            'token': wx.getStorageSync('Token')
        },
        success: function(res) {
            resultByCode(res, requestHandler)
        },
        fail: function(res) {
            console.log(res.data);
            console.log('is failed')
        },
        complete: function() {

        }
    })
}

function resultByCode(res, requestHandler) {
    switch (res.data.code) {
        case 1001:
            requestHandler.success ? requestHandler.success(res.data) : null;
            break;
        case 1002:
        case 1003:
        case 1004:
        case 1005:
            // wx.redirectTo()是关闭当前页面，跳转到某个页面，跳转页面后不能返回上一页
            wx.redirectTo({
                url: '../login/login'
            })
            break;
        case 1006:
        case 2001:
        case 9001:
        case 9002:
        case 9003:
            wx.showModal({
                title: '提示',
                content: enums.resultCode[res.data.code],
                success: function(res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })
            break;
    }
}

// 通过module.exports暴露对象，通过require来获取对象
module.exports = {
    GET: GET,
    POST: POST
}