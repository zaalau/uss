// pages/start/index.js
import { pinyin } from "pinyin-pro";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jiaP:true,
    yiP:true
  },
  toHome() {
    wx.navigateTo({
      url: '../home/index',
    })
  },
  setJiaP() {
    this.setData({
      jiaP:false
    })
  },
  showJiap() {
    const { jia } = this.data
    if(!jia||jia==='') {
      this.setData({
        jiaP:true
      })
    }
  },
  handleJia(e) {
    const jia = e.detail.value.trim()
    this.setData({
      jia: pinyin(jia).replace(/\s*/g,"")
    })
  },
  setYiP() {
    this.setData({
      yiP:false
    })
  },
  showYip() {
    const { yi } = this.data
    if(!yi||yi==='') {
      this.setData({
        yiP:true
      })
    }
  },
  handleYi(e) {
    const yi = e.detail.value.trim()
    this.setData({
      yi:pinyin(yi).replace(/\s*/g,"")
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // console.log(pinyin('刘姐卡'))
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