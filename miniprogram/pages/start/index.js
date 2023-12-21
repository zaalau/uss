// pages/start/index.js
import {
  pinyin
} from "pinyin-pro";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jiaP: true,
    yiP: true
  },
  toHome() {
    const {
      jia,
      yi,
      date
    } = this.data
    if (jia && yi && date) {
      wx.cloud.callFunction({
        // 云函数名称
        name: 'update_jia',
        // 传给云函数的参数
        data: {
          jia,
          yi,
          date
        },
        success: function(res) {
          wx.reLaunch({
            url: `../home/index?date=${date}&jia=${jia}&yi=${yi}`,
          })
        },
        fail: console.error
      })
      
    } else {
      wx.showToast({
        title: '请完整填写',
        icon: 'error'
      })
    }

  },
  setJiaP() {
    this.setData({
      jiaP: false
    })
  },
  showJiap() {
    const {
      jia
    } = this.data
    if (!jia || jia === '') {
      this.setData({
        jiaP: true
      })
    }
  },
  handleJia(e) {
    const jia = e.detail.value.trim()
    this.setData({
      jia: pinyin(jia, {
        toneType: 'none'
      }).replace(/\s*/g, "")
    })
  },
  setYiP() {
    this.setData({
      yiP: false
    })
  },
  showYip() {
    const {
      yi
    } = this.data
    if (!yi || yi === '') {
      this.setData({
        yiP: true
      })
    }
  },
  handleYi(e) {
    const yi = e.detail.value.trim()
    this.setData({
      yi: pinyin(yi, {
        toneType: 'none'
      }).replace(/\s*/g, "")
    })
  },
  bindDateChange(e) {
    this.setData({
      date: e.detail.value
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
    })
    wx.getSystemInfo({
      success: res => {
        this.setData({
          startHeight: res.windowHeight,
          startWidth: res.windowWidth,
          statusBarHeight: res.statusBarHeight
        })
      }
    })
    wx.cloud.callFunction({
      // 云函数名称
      name: 'start_init',
      // 传给云函数的参数
      success: function(res) {
        const { jia, yi, date } = res.result.data
        if(jia!='') {
          wx.reLaunch({
            url: `../home/index?date=${date}&jia=${jia}&yi=${yi}`,
          })
        } 
        console.log(res)

      },
      fail: console.error
    })
    const fullYear = new Date().getFullYear()
    const month = new Date().getMonth() + 1
    const Today = new Date().getUTCDate()
    const rightNow = fullYear + '-' + month + '-' + Today
    this.setData({
      rightNow
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