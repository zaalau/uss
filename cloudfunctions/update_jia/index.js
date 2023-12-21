// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}) // 使用当前云环境
const db = cloud.database();
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {

  let {
    OPENID
  } = cloud.getWXContext();
  let {
    date,
    jia,
    yi
  } = event
  try {
    const fullYear = new Date(date).getFullYear()
    const month = new Date(date).getMonth()
    const day = new Date(date).getUTCDate()
    const dday = Math.trunc((new Date().getTime() - new Date(fullYear, month, day).getTime()) / 86400000).toString()
    const newDiary = [{
      dday,
      content: '',
      creat_time: new Date()
    }]
    await db.collection('user').where({
      openid: OPENID
    }).update({
      data: {
        date,
        jia,
        yi,
        diary: newDiary 
      }
    })

    return {
      success: true,
      data: {
        successMSG: 'update jiayiinfo SUCCESS'
      }
    };
  } catch (error) {
    return {
      success: false,
      errMsg: error
    };
  }


}