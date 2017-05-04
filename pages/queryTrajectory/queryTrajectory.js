/**
 * 轨迹查询
 */
var app = getApp()
Page({
    data: {
        latitude: '',
        longitude: '',
        markers: [{
                id: 1,
                latitude: '',
                longitude: '',
                title: '起点',
                width: 15,
                height: 15
            },
            {
                id: 2,
                latitude: '',
                longitude: '',
                title: '终点',
                width: 15,
                height: 15
            }
        ],
        polyline: [{
            points: [],
            color: "#e207c7",
            width: 5,
            dottedLine: false
        }]
    },
    onLoad: function() {
        var temp = wx.getStorageSync('Trajectory')
            // var temp = [{
            //     longitude: 113.3245211,
            //     latitude: 23.10229
            // }, {
            //     longitude: 113.324520,
            //     latitude: 23.21229
            // }]
        this.setData({
            latitude: temp[0].latitude,
            longitude: temp[0].longitude,
            'markers[0].latitude': temp[0].latitude,
            'markers[0].longitude': temp[0].longitude,
            'markers[1].latitude': temp[temp.length - 1].latitude,
            'markers[1].longitude': temp[temp.length - 1].longitude,
            'polyline[0].points': temp
        })
    },
    regionchange(e) {
        console.log(e.type)
    },
    markertap(e) {
        console.log(e.markerId)
    },
    controltap(e) {
        console.log(e.controlId)
    }

})