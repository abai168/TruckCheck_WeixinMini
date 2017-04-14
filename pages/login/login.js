//login.js
var app = getApp()
Page({
	data:{
		UserName: '',
		Password: '',
		Token:'',
		response:''
	},
	// 事件处理函数
	bindUserName:function(e){
		this.setData({
			UserName:e.detail.value
		})
	},
	bindPassword:function(e){
		this.setData({
			Password:e.detail.value
		})
	},
	login:function(){
		wx.request({
			url:'https://172.16.17.181/cmd.svc/WeixinMini/User/UserManager/Login',
			data:{
				UserName: this.data.UserName,
				Password: this.data.Password
			},
			method:'POST',
			header:{
				'content-type':'application/json'
			},
			success:function(res){
				this.setData({
					Token:res.data.tokenKey,
					response:res
				})
				try{
					wx.serStorageSync('Token',res.data.tokenKey)
				}catch(e){

				}
				wx.navigateTo({
					url:'../index/index'
				})
				console.log(res.data);
			},
			faile:function(res){
				console.log(res.data);
				console.log('is failed')
			}
		})
	}
})