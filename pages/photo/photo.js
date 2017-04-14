// photo.js
var app = getApp()
Page({
	data:{
		photoInfo: ''
	},
	usePhoto:function(){
		var that = this
		wx.chooseImage({
			count:1,//默认9
			success: function (res) {
				// var tempFilePaths = res.tempFilePaths;
				// upload(that,tempFilePaths);

				
				// that.setData({
				// 	source:res.tempFilePaths
				// })

				// // 上传
				// wx.uploadFile({
				// 	url:'',
				// 	filePath:tempFilePaths[0],
				// 	name:'file',
				// 	formData:{
				// 		'user':'test'
				// 	},
				// 	success:function(res){
				// 		var data = res.data
				// 	}
				// })

				wx.getImageInfo({
					src: res.tempFilePaths[0],
					success: function (res) {
						that.setData({
							photoInfo:res.width+"==="+res.height,
							source:res.path
						})
					// alert(res.width+"==="+res.height)
					}
				})
			},
			fail:function(e){
				wx.showModal({
					title:'提示',
					content:'上传失败',
					showCancel:false
				})
				var message = data;
			},
		  	complete:function(data){
		  		wx.hideToast();
		  	}
		})
	}
})

function uploat(page,path){
	wx.showToast({
		icon:'loading',
		title:'正在上传'
	}),
	wx.uploadFile({
		url:'',
		filePath:path[0],
		name:'file',
		header:{'Content-Type' : 'multipart/form-data'},
		formData:{
			'session_token':wx.getStorageSync('session_token')
		},
		success:function(res){
			if(res.code != 200){
				wx.showModal({
					title:'提示',
					content:'上传失败',
					showCancel:false
				})
				return;
			}
			page.setData({
				source:path[0]
			})
		},
		fail:function(e){
			wx.showModal({
				title:'提示',
				content:'上传失败',
				showCancel:false
			})
			var message = data;
		},
	  	complete:function(data){
	  		wx.hideToast();
	  	}
	})
}