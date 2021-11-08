import React, { Component } from "react"
import { Card, Button, Input, Table, Space, Pagination } from "antd"
import AddRole from "./components/form"
import { getPage } from "@/api/request/role"

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
        title: "角色名称",
        dataIndex: "role_name",
        key: "role_name",
      },
      {
        title: "创建时间",
        dataIndex: "created_at",
        key: "created_at",
      },
      {
        title: "操作",
        key: "operation",
        render: (_, record) => (
          <Space size="middle">
            <a onClick={() => this.showEdit(record)}>编辑</a>
            <a>删除</a>
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
  componentDidMount = () => {
    const { page, size } = this.state
    this.getData(page, size)
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
  onShowSizeChange = (current, pageSize) => {
    this.setState({
      page: current,
      size: pageSize,
    })
  }
  render() {
    const { rolesList, columns } = this.state
    return (
      <Card title="角色管理">
        <div>
          <Input className="input-width" placeholder="角色名称" />
          <Button
            className="margin-box"
            type="primary"
            onClick={this.showModel}>
            新增
          </Button>
        </div>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={rolesList}
          pagination={false}
        />
        <Pagination
          showQuickJumper
          defaultCurrent={1}
          defaultPageSize={this.state.size}
          onShowSizeChange={this.onShowSizeChange}
          total={this.state.total}
          hideOnSinglePage={false}
          className="pagination"
          onChange={this.onChange}
        />
        <AddRole ref={this.form} />
      </Card>
    )
  }
}
