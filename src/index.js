/*
 * @Description: 入口组件
 * @Author: lihui
 * @Date: 2021-11-03
 * @LastEditTime: 2021-11-03
 * @LastEditors: Please set LastEditors
 */
import React from "react"
import reactDom from "react-dom"
import App from "./App"

import zh_CN from "antd/lib/locale-provider/zh_CN"
import { ConfigProvider } from "antd"
import moment from "moment"
import "moment/locale/zh-cn"
moment.locale("zh-cn")

reactDom.render(
  <ConfigProvider locale={zh_CN}>
    <App />
  </ConfigProvider>,
  document.getElementById("root")
)
