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
  try {
    // 根据 openid 查询用户信息

    let [users] = await Promise.all([
      db.collection('user').where({
        openid: OPENID
      }).get(),
    ])
    console.log(users)
    let {
      jia,
      yi,
      date,
      diary
    } = users.data[0]
    const fullYear = new Date(date).getFullYear()
    const month = new Date(date).getMonth()
    const day = new Date(date).getUTCDate()
    const dday = Math.trunc((new Date().getTime() - new Date(fullYear, month, day).getTime()) / 86400000).toString()
    const newDiary = {
      dday,
      content: '',
      creat_time: new Date()
    }
    let ifFirst
    for (const i of diary) {
      if(i.dday===dday) {
        ifFirst = false
      } else {
        ifFirst = true
      }
    }
    console.log(ifFirst)
    if(ifFirst) {
      await db.collection('user').where({
        openid: OPENID
      }).update({
        data: {
          diary: _.push(newDiary)
        }
      })
    }
    let [users2] = await Promise.all([
      db.collection('user').where({
        openid: OPENID
      }).get(),
    ])
    let diary2 = users2.data[0].diary
    console.log(diary2)
    return {
      success: true,
      data: {
        jia,
        yi,
        date,
        diary: diary2
      }
    }

  } catch (error) {
    return {
      success: false,
      errMsg: error
    };
  }
}