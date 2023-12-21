// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database();
const _ = db.command;
// 云函数入口函数
exports.main = async (event, context) => {

  let {
    OPENID
  } = cloud.getWXContext();
  let { index } = event
  try {
    let [users] = await Promise.all([
      db.collection('user').where({
        openid: OPENID,
      }).get(),
    ])
      const diary = users.data[0].diary[index]
      
      return {
        success: true,
        data: {
          diary
        }
      };
    
  } catch (error) {
    return {
      success: false,
      errMsg: error
    };
  }


}