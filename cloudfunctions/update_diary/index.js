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
    dday,
    content
  } = event
  // console.log(dday,
  //   content)
  try {
    let [users] = await Promise.all([
      db.collection('user').where({
        openid: OPENID,
        diary: {
          dday
        }
      }).get(),
    ])
    console.log(users)
    if (users.data.length === 0) {
      const newDiary = {
        dday,
        content
      }
      await db.collection('user').where({
        openid: OPENID
      }).update({
        data: {
          diary: _.push(newDiary)
        }
      })
      return {
        success: true,
        data: {
          successMSG: 'update diary SUCCESS'
        }
      };
    } else {
      const newDiary = users.data[0].diary.map((v, i) => {
        if (v.dday === dday) {
          console.log('1')
          return {
            dday,
            content
          }
        }
      })
      await db.collection('user').where({
        openid: OPENID
      }).update({
        data: {
          diary: newDiary
        }
      })
      return {
        success: true,
        data: {
          successMSG: 'update diary SUCCESS'
        }
      };
    }
  } catch (error) {
    return {
      success: false,
      errMsg: error
    };
  }


}