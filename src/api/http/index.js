/**
 * 网络请求配置
 */
import axios from "axios"
import { message } from "antd"
import { storage } from "@/utils/storage"

/* import { useHistory } from "react-router-dom"
const history = useHistory() */
// import { createBrowserHistory } from "history"
// const history = createBrowserHistory() // history模式
// const history = createHashHistory() // hash模式

axios.defaults.timeout = 15000
axios.defaults.baseURL = "http://localhost:3333"

/**
 * http request 拦截器
 */
axios.interceptors.request.use(
  (config) => {
    config.data = JSON.stringify(config.data)
    config.headers = {
      "Content-Type": "application/json",
    }
    config.url.indexOf("login") !== -1
      ? (config.headers.Authorization = "")
      : (config.headers.Authorization = `Bearer ${storage.getMemoryPmt(
          "token"
        )}`)
    return config
  },
  (error) => {
    message.error("网络出错，请检查设备联网状态")
    return Promise.reject(error)
  }
)

/**
 * http response 拦截器
 */
axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

/**
 * 封装get方法
 * @param url  请求url
 * @param params  请求参数
 * @returns {Promise}
 */
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params,
      })
      .then((response) => {
        landing(url, params, response.data)
        resolve(response.data)
      })
      .catch((error) => {
        msag(error)
        reject(error)
      })
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data) {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(
      (response) => {
        resolve(response.data)
      },
      (err) => {
        msag(err)
        reject(err)
      }
    )
  })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data).then(
      (response) => {
        resolve(response.data)
      },
      (err) => {
        msag(err)
        reject(err)
      }
    )
  })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data).then(
      (response) => {
        resolve(response.data)
      },
      (err) => {
        msag(err)
        reject(err)
      }
    )
  })
}

//统一接口处理，返回数据
export default function http(fecth, url, param) {
  //    let _data = "";
  return new Promise((resolve, reject) => {
    switch (fecth) {
      case "get":
        get(url, param)
          .then(function (response) {
            resolve(response)
          })
          .catch(function (error) {
            reject(error)
          })
        break
      case "post":
        post(url, param)
          .then(function (response) {
            resolve(response)
          })
          .catch(function (error) {
            reject(error)
          })
        break
      default:
        break
    }
  })
}

//失败提示
function msag(err) {
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        message.error(err.response.data.desc)
        break
      case 401:
        message.error("登录状态过期，请重新登录！")
        storage.clearMemoryPmt()
        setTimeout(() => {
          window.location.href = "/login"
        }, 1500)

        /* Modal.error({
          title: "未授权，请登录",
          okText: "确认退出",
          onOk: () => {
            setTimeout(() => {
              window.location.href = "/login"
            }, 500)
          },
        }) */
        break
      case 403:
        message.error("暂无权限，拒绝访问")
        break
      case 404:
        message.error("请求地址出错")
        break
      case 408:
        message.error("请求超时")
        break
      case 500:
        message.error("服务器出错，请联系管理员")
        break
      case 501:
        message.error("服务未实现")
        break
      case 502:
        message.error("网关错误")
        break
      case 503:
        message.error("服务不可用")
        break
      case 504:
        message.error("网关超时")
        break
      case 505:
        message.error("HTTP版本不受支持")
        break
      default:
    }
  }
}

/**
 * 查看返回的数据
 * @param url
 * @param params
 * @param data
 */
function landing(url, params, data) {
  if (data.code === -1) {
  }
}
