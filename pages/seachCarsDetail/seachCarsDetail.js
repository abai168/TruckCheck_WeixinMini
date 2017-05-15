/**
 * 雷达搜车
 */
var QQMapWX = require('../../libs/qqmap-wx-jssdk.min.js')
var rest = require('../../utils/rest.js')
var app = getApp()
Page({
    data: {
        Height: 0,
        scale: 11,
        latitude: "",
        longitude: "",
        radius: '',
        address: '',
        carnumber: 0,
        markers: [],
        circles: []
    },
    bindAddress: function(e) {
        this.setData({
            address: e.detail.value
        })
    },
    bindRadius: function(e) {
        this.setData({
            radius: e.detail.value
        })
    },
    onLoad: function() {
        var that = this;
        wx.getSystemInfo({
                success: function(res) {
                    //设置map高度，根据当前设备宽高满屏显示
                    that.setData({
                        view: {
                            Height: res.windowHeight
                        }
                    })
                }
            })
            //初始化，刚进入定位当前位置，默认范围10公里以内车辆
        wx.getLocation({
            type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
            success: function(res) {
                that.setData({
                    latitude: res.latitude,
                    longitude: res.longitude,
                    markers: [{
                        id: 0,
                        latitude: res.latitude,
                        longitude: res.longitude,
                        width: 15,
                        height: 15,
                        // iconPath: "../../images/blank.gif",
                        title: "当前位置10公里范围内车辆数：" + that.data.carnumber + '辆'
                    }],
                    circles: [{
                        latitude: res.latitude,
                        longitude: res.longitude,
                        color: '#FF0000DD',
                        fillColor: '#7cb5ec88',
                        radius: 10000, //默认10公里
                        strokeWidth: 1
                    }]
                })
                rest.POST({
                    api: { ctrl: 'Vehicle', action: 'FindVehicleByPlateNo' },
                    params: {
                        Lon: that.data.longitude,
                        Lat: that.data.latitude,
                        Dist: 10
                    },
                    success: function(res) {
                        var markers = []
                        that.setData({
                            carnumber: res.result.length
                        })
                        markers.push(that.data.markers[0])
                        for (var i = 0; i < res.result.length; i++) {
                            markers.push({
                                id: i + 1,
                                latitude: res.result[i].Lat,
                                longitude: res.result[i].Lon,
                                width: 15,
                                height: 15,
                                title: res.result[i].PlateNo
                            });
                        }
                        that.setData({
                            markers: markers
                        })
                    }
                })
            }
        })
    },
    // 搜索
    searchCars: function() {
        var that = this
            // 调用腾讯地图-地址解析-接口,实现地址转坐标
            // 实例化API核心类
        var qqmapsdk = new QQMapWX({
            key: '56KBZ-ICNWP-HNLDI-VWWNG-6NNKE-BPBLZ'
        });
        qqmapsdk.geocoder({
            address: that.data.address,
            success: function(res) {
                var lat = res.result.location.lat
                var lng = res.result.location.lng
                that.setData({
                    latitude: lat,
                    longitude: lng,
                    markers: [{
                        id: 0,
                        latitude: lat,
                        longitude: lng,
                        width: 15,
                        height: 15,
                        // iconPath: "../../images/blank.gif",
                        title: that.data.address + that.data.radius + "公里范围内车辆数：" + that.data.carnumber + '辆'
                    }],
                    circles: [{
                        latitude: lat,
                        longitude: lng,
                        color: '#FF0000DD',
                        fillColor: '#7cb5ec88',
                        radius: that.data.radius * 1000, //单位是m
                        strokeWidth: 1
                    }]
                })
                rest.POST({
                    api: { ctrl: 'Vehicle', action: 'FindVehicleByPlateNo' },
                    params: {
                        Lon: lng,
                        Lat: lat,
                        Dist: that.data.radius //单位是km
                    },
                    success: function(res) {
                        var markers = []
                        that.setData({
                            carnumber: res.result.length
                        })
                        markers.push(that.data.markers[0])
                        for (var i = 0; i < res.result.length; i++) {
                            markers.push({
                                id: i + 1,
                                latitude: res.result[i].Lat,
                                longitude: res.result[i].Lon,
                                width: 15,
                                height: 15,
                                title: res.result[i].PlateNo
                            });
                        }
                        that.setData({
                            markers: markers
                        })
                    }
                })
            },
            fail: function(res) {
                wx.showModal({
                    title: '提示',
                    content: res.message,
                    success: function(res) {
                        that.setData({
                            latitude: '',
                            longitude: '',
                            markers: [],
                            circles: []
                        })
                    }
                })
            },
            complete: function(res) {
                console.log(res);
            }
        })
    },
    regionchange(e) {
        console.log("regionchange===" + e.type)
    }

})