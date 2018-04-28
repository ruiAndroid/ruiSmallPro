// pages/news/news.js
var utils = require('../../utils/util.js')
//获取全局的app
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheatersMovies: { movies: [], movieType: "" },
    comingSoonMovies: { movies: [], movieType: "" },
    top250Movies: { movies: [], movieType: "" },
    searchMovies: { movies: [], movieType: "" },
    containerShow:true,
    searchPannel:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //正在热映
    var inTheatersUrl = app.globalData.doubanBase +
      "/v2/movie/in_theaters" + "?start=0&count=3";
    //即将上映
    var comingSonnUrl = app.globalData.doubanBase +
      "/v2/movie/coming_soon" + "?start=0&count=3";
    //top250
    var topUrl = app.globalData.doubanBase +
      "/v2/movie/top250" + "?start=0&count=3";
    this.getMoviesData(inTheatersUrl, "inTheaters")
    this.getMoviesData(comingSonnUrl, "comingSoon")
    this.getMoviesData(topUrl, "top250")
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

  },
  getMoviesData: function (url, moviesType) {
    var that = this
    utils.http(url,function(res){
      that.processDoubanData(res.data, moviesType)
    })
    
    // wx.request({
    //   url: url,
    //   method: 'GET',
    //   header: {
    //     //这里一定要写成json才能请求带代理的豆瓣服务器
    //     "Content-Type": "json"
    //   },
    //   success: function (res) {
    //     that.processDoubanData(res.data, moviesType)
    //   },
    //   fail: function (error) {
    //     console.log("请求失败:" + error)
    //   }
    // })
  },
  //处理豆瓣数据
  processDoubanData: function (moviesDouban, type) {
    console.log(moviesDouban)
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
    if (type == "comingSoon") {
      this.setData({
        comingSoonMovies: {
          movies: movies, movieType: "即将上映"
        }
      })
    } else if (type == "inTheaters") {
      this.setData({
        inTheatersMovies: {
          movies: movies, movieType: "正在热映"
        }
      })
    } else if (type == "top250") {
      this.setData({
        top250Movies: {
          movies: movies, movieType: "top250"
        }
      })
    }else if(type=="search"){
      this.setData({
        searchMovies: {
          movies: movies, movieType: "search"
        }
      })
    }

  },
  //点击更多
  onMoreTap: function (event) {
    var categoryType = event.currentTarget.dataset.category
    wx.navigateTo({
      url: '/pages/movies/movies-grid/movies-grid?categoryType=' + categoryType,
    })
  },
  //跳转到电影详情页面
  onMoviesTap:function (event) {
    var movieId=event.currentTarget.dataset.movieid
    wx.navigateTo({
      url: '/pages/movies/movies-details/movies-details?movieId=' + movieId,
    })
  },
  //搜索框获取焦点
  onBindFocus:function(event){
      this.setData({
        containerShow: false,
        searchPannel: true
      })

  },
  onBindConfirm:function(event){
    //获取用户输入的文本信息
    var text = event.detail.value
    console.log(text);
    //开始搜索
    var searchUrl=app.globalData
      .doubanBase+"/v2/movie/search?q="+text;
    this.getMoviesData(searchUrl,"search")
  },
  //失去焦点触发
  onBindBlur:function(event){
   

  },
  //触发搜索事件 
  onBindChange:function(event){
    

  },
  onCancelImgTap:function(event){
    this.setData({
      containerShow: true,
      searchPannel: false,
      searchMovies:{
        movies:[],
        movieType:""
      }
    })
  }
})