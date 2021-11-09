import React, { Component } from "react"
import { withRouter } from "react-router-dom"

import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons"

import { Avatar, Breadcrumb, Menu, Dropdown, Modal } from "antd"
import { storage } from "@/utils/storage"
import "./less/index.less"

const { confirm } = Modal

// import { Link } from "react-router-dom"
class MyHeader extends Component {
  logout = () => {
    confirm({
      title: "删除数据",
      icon: <ExclamationCircleOutlined />,
      content: "是否确认删除该条数据？删除后无法恢复",
      okText: "删除",
      okType: "danger",
      cancelText: "取消",
      onOk: () => {
        storage.clearMemoryPmt()
        this.props.history.push("/login")
      },
    })
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
          退出登录
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
export default withRouter(MyHeader)
