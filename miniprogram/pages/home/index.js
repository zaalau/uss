// pages/home/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: '',
    showTextarea: false,
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
    const {
      dday,
      content
    } = this.data
    wx.cloud.callFunction({
      // 云函数名称
      name: 'update_diary',
      // 传给云函数的参数
      data: {
        dday,
        content
      }, 
      success: res => {
        const diaryArr = res.result.data.diary.map((v, i) => {
          return `${v.creat_time.slice(0,10)} 第${v.dday}天`
        })
        this.setData({
          diaryArr,
          content
        })
      },
      fail: console.error
    })
    wx.vibrateShort()

  },
  setContent(e) {
    const content = e.detail.value.replace(/(\n\r|\r\n|\r|\n)/g, '\n')
    this.setData({
      content
    })
  },
  bindPickerChange(e) {
    const index = e.detail.value
    wx.cloud.callFunction({
      // 云函数名称
      name: 'diary_history',
      // 传给云函数的参数
      data: {
        index
      },
      success: res => {
        const {
          dday,
          content
        } = res.result.data.diary
        this.setData({
          dday,
          content
        })
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
      success: res => {
        console.log(res)
        const {
          date,
          jia,
          yi,
          diary
        } = res.result.data
        const fullYear = new Date(date).getFullYear()
        const month = new Date(date).getMonth()
        const day = new Date(date).getUTCDate()
        console.log('1',diary)
        let diaryArr;
        let diarys;
        if(diary===[]){
          diaryArr = ['暂无日志'],
          diarys = [{content:''}]
        }else {
          diaryArr = diary.map((v, i) => {
            return `${v.creat_time.slice(0,10)} 第${v.dday}天`
          }) ;
          diarys = diary.filter((v) => v.dday === Math.trunc((new Date().getTime() - new Date(fullYear, month, day).getTime()) / 86400000).toString());
        }
        console.log('2',diarys)
        console.log('3',diaryArr)

        this.setData({
          content: diarys[0].content,
          dday: Math.trunc((new Date().getTime() - new Date(fullYear, month, day).getTime()) / 86400000).toString(),
          jia,
          yi,
          diaryArr,
          diary: diary || []
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