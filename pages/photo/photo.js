// photo.js
var list = require('../../utils/list.js')
    // import { SelectDropdown } from '../../component/select-dropdown/select-dropdown.js'

var app = getApp()
Page({
    // SelectDropdown,
    data: {
        source: '../../images/uploadDefault.png',
        uploadMessage: '点击上传',
        showSelect: false,
        cardType: '',
        cardTypeList: list.cardType,
        selected: '请选择证件类型'
    },
    // onLoad: function() {
    //     new this.SelectDropdown(this.data.cardTypeObj)
    // },
    //证件类型下拉选择
    cardTypeMenu: function(e) {
        var that = this
        that.setData({
            showSelect: !this.data.showSelect
        })
    },
    mySelect: function(e) {
        this.setData({
            cardType: e.target.dataset.card.key,
            selected: e.target.dataset.card.value,
            showSelect: false
        })
    },
    usePhoto: function() {
        var that = this
        wx.chooseImage({
            count: 1, //默认9
            sizeType: ['compressed'],
            success: function(res) {
                that.setData({
                    source: res.tempFilePaths[0],
                    uploadMessage: '已上传',
                })
            },
            fail: function(e) {
                wx.showModal({
                    title: '提示',
                    content: '上传失败',
                    showCancel: false
                })
                var message = data;
            },
            complete: function(data) {
                wx.hideToast();
            }
        })
    },
    submit: function() {
        wx.uploadFile({
            url: 'http://172.16.19.106:8888/wxmini/CertificateRecognition/QueryCertificate?cardType=' + this.data.cardType,
            filePath: this.data.source,
            name: 'card',
            header: { 'Content-Type': 'multipart/form-data', 'token': wx.getStorageSync('Token') },
            success: function(res) {
                var res_data = JSON.parse(res.data)
                if (!res_data) {
                    wx.showModal({
                        title: '提示',
                        content: '上传失败',
                        showCancel: false
                    })
                    return;
                } else if (!res_data.result) {
                    wx.showModal({
                        title: '提示',
                        content: '证照不合法',
                        showCancel: false
                    })
                    return;
                } else {
                    wx.showModal({
                        title: '提示',
                        content: '提交成功',
                        success: function(res) {
                            if (res.confirm) {
                                console.log('用户点击确定')
                            } else if (res.cancel) {
                                console.log('用户点击取消')
                            }
                        }
                    })
                }
            },
            fail: function(e) {
                wx.showModal({
                    title: '提示',
                    content: '上传失败',
                    showCancel: false
                })
            },
            complete: function() {
                wx.hideToast();
            }
        })
    }
})