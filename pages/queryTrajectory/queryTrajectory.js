/**
 * 轨迹查询
 */
var app = getApp()
Page({
    // data: {},
    // onLoad: function() {
    //     var trajectory = wx.getStorageSync('Trajectory')
    data: {},
    onLoad: function() {
        this.setData({
            markers: [{
                iconPath: "/resources/others.png",
                id: 0,
                latitude: 23.10229,
                longitude: 113.3245211,
                width: 50,
                height: 50
            }],
            circles: [{
                latitude: 23.10229,
                longitude: 113.3245211,
                color: '#FF0000DD',
                fillColor: '#7cb5ec88',
                radius: 3000,
                strokeWidth: 1
            }],
            polyline: [{
                    points: [{
                        longitude: 113.3245211,
                        latitude: 23.10229
                    }, {
                        longitude: 113.324520,
                        latitude: 23.21229
                    }],
                    color: "#e207c7",
                    width: 30,
                    dottedLine: false
                }]
                // controls: [{
                //     id: 1,
                //     iconPath: '/resources/location.png',
                //     position: {
                //         left: 0,
                //         top: 300 - 50,
                //         width: 50,
                //         height: 50
                //     },
                //     clickable: true
                // }]
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