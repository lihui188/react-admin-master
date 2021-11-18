import React, { Component } from "react"
import {
  Card,
  Button,
  Input,
  Table,
  Space,
  message,
  Modal,
} from "antd"
import { ExclamationCircleOutlined } from "@ant-design/icons"

import AddRole from "./components/form"
import { delRole,getList } from "@/api/request/menu"

const { confirm } = Modal

export default class Roles extends Component {
  form = React.createRef()
  state = {
    showModel: false,
    total: 0,
    page: 1,
    size: 10,
    rolesList: [],
    isAdd: true,
    columns: [
      {
        title: "菜单名称",
        dataIndex: "menuName",
        key: "menuName",
      },
      {
        title: "图标",
        dataIndex: "icon",
        key: "icon",
      },
      {
        title: "是否显示",
        dataIndex: "isShow",
        key: "isShow",
      },
      {
        title: "排序",
        dataIndex: "sort",
        key: "sort",
      },
      {
        title: "描述",
        dataIndex: "description",
        key: "description",
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
    this.getData()
  }
  // 获取分页数据
  getData = () => {
    getList().then((res) => {
      let data = res.data
      this.setState({
        total: data.count,
        rolesList: data.rows,
      })
    })
  }
  resetData = () => {
    this.setState({
      page: 1,
    })
    this.getData(1, this.state.size)
  }
  render() {
    const { rolesList, columns } = this.state
    return (
      <Card title="菜单管理">
        <div>
          <Input className="input-width margin-box" placeholder="角色名称" />
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
        />
        {/* <Pagination
          showQuickJumper
          defaultCurrent={1}
          defaultPageSize={this.state.size}
          onShowSizeChange={this.onShowSizeChange}
          total={this.state.total}
          hideOnSinglePage={false}
          className="pagination"
          onChange={this.onChange}
        /> */}
        <AddRole ref={this.form} resetData={this.resetData} />
      </Card>
    )
  }
}
