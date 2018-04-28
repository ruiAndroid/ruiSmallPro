// pages/movies/movies-details/movies-details.js
var utils=require("../../../utils/util.js")
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie:{},
    director:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var movieId=options.movieId
      var detailUrl = app.globalData.doubanBase+"/v2/movie/subject/"+movieId
      wx.showLoading({
        title: '加载中...',
      })
      //请求电影详情
      utils.http(detailUrl, this.processMovieDetailData)
  },
  processMovieDetailData:function(data){
    console.log(data)
    var that=this
    if (!data.data){
      return
    }
    //解析导演 演员信息
    var director={
      avater:"",
      name:"",
      id:""
    }
    
    if (data.data.directors[0]!=null){
      if (data.data.directors[0].avatars!=null){
        director.avater = data.data.directors[0].avatars.large
      }
      director.name = data.data.directors[0].name
      director.id = data.data.directors[0].id
    }
    //解析演员信息
    var movie={
        //电影海报
      movieImg: data.data.images ? data.data.images.large:"",
        //属于哪个国家
      country: data.data.countries[0],
        //电影名称
        title: data.data.title,
        originalTitle: data.data.original_title,
        wishCount: data.data.wish_count,
        commentsCount: data.data.comments_count,
        year: data.data.year,
        generes: data.data.genres.join("、"),
        stars: utils.convertToStars(data.data.rating.stars),
        score: data.data.rating.average,
        director: director,
        casts: utils.convertToCastString(data.data.casts),
        castsInfo: utils.convertToCastInfos(data.data.casts),
        summary: data.data.summary
    }
    that.setData({
      movie:movie,
      director: director
    })
    wx.hideLoading()
    console.log(director)
    console.log(movie)
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