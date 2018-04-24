var postsData=require("../../../data/post-data.js")
var postId;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic:false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //取到上个界面传递的id
    postId=options.id;
    var postData=postsData.postList[postId];
    this.setData({
      postData: postData
    })
    //读取缓存值，显示收藏和分享的状态
    var postsCollected = wx.getStorageSync("posts_collected")
    if (postsCollected){
      var postCollected = postsCollected[postId]
      this.setData({
        collected:postCollected
      })
    }else{
      var postsCollected={}
      postsCollected[postId]=false
      wx.setStorageSync("posts_collected", postsCollected)
    }
    var that=this
    //监听音乐事件
    wx.onBackgroundAudioPlay(function(){
      console.log("music play")
      that.setData({
        isPlayingMusic:true
      })
    })
    wx.onBackgroundAudioPause(function(){
      console.log("music pause")
      that.setData({
        isPlayingMusic: false
      })
    })
    wx.onBackgroundAudioStop(function(){
      console.log("music stop")
      that.setData({
        isPlayingMusic: false
      })
    })
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
  //缓存的上限不能超过10M
  onShare:function(event){
    var itemList = ["分享给微信好友", "分享到朋友圈", "分享到QQ", "分享到微博"]
    wx.showActionSheet({
      itemList: itemList,
        itemColor:"#0094ff",
        success:function(res){
          //res.cancle用户是否点击了取消按钮
          //res.tapIndex数组元素的序号，从0开始
          console.log("用户分享到了:"+itemList[res.tapIndex])
        }
        
    })
  },
  onCollection:function(event){
    console.log("收藏")
    var postsCollected=wx.getStorageSync("posts_collected")
    var postCollected=postsCollected[postId]
    //模拟请求网络数据，同时修改本地存储结果
    postCollected=!postCollected
    if(postCollected){  //收藏成功
      //吐司显示
      // wx.showToast({
      //   title: '收藏成功',
      //   duration:1000,
      //   icon:"success",
      //   success:function(){

      //   },
      //   fail:function(){

      //   },
      //   complete:function(){

      //   }
      // })
      //model显示
      wx.showModal({
        title: '收藏',
        content: '是否收藏该文章',
        showCancel:true,
        cancelText:"取消",
        confirmText:"确定",
        cancelColor:"#333",
        confirmColor:"#0094ff"
      })

    } else {//取消收藏成功
      //吐司显示
      // wx.showToast({
      //   title: '取消成功',
      //   duration: 1000,
      //   icon: "success"
      // })
      //model显示
       

    }
    postsCollected[postId]=postCollected
     wx.setStorageSync("posts_collected", postsCollected)
     this.setData({ 
       collected: postCollected
     })
  },
  //播放音乐的点击事件
  onPlayTap:function(event){
    var isPlayingMusic=this.data.isPlayingMusic
    if (isPlayingMusic){
        wx.pauseBackgroundAudio()
        this.setData({
          isPlayingMusic:false
        })

    }else{
      console.log(postsData.postList[postId])
      wx.playBackgroundAudio({
        dataUrl: postsData.postList[postId].music.url,
        title: postsData.postList[postId].music.title,
        coverImgUrl: postsData.postList[postId].music.coverImg
      })

      this.setData({
        isPlayingMusic: true
      })
    }
  }
})