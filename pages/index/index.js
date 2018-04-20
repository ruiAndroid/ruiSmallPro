//index.js
//获取应用实例
const app = getApp()

Page({
  data: {

  }
  //跳转到新闻列表详情
  ,toPostLists: function (event) {
      console.log("跳转到新闻程序列表")
      wx.navigateTo({
        //需要跳转的界面路径
        url: '/pages/posts/post',
      })
  }
})
