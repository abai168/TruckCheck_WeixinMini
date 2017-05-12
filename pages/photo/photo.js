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
        // var res_result = {
        //     住址: "广东省深圳市福田区滨河大道御景华城花园1栋B座25村房",
        //     保留: "",
        //     公民身份号码: "452624198712222564",
        //     出生: "1987-12-22",
        //     头像: "http://172.16.19.106:8888/Pic/cwz-85cd2462-e912-45c0-b3ef-705ced875e31.jpg",
        //     姓名: "覃冬花",
        //     性别: "女",
        //     民族: "壮"

        // }
        // wx.navigateTo({
        //         url: '../photoDetail/photoDetail?photoDetail=' + JSON.stringify(res_result)
        //     })
        wx.uploadFile({
            url: app.globalData.baseURL_pre + '/wxmini/CertificateRecognition/QueryCertificate?cardType=' + this.data.cardType,
            filePath: this.data.source,
            name: 'card',
            header: { 'Content-Type': 'multipart/form-data', 'token': wx.getStorageSync('Token') },
            success: function(res) {
                var res_data = JSON.parse(res.data)
                if (!res_data) {
                    wx.showModal({
                        title: '提示',
                        content: '提交失败',
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
                    wx.navigateTo({
                        url: '../photoDetail/photoDetail?photoDetail=' + JSON.stringify(res_data.result)
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