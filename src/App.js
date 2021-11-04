/*
 * @Description: 应用根组件
 * @Author: lihui
 * @Date: 2021-11-03
 * @LastEditTime: 2021-11-03
 * @LastEditors: Please set LastEditors
 */
import React, { Component } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Layout from "./pages/Layout"
import Login from "./pages/Login"

import "./App.less"

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          {/* 只匹配其中一个路由 */}
          <Route path="/login" component={Login}></Route>
          <Route path="/" component={Layout}></Route>
        </Switch>
      </BrowserRouter>
    )
  }
}
