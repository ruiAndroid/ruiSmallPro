// pages/ganhuo/ganhuo.js
var that
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    banner:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    getBannerData()
    getData(false)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    getData(true)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
//获取轮播图数据
var getBannerData=function(){
  wx.request({
    url: 'https://lion.tuyangdanci.com/v1/goods/banners',
    method:'POST',
    data:{
      user_id:"5aaa65db362d0e529c08470a"
    },
    header:{
      'content-type': 'application/json' // 默认值
    },
    //请求成功的回调
    success:function(res){
      this.banner=res.data
      console.log("打印轮播图数据")
      console.log(this.banner)
      that.setData({
        banner:this.banner.data
      })
    }
  })

}
//请求网络数据，isPul区分用户是否下拉操作
var getData = function (isPull) {
  //请求干货列表的数据
  wx.request({
    url: 'https://lion.tuyangdanci.com/v1/article/list',      //接口地址
    method: 'POST', //必须为大写（例如：POST）
    data: {
      user_id: "5aaa65db362d0e529c08470a",

    },//请求的参数
    header: { //请求头,设置为默认值即可
      'content-type': 'application/json' // 默认值
    },
    //请求成功的回调
    success: function (res) {
      this.list = res.data; //把取到的数组的值赋值给list
      console.log(this.list)
      console.log("渲染数据")
      console.log("数据长度:" + this.list.data.length)
      that.setData({   //这里调用setData时不能用this.setData，会报错
        list: this.list.data
      })
    }
  })
  if (isPull) {
    wx.showLoading({
      title: '刷新中...',
    })
    setTimeout(function(){
      wx.hideLoading()
    },1000)
    //停止下拉
    wx.stopPullDownRefresh()
  }

}
