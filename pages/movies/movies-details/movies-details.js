// pages/movies/movies-details/movies-details.js
var utils=require("../../../utils/util.js")
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      navigateTitle:"",
      movies:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var category = options.categoryType
    this.data.navigateTitle = category
    console.log("电影类型:" + category);
    var dataUrl=""
    switch (category){
      case "即将上映":
        dataUrl ="/v2/movie/coming_soon"
        break;
      case "正在热映":
        dataUrl = "/v2/movie/in_theaters"
        break;
      case "top250":
        dataUrl = "/v2/movie/top250" 
        break;
    }
    utils.http(app.globalData.doubanBase + dataUrl, this.processDoubanData)
  },
  processDoubanData:function(res){
    console.log(res.data)
    var that=this
    var moviesDouban=res.data
    var movies = [];
    for (var index in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[index]
      var title = subject.title
      //处理title，过长的title额外处理一下
      if (title.legth > 6) {
        title = title.substring(0, 6)
      }
      var temp = {
        stars: utils.convertToStars(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        converageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp)
    }
    that.setData({
      movies:movies
    })

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
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