import React, { Component } from "react"
import { Card, Button, Input, Table, Tag, Space } from "antd"
import AddRole from "./components/addRoles"

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: (tags) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green"
          if (tag === "loser") {
            color = "volcano"
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          )
        })}
      </>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
]
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
]
export default class Roles extends Component {
  state = {
    showModel: false,
    pagination: {
      current: 1,
      pageSize: 10,
    },
  }
  showModel = () => {
    this.setState({
      showModel: true,
    })
  }
  hiddenModel = () => {
    this.setState({
      showModel: false,
    })
  }
  onChange = (pageNumber) => {
    console.log("Page: ", pageNumber)
  }
  render() {
    const { showModel,pagination} = this.state
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
        <Table columns={columns} dataSource={data} pagination={pagination} />
        {/* <Pagination
          showQuickJumper
          defaultCurrent={2}
          total={data.length}
          onChange={this.onChange}
        /> */}
        <AddRole showModel={showModel} hiddenModel={this.hiddenModel}  />
      </Card>
    )
  }
}
