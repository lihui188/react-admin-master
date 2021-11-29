import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { Menu } from "antd"
import antdSvg from "@/assets/images/antd.svg"
import * as Icon from "@ant-design/icons"
import "./less/index.less"
import { Link } from "react-router-dom"
// import { storage } from "@/utils/storage"
import { getRoleMenu } from "@/api/request/role"

const { SubMenu } = Menu
class MySider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      openKeys: [],
      treeMenu: [],
      collapsed: this.props.collapsed,
      selectedKeys: this.props.location.pathname,
    }
  }
  renderMenuTree = (treeMenu) => {
    return treeMenu.map((item) => {
      if (item.children && item.children.length > 0) {
        return (
          <SubMenu
            key={item.path}
            icon={this.createdIcon(item.icon)}
            title={item.menuName}>
            {this.renderMenuTree(item.children)}
          </SubMenu>
        )
      } else {
        return (
          <Menu.Item icon={this.createdIcon(item.icon)} key={item.path}>
            <Link to={item.path ? item.path : "/home/404"}>
              {item.menuName}
            </Link>
          </Menu.Item>
        )
      }
    })
  }
  componentDidMount() {
    this.getTreeMenu()

    // 刷新页面更新默认状态
    const { pathname } = this.props.location
    let path = pathname.split("/")
    if (pathname.split("/").length > 2) {
      path = "/" + path[path.length - 2]
      this.setState({
        openKeys: [path],
      })
    }
    // 浏览器前进后退按钮更新菜单状态
    if (window.history && window.history.pushState) {
      window.onpopstate = function () {
        window.location.reload(true) //刷新页面
      }
    }
  }
  getTreeMenu = () => {
    getRoleMenu().then((res) => {
      this.setState({
        treeMenu: res.data.rows,
      })
    })
  }
  createdIcon = (item) => {
    if (item) {
      return React.createElement(Icon[item])
    } else {
      return null
    }
  }
  handleOpenChange = (k) => {
    if (k.length > 1) {
      this.setState({ openKeys: [k[k.length - 1]] })
    } else {
      this.setState({ openKeys: k })
    }
  }
  handleClickGoTo = (e) => {
    this.setState({ selectedKeys: e.key })
  }
  render() {
    const { openKeys, selectedKeys, treeMenu } = this.state
    return (
      <div className="my-sider dark">
        <div className={`sider-menu-logo dark`}>
          <a
            href="https://ant.design/components/overview-cn/"
            target="_blank"
            rel="noopener noreferrer">
            <img src={antdSvg} alt="" />
            <h1>Ant Design</h1>
          </a>
        </div>
        <Menu
          className="menu-container"
          theme="dark"
          mode="inline"
          onClick={this.handleClickGoTo}
          // 当前展开的 SubMenu 菜单项 key 数组
          openKeys={openKeys}
          // inline 时菜单是否收起状态
          // inlineCollapsed={this.collapsed}
          // SubMenu 展开/关闭的回调
          onOpenChange={this.handleOpenChange}
          selectedKeys={[selectedKeys]}>
          {/* <Menu.Item icon={this.createdIcon("MailOutlined")} key="/welcome">
            <Link to="/welcome">欢迎</Link>
          </Menu.Item> */}
          {this.renderMenuTree(treeMenu)}
          {/* <SubMenu key="sub1" title="系统管理">
            <Menu.Item key="1">
              <Link to="/system/menu">菜单管理</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/system/roles">角色管理</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/system/user">用户管理</Link>
            </Menu.Item>
          </SubMenu> */}
        </Menu>
      </div>
    )
  }
}
export default withRouter(MySider)
