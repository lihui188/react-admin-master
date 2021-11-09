import { USERINFO } from "../constant"

//初始化人的列表
const user = {}

export default function userReducer(preState = user, action) {
  // console.log('personReducer@#@#@#');
  const { type, data } = action
  switch (type) {
    case USERINFO: //若是添加一个人
      return data
    default:
      return preState
  }
}
