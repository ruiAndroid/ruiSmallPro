
var utils = require("../../../utils/util.js")
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navigateTitle: "",
    movies: {},
    totalMovies:{},
    totalCount:0,
    requestUrl:"",
    isEmpty:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    var category = options.categoryType
    this.data.navigateTitle = category
    console.log("电影类型:" + category);
    
    switch (category) {
      case "即将上映":
        this.data.requestUrl = "/v2/movie/coming_soon"
        break;
      case "正在热映":
        this.data.requestUrl = "/v2/movie/in_theaters"
        break;
      case "top250":
        this.data.requestUrl = "/v2/movie/top250"
        break;
    }
    utils.http(app.globalData.doubanBase + this.data.requestUrl, this.processDoubanData)
  },

  processDoubanData: function (res) {
    console.log(res.data)
    var that = this
    var moviesDouban = res.data
    var movies = [];
    for (var index in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[index]
      var title = subject.title
      //处理title，过长的title额外处理一下
      if (title.length > 6) {
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
    var totalMovies={};
    //合并旧数据与新数据
    if (!that.data.isEmpty){
        totalMovies=this.data.movies.concat(movies)
        wx.hideNavigationBarLoading()
    }else{  //第一次加载之后数据不为空
        totalMovies=movies
        this.data.isEmpty = false
        wx.hideLoading()
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
    }
    that.setData({
      movies: totalMovies
    })
    this.data.totalCount += 20

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
    wx.showNavigationBarLoading()
    this.data.isEmpty=true
    this.data.totalCount=0
    utils.http(app.globalData.doubanBase + this.data.requestUrl, this.processDoubanData)
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


  }, onReachBottom:function(event){
    console.log("start:" + this.data.totalCount)
    var url = app.globalData.doubanBase + this.data.requestUrl + "?start=" + this.data.totalCount + "&count=20"
    utils.http(url, this.processDoubanData)
    wx.showNavigationBarLoading()
    console.log("滑动到底部加载更多")
  }
})