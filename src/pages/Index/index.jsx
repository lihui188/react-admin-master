import React, { Component } from "react"
import { Layout } from "antd"

import { Redirect, Switch, Route } from "react-router-dom"
import { storage } from "../../utils/storage"
import MySider from "./components/MySider/index"
import MyHeader from "./components/MyHeader/index"
// import MyContent from "./components/MyContent/index"
import "./less/index.less"
import { getRoleMenu } from "@/api/request/role"

// 引入页面组件
import Welcome from "../welcome"
import Menu from "../system/menu"
import Roles from "../system/roles"
import User from "../system/user"

const { Header, Sider, Content } = Layout

export default class Index extends Component {
  state = {
    collapsed: false,
    treeMenu: [],
  }
  onCollapse = (collapsed) => {
    this.setState({ collapsed })
  }
  componentDidMount = () => {
    // this.getTreeMenu()
  }
  getTreeMenu = () => {
    getRoleMenu().then((res) => {
      this.setState({
        treeMenu: res.data.rows,
      })
    })
  }
  componentWillUnmount = () => {
    console.log("组件销毁")
  }
  render() {
    const { collapsed } = this.state
    const token = storage.getMemoryPmt("token") || ""
    if (!token) {
      return <Redirect to="/login" />
    }
    return (
      <Layout style={{ height: "100vh" }}>
        {/* <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}> */}
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <MySider collapsed={collapsed} />
        </Sider>
        <Layout>
          <Header style={{ padding: 0 }}>
            <MyHeader />
          </Header>
          <Content style={{ padding: "15px" }}>
            <Switch>
              <Route path="/welcome" component={Welcome}></Route>
              <Route path="/system/menu" component={Menu}></Route>
              <Route path="/system/roles" component={Roles}></Route>
              <Route path="/system/user" component={User}></Route>
              <Redirect to="/welcome" />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    )
  }
}
