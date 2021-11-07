import React, { Component } from "react"
import { UserOutlined, DownOutlined } from "@ant-design/icons"
import { Avatar, Breadcrumb, Menu, Dropdown } from "antd"
import "./less/index.less"
export default class MyHeader extends Component {
  render() {
    const menu = (
      <Menu>
        <Menu.Item>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.antgroup.com">
            1st menu item
          </a>
        </Menu.Item>
        <Menu.Item icon={<DownOutlined />} disabled>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.aliyun.com">
            2nd menu item (disabled)
          </a>
        </Menu.Item>
        <Menu.Item disabled>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.luohanacademy.com">
            3rd menu item (disabled)
          </a>
        </Menu.Item>
        <Menu.Item danger>a danger item</Menu.Item>
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
        <Dropdown overlay={menu}>
          <div>
            <Avatar icon={<UserOutlined />} />
            <span className="interval-left">admin</span>
          </div>
        </Dropdown>
      </div>
    )
  }
}
