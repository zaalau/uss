// pages/home/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: '',
    showTextarea: false
  },
  setTextarea(e) {
    if (e === 'confirm') {
      this.setData({
        showTextarea: false
      })
    } else {
      this.setData({
        showTextarea: !this.data.showTextarea
      })
    }

    wx.vibrateShort()

  },
  setContent(e) {
    this.setData({
      content: e.detail.value
    })
    const { dday } = this.data
    const content = e.detail.value
    wx.cloud.callFunction({
      // 云函数名称
      name: 'update_diary',
      // 传给云函数的参数
      data:{ dday, content },
      success: res=> {
        console.log(res)
      },
      fail: console.error
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.cloud.callFunction({
      // 云函数名称
      name: 'home_init',
      // 传给云函数的参数
      success: res=> {
        const {
          date,
          jia,
          yi,
          diary
        } = res.result.data
        const fullYear = new Date(date).getFullYear()
        const month = new Date(date).getMonth()
        const day = new Date(date).getUTCDate()
        for (const value of diary) {
          if(value.dday===Math.trunc((new Date().getTime() - new Date(fullYear, month, day).getTime()) / 86400000)) {
            this.setData({
              content: value.content
            })
          }
        }
        this.setData({
          dday: Math.trunc((new Date().getTime() - new Date(fullYear, month, day).getTime()) / 86400000),
          jia,
          yi,
        })
      },
      fail: console.error
    })




    const res = wx.getMenuButtonBoundingClientRect()
    this.setData({
      menuHeight: res.height,
      menuWidth: res.width,

      Year: new Date().getFullYear(),
      Month: new Date().getMonth() + 1,
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


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

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