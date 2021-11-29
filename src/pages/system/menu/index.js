import React, { Component } from "react"
import { Card, Button, Input, Table, Space, message, Modal, Tag } from "antd"
import { ExclamationCircleOutlined } from "@ant-design/icons"

import AddRole from "./components/form"
import { delMenu, getList } from "@/api/request/menu"
import * as Icon from "@ant-design/icons"

const { confirm } = Modal

export default class Roles extends Component {
  form = React.createRef()
  state = {
    showModel: false,
    total: 0,
    page: 1,
    size: 10,
    menuList: [],
    isAdd: true,
    columns: [
      {
        title: "菜单名称",
        dataIndex: "menuName",
        key: "menuName",
        width: 200,
      },
      {
        title: "图标",
        dataIndex: "icon",
        key: "icon",
        width: 100,
        render: (row) => {
          return this.createdIcon(row)
        },
      },
      {
        title: "是否显示",
        dataIndex: "isShow",
        key: "isShow",
        width: 150,
        render: (row) => {
          let color = row ? "blue" : "green"
          return <Tag color={color}>{row ? "是" : "否"}</Tag>
        },
      },
      {
        title: "排序",
        dataIndex: "sort",
        key: "sort",
        width: 150,
      },
      {
        title: "页面路径",
        dataIndex: "path",
        key: "path",
        width: 150,
        ellipsis: true,
      },
      {
        title: "组件路径",
        dataIndex: "comPath",
        key: "comPath",
        width: 150,
        ellipsis: true,
      },
      {
        title: "描述",
        dataIndex: "description",
        key: "description",
        ellipsis: true,
      },
      {
        title: "创建时间",
        dataIndex: "createdAt",
        key: "createdAt",
        width: 200,
        ellipsis: true,
      },
      {
        title: "操作",
        key: "operation",
        fixed: "right",
        width: 150,
        render: (_, record) => (
          <Space size="middle">
            <a onClick={() => this.showEdit(record)}>编辑</a>
            <a onClick={() => this.deleteRole(record)}>删除</a>
          </Space>
        ),
      },
    ],
  }
  createdIcon = (item) => (item ? React.createElement(Icon[item]) : "")
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
        delMenu({
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
        menuList: data.rows,
      })
      this.form.current.state.menuData = data.rows
    })
  }
  resetData = () => {
    this.getData()
  }
  render() {
    const { menuList, columns } = this.state
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
        {menuList.length > 0 ? (
          <Table
            rowKey={"id"}
            bordered
            scroll={{ x: 1200 }}
            columns={columns}
            dataSource={menuList}
            pagination={false}
            expandable={{
              defaultExpandAllRows: "true",
            }}
          />
        ) : (
          <Table
            rowKey={"id"}
            bordered
            scroll={{ x: 1200 }}
            columns={columns}
            dataSource={[]}
            pagination={false}
          />
        )}
        {/*  <Table
          rowKey={"id"}
          bordered
          scroll={{ x: 1200 }}
          columns={columns}
          dataSource={menuList}
          pagination={false}
          expandable = {{
            defaultExpandAllRows:'true'
          }}
        /> */}
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
