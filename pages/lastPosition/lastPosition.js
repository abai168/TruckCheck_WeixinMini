/**
 * 实时定位
 */
var filter = require('../../utils/filter.js')
var app = getApp()
Page({
    data: {},
    onLoad: function(option) {
        this.setData({
            velinfo: JSON.parse(option.velinfo)
        })
        var position = this.data.velinfo
            // var position = {
            //     adr: '山东省淄博市周村区隆路凤阳家具',
            //     lat: 22071868,
            //     lon: 70709760,
            //     spd: 15,
            //     utc: '1493175423693'
            // }
        var date = filter.filterTime(new Date(parseInt(position.utc)))
        wx.openLocation({
            latitude: position.lat / 600000.0,
            longitude: position.lon / 600000.0,
            scale: 18,
            name: position.adr,
            address: '时间：' + date + '\n' + '速度：' + position.spd + 'km/h',

        })
        console.log('lat:' + position.lat / 600000.0)
        console.log('lon:' + position.lon / 600000.0)
    }
})