const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}

//将分数转化为星星
function convertToStars(stars){
    var num=stars.toString().substring(0,1);  
    var array=[]
    for(var i=1;i<=5;i++){
      if(i<=num){
        array.push(1)
      }else{
        array.push(0)
      }
    }
    return array
}

function http(url,callback){
  wx.request({
    url: url,
    method: 'GET',
    header: {
      //这里一定要写成json才能请求带代理的豆瓣服务器
      "Content-Type": "json"
    },
    success: function (res) {
      callback(res)
    },
    fail: function (error) {
      console.log("请求失败:" + error)
    }
  })
}

module.exports={
  convertToStars: convertToStars,
  http:http
}


