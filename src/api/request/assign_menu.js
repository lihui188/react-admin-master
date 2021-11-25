/*
 * @Description: 角色页面数据
 * @Author: lihui
 * @Date: 2021-11-08
 * @LastEditTime: 2021-11-08
 * @LastEditors: Please set LastEditors
 */
import http from "../http"

/**
 * 获取首页列表
 */
function assignMenu(data) {
  return new Promise((resolve, reject) => {
    http("post", "/api/role/assignMenu", data).then(
      (res) => {
        resolve(res)
      },
      (error) => {
        reject(error)
      }
    )
  })
}

export { assignMenu }
