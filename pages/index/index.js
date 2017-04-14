//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    PlateNo: ''
  },
  //事件处理函数
  bindPlateNo:function(e){
    this.setData({
      PlateNo:e.detail.value
    })
  },
  searchPosition: function() {
    wx.request({
      url: '/cmd.svc/Admin/Vehicle/VehicleManager/QuerySingleLastPosition',
      data:{
        PlateNo:this.data.PlateNo
      },
      header:{
        'content-type':'application/json'
      },
      success:function(res){
        console.log(res.data)
      }
    })
  },
  toPhoto:function(){
    wx.navigateTo({
      url:'../photo/photo'
    })
  }
})
