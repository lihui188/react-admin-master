import React, { Component } from "react"
import {
  Card,
  Button,
  Input,
  Table,
  Space,
  message,
  Modal,
  Tag,
  Pagination,
} from "antd"
import { ExclamationCircleOutlined } from "@ant-design/icons"

import AddRole from "./components/form"
import { delUser, getPage } from "@/api/request/user"
import * as Icon from "@ant-design/icons"

const { confirm } = Modal

export default class Roles extends Component {
  form = React.createRef()
  state = {
    showModel: false,
    total: 0,
    page: 1,
    size: 10,
    tableList: [],
    isAdd: true,
    columns: [
      {
        title: "用户名称",
        dataIndex: "username",
        key: "username",
      },
      {
        title: "角色名称",
        dataIndex: "isShow",
        key: "isShow",
        render: (row) => {
          let color = row ? "blue" : "green"
          return <Tag color={color}>{row ? "是" : "否"}</Tag>
        },
      },
      {
        title: "手机号",
        dataIndex: "phone",
        key: "phone",
      },
      {
        title: "个人签名",
        dataIndex: "idiograph",
        key: "idiograph",
        width: 200,
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
        delUser({
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
  }
  // 获取分页数据
  // 获取分页数据
  getData = (page, size) => {
    getPage({
      page: page - 1,
      size,
    }).then((res) => {
      let data = res.data
      this.setState({
        total: data.count,
        tableList: data.rows,
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
  render() {
    const { tableList, columns } = this.state
    return (
      <Card title="用户管理">
        <div>
          <Input className="input-width margin-box" placeholder="用户名称" />
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
        {/* {menuList.length > 0 ? (
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
        ) : null} */}
        <Table
          rowKey={"id"}
          bordered
          scroll={{ x: 1200 }}
          columns={columns}
          dataSource={tableList}
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
        <AddRole ref={this.form} resetData={this.resetData} />
      </Card>
    )
  }
}
