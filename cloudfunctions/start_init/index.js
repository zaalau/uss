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
  let user;
  try {
    // 根据 openid 查询用户信息

    let [users] = await Promise.all([
      db.collection('user').where({
        openid: OPENID
      }).get(),
    ])
    // 查询不到信息，说明是新用户，创建用户
    if (users.data.length === 0) {
      const newUser = {
        openid: OPENID, // 创建用户 openid
        create_time: new Date(), // 创建时间
        date: '',
        jia: '',
        yi: '',
        diary: [],
        extent_info: {} // 扩展信息，空对象
      }
      await db.collection('user').add({
        data: newUser
      })
      user = newUser
      return {
        success: true,
        data: {
          successMSG: 'HOME INIT SUCCESS',
          date: '',
          jia: '',
          yi: '',
          diary: [],
        }
      };
    } else {
      let {
        jia,
        yi,
        date,
        diary
      } = users.data[0]
      return {
        success: true,
        data: {
          jia,
          yi,
          date,
          diary
        }
      }
    }
  } catch (error) {
    return {
      success: false,
      errMsg: error
    };
  }


}