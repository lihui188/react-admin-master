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
function add(data) {
  return new Promise((resolve, reject) => {
    http("post", "/api/menu/add", data).then(
      (res) => {
        resolve(res)
      },
      (error) => {
        reject(error)
      }
    )
  })
}
function getList(data) {
  return new Promise((resolve, reject) => {
    http("get", "/api/menu/list", data).then(
      (res) => {
        resolve(res)
      },
      (error) => {
        reject(error)
      }
    )
  })
}
function getPage(data) {
  return new Promise((resolve, reject) => {
    http("get", "/api/menu/page", data).then(
      (res) => {
        resolve(res)
      },
      (error) => {
        reject(error)
      }
    )
  })
}
function getMenu(id) {
  return new Promise((resolve, reject) => {
    http("get", `/api/menu/get/${id}`).then(
      (res) => {
        resolve(res)
      },
      (error) => {
        reject(error)
      }
    )
  })
}
function delMenu(data) {
  return new Promise((resolve, reject) => {
    http("post", `/api/menu/del`, data).then(
      (res) => {
        resolve(res)
      },
      (error) => {
        reject(error)
      }
    )
  })
}
function edit(data) {
  return new Promise((resolve, reject) => {
    http("post", `/api/menu/edit`, data).then(
      (res) => {
        resolve(res)
      },
      (error) => {
        reject(error)
      }
    )
  })
}

export { add, getPage, getMenu, delMenu, edit, getList }
