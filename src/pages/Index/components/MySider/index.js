import React, { Component } from "react"
import { Menu } from "antd"
import { MailOutlined } from "@ant-design/icons"
import antdSvg from "@/assets/images/antd.svg"

import "./less/index.less"
import { Link } from "react-router-dom"

const { SubMenu } = Menu
export default class MySider extends Component {
  render() {
    return (
      <div className="my-sider dark">
        <div className={`sider-menu-logo dark`}>
          <a
            href="https://ant.design/docs/react/introduce-cn"
            target="_blank"
            rel="noopener noreferrer">
            <img src={antdSvg} alt="" />
            <h1>Ant Design</h1>
          </a>
        </div>
        <Menu className="menu-container" theme="dark" mode="inline">
          <Menu.Item icon={<MailOutlined />} key="2">
            <Link to="/welcome">欢迎</Link>
          </Menu.Item>
          <SubMenu key="sub1" icon={<MailOutlined />} title="系统管理">
            <Menu.Item key="1">
            <Link to="/home/menu">菜单管理</Link>
            </Menu.Item>
            <Menu.Item key="3">
            <Link to="/home/roles">角色管理</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    )
  }
}
