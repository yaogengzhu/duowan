const {
    config
  } = require('./config')
  
  function request(options, cb = () => {}) {
    let {
      method,
      url,
      data,
      form
    } = options
    let header = {}
    if (form) {
      header = {
        'content-type': 'application/x-www-form-urlencoded'
      }
    } else {
      header = {
        'content-type': 'application/json' //自定义请求头信息
      }
    }
  
    return new Promise((resolve, reject) => {
      // https://developers.weixin.qq.com/miniprogram/dev/api/network/request/RequestTask.html 
      // requestTask.abort() // 取消请求任务
      const requestTask = wx.request({
        url: config.main + url,
        data,
        header,
        method,
        success: (res) => {
          const {
            data,
            statusCode
          } = res
          if (statusCode === 200) {
            resolve(data)
          }
        },
        fail: (err) => {
          reject(err)
        }
      })
      cb(requestTask)
    })
  }
  
  module.exports = {
    request
  }