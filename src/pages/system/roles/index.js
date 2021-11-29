import React, { Component } from "react"
import {
  Card,
  Button,
  Input,
  Table,
  Space,
  Pagination,
  message,
  Modal,
  Row,
  Col,
  Tree,
} from "antd"
import { ExclamationCircleOutlined } from "@ant-design/icons"

import AddRole from "./components/form"
import { getPage, delRole } from "@/api/request/role"
import { getList } from "@/api/request/menu"
import { assignMenu } from "@/api/request/assign_menu"

const { confirm } = Modal

export default class Roles extends Component {
  form = React.createRef()
  state = {
    showModel: false,
    total: 0,
    page: 1,
    size: 10,
    rolesList: [],
    currentRole: null, //选中角色对象
    checkedKeys: [], //选中菜单id
    columns: [
      {
        title: "角色名称",
        dataIndex: "roleName",
        key: "roleName",
      },
      {
        title: "创建时间",
        dataIndex: "createdAt",
        key: "createdAt",
      },
      {
        title: "操作",
        key: "operation",
        render: (_, record) => (
          <Space size="middle">
            <a onClick={() => this.showEdit(record)}>编辑</a>
            <a onClick={() => this.deleteRole(record)}>删除</a>
          </Space>
        ),
      },
    ],
    treeData: [],
  }
  showModel = () => {
    this.form.current.setShowModel(true)
  }
  showEdit = (row) => {
    this.form.current.setShowModel(false)
    this.form.current.getDetail(row.id)
  }
  deleteRole = (row) => {
    confirm({
      title: "删除数据",
      icon: <ExclamationCircleOutlined />,
      content: "是否确认删除该条数据？删除后无法恢复",
      okText: "删除",
      okType: "danger",
      cancelText: "取消",
      onOk: () => {
        delRole({
          ids: [row.id],
        }).then((res) => {
          message.success("删除成功")
          this.getData(this.state.page, this.state.size)
        })
      },
    })
  }
  componentDidMount = () => {
    const { page, size } = this.state
    this.getData(page, size)
    this.getMenuData()
  }
  // 获取分页数据
  getData = (page, size) => {
    getPage({
      page: page - 1,
      size,
    }).then((res) => {
      let data = res.data
      this.setState({
        total: data.count,
        rolesList: data.rows,
      })
    })
  }
  onChange = (pageNumber) => {
    this.setState({
      page: pageNumber,
    })
    this.getData(pageNumber, this.state.size)
  }
  resetData = () => {
    this.setState({
      page: 1,
    })
    this.getData(1, this.state.size)
  }
  onShowSizeChange = (page, size) => {
    this.setState({
      page,
      size,
    })
  }
  // 行点击事件 选中一个角色
  clickRow = (record) => {
    let menuIds = record.menuList.map((v) => v.id)
    // console.log(menuIds)
    this.setState({
      currentRole: record,
      checkedKeys: menuIds,
    })
  }
  // 扁平化角色拥有的树形菜单
  /* formatMentList(menus){

  } */
  // 保存修改后菜单
  saveAssginMenu = () => {
    if (!this.state.currentRole) {
      message.warn("请先选择角色")
      return
    }
    let data = {}
    data.roleId = this.state.currentRole.id
    data.menuIds = this.state.checkedKeys
    assignMenu(data).then((res) => {
      message.success("角色分配菜单成功")
      this.resetData()
    })
  }
  // 树形控件数据获取
  getMenuData = () => {
    getList().then((res) => {
      let data = res.data
      let treeData = this.formatTreeData(data.rows)
      this.setState({
        treeData,
      })
    })
  }
  // 格式化树形数据
  formatTreeData = (data) => {
    let item = []
    data.forEach((list) => {
      let newData = {}
      newData.key = list.id
      newData.title = list.menuName
      newData.children = list.children ? this.formatTreeData(list.children) : [] // 如果还有子集，就再次调用自己
      item.push(newData)
    })
    return item
  }
  onCheck = (checkedKeys,info) => {
    this.setState({
      checkedKeys,
    })
  }
  render() {
    const { rolesList, columns, treeData, currentRole, checkedKeys } =
      this.state
    return (
      <Row gutter={10}>
        <Col className="gutter-row" span={17}>
          <Card title="角色管理">
            <div>
              <Input
                className="input-width margin-box"
                placeholder="角色名称"
              />
              <Button
                className="margin-box"
                type="primary"
                onClick={this.showModel}>
                新增
              </Button>
              <Button
                className="margin-box"
                type="success"
                onClick={this.resetData}>
                刷新
              </Button>
            </div>
            <Table
              rowKey="id"
              columns={columns}
              dataSource={rolesList}
              pagination={false}
              onRow={(record) => {
                return {
                  onClick: () => {
                    this.clickRow(record)
                  }, // 点击行
                }
              }}
            />
            <Pagination
              showQuickJumper
              defaultCurrent={this.state.page}
              defaultPageSize={this.state.size}
              onShowSizeChange={this.onShowSizeChange}
              total={this.state.total}
              hideOnSinglePage={false}
              className="pagination"
              onChange={this.onChange}
            />
            <AddRole ref={this.form} resetData={this.resetData} />
          </Card>
        </Col>
        <Col className="gutter-row" span={7}>
          <Card
            title={
              "菜单分配" + (currentRole ? " --- " + currentRole.roleName : "")
            }
            extra={
              <Button onClick={this.saveAssginMenu}>
                保存
              </Button>
            }>
            {treeData.length > 0 ? (
              <Tree
                checkable
                // defaultExpandAll={true}
                checkedKeys={checkedKeys}
                onCheck={this.onCheck}
                treeData={treeData}
              />
            ) : null}
            {/* <Tree
              checkable
              defaultExpandAll={true}
              onCheck={this.onCheck}
              treeData={treeData}
            /> */}
          </Card>
        </Col>
      </Row>
    )
  }
}
