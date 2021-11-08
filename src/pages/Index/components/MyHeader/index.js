import React, { Component } from "react"
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons"
import { Avatar, Breadcrumb, Menu, Dropdown } from "antd"

import { storage } from "@/utils/storage"
import "./less/index.less"
import { Link } from "react-router-dom"
export default class MyHeader extends Component {
  logout = () => {
    storage.clearMemoryPmt()
  }
  render() {
    const menu = (
      <Menu>
        <Menu.Item key="1" icon={<UserOutlined />}>
          个人中心
        </Menu.Item>
        <Menu.Item key="2" icon={<SettingOutlined />}>
          个人设置
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          key="3"
          danger
          icon={<LogoutOutlined />}
          onClick={this.logout}>
          <Link to="/login">退出登录</Link>
        </Menu.Item>
      </Menu>
    )
    return (
      <div className="my_header">
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="">Application Center</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="">Application List</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>An Application</Breadcrumb.Item>
        </Breadcrumb>
        <Dropdown overlay={menu} placement="bottomLeft">
          <div>
            <Avatar icon={<UserOutlined />} />
            <span className="interval-left">admin</span>
          </div>
        </Dropdown>
      </div>
    )
  }
}
