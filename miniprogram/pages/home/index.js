// pages/home/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:'今天我们一起吃了这路也，那是我最爱吃的这路也，知道吗，喝喝我很愤怒，我们还是吵架了，一天可以吵架八千次，不过我还能靠写页面消解，恩恩我就是个废物，其实我很想去洗澡上去和你睡觉了，想喝酒。。enen-/-今天我们一起吃了这路也，那是我最爱吃的这路也，知道吗，喝喝我很愤怒，我们还是吵架了，一天可以吵架八',
    showTextarea:false
  },
  setTextarea(e) {
    if(e==='confirm') {
      this.setData({
        showTextarea: false
      })
    }else {
      this.setData({
        showTextarea: !this.data.showTextarea
      })
    }
    
    wx.vibrateShort()

  },
  setContent(e) {
    this.setData({
      content:e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const res = wx.getMenuButtonBoundingClientRect()
    this.setData({
      menuHeight: res.height,
      menuWidth: res.width,
      dday: Math.trunc((new Date().getTime()-new Date(2022,6,19).getTime())/86400000),
      Year: new Date().getFullYear(),
      Month: new Date().getMonth()+1,
      Dateday: new Date().getDate(),
    })
    wx.getSystemInfo({
      success: res => {
        this.setData({
          homeHeight: res.windowHeight,
          homeWidth: res.windowWidth,
          statusBarHeight: res.statusBarHeight
        })
      }
    })
    wx.loadFontFace({
      family: 'num',
      source: 'url("https://636c-cloud1-5g71z22k302f6667-1322740242.tcb.qcloud.la/THE-GLITCH.ttf?sign=b79309666bbcdd1c159fa1cc244ffd34&t=1701102360")',
      scopes: ['webview', 'native'], //由于canvas是原生组件，所以需要加上native，否则无效

      success: function () {}
    })
    
    wx.loadFontFace({
      family: 'ji',
      source: 'url("https://636c-cloud1-5g71z22k302f6667-1322740242.tcb.qcloud.la/Rebelion.ttf?sign=74de1913683fb212594d1bd4cec29b43&t=1701101043")',
      scopes: ['webview', 'native'], //由于canvas是原生组件，所以需要加上native，否则无效

      success: function () {}
    })
    wx.loadFontFace({
      family: 'chi',
      source: 'url("https://636c-cloud1-5g71z22k302f6667-1322740242.tcb.qcloud.la/MFDianHui_Noncommercial-Regular.otf?sign=c208422b462c12c077f6f21fe4d9fa68&t=1701329301")',
      scopes: ['webview', 'native'], //由于canvas是原生组件，所以需要加上native，否则无效

      success: function () {}
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    console.log(this.data.content.length)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})