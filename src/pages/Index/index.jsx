import React, { Component } from "react"
import { Layout } from "antd"

import { Redirect, Switch, Route } from "react-router-dom"
import { storage } from "../../utils/storage"
import MySider from "./components/MySider/index"
import MyHeader from "./components/MyHeader/index"
// import MyContent from "./components/MyContent/index"
import "./less/index.less"

// 引入页面组件

import Welcome from "../welcome"
import Menu from "../system/menu"
import Roles from "../system/roles"

const { Header, Sider, Content } = Layout

export default class Index extends Component {
  state = {
    collapsed: false,
  }
  onCollapse = (collapsed) => {
    this.setState({ collapsed })
  }
  render() {
    const { collapsed } = this.state
    const token = storage.getMemoryPmt("token") || ""
    if (!token) {
      return <Redirect to="/login" />
    }
    return (
      <Layout style={{ height: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <MySider />
        </Sider>
        <Layout>
          <Header style={{ padding: 0 }}>
            <MyHeader />
          </Header>
          <Content style={{padding:'15px'}}>
            {/* <MyContent /> */}
            <Switch>
              <Route path="/welcome" component={Welcome}></Route>
              <Route path="/home/menu" component={Menu}></Route>
              <Route path="/home/roles" component={Roles}></Route>
              <Redirect to="/welcome" />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    )
  }
}
