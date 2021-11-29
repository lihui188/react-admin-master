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
    http("post", "/api/role/add", data).then(
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
    http("get", "/api/role/page", data).then(
      (res) => {
        resolve(res)
      },
      (error) => {
        reject(error)
      }
    )
  })
}
function getRole(id) {
  return new Promise((resolve, reject) => {
    http("get", `/api/role/get/${id}`).then(
      (res) => {
        resolve(res)
      },
      (error) => {
        reject(error)
      }
    )
  })
}
function delRole(data) {
  return new Promise((resolve, reject) => {
    http("post", `/api/role/del`,data).then(
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
    http("post", `/api/role/edit`,data).then(
      (res) => {
        resolve(res)
      },
      (error) => {
        reject(error)
      }
    )
  })
}
function list() {
  return new Promise((resolve, reject) => {
    http("get", `/api/role/list`).then(
      (res) => {
        resolve(res)
      },
      (error) => {
        reject(error)
      }
    )
  })
}
function getRoleMenu() {
  return new Promise((resolve, reject) => {
    http("get", "/api/role/menu").then(
      (res) => {
        resolve(res)
      },
      (error) => {
        reject(error)
      }
    )
  })
}

export { add,getPage,getRole,delRole,edit,list,getRoleMenu }
