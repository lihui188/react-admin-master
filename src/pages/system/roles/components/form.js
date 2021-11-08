import React, { Component } from "react"
import { Modal, Form, Input, message } from "antd"

import { add, getRole } from "@/api/request/role"

export default class AddRole extends Component {
  formRef = React.createRef()
  handleOk = () => {
    let demo = this.formRef //通过refs属性可以获得对话框内form对象
    demo.current.validateFields().then((values) => {
      add(values).then((res) => {
        message.success("添加成功")
        demo.current.resetFields()
        this.setState({
          isShowModel: false,
        })
      })
    })
  }
  state = {
    isShowModel: false,
    isAdd: true,
    layout: {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    },
  }
  setShowModel = (isAdd) => {
    this.setState({
      isShowModel: true,
      isAdd,
    })
  }
  handleCancel = () => {
    this.setState({
      isShowModel: false,
    })
  }
  getDetail = (id) => {
    getRole(id).then(res=>{
      console.log(res)
    })
  }
  render() {
    const { layout, isShowModel, isAdd } = this.state
    return (
      <Modal
        width={400}
        title={isAdd ? "新增角色" : "编辑角色"}
        visible={isShowModel}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        cancelText="取消"
        maskClosable={false}
        okText="确认">
        <Form
          {...layout}
          name="nest-messages"
          ref={this.formRef}
          onFinish={this.onFinish}>
          <Form.Item
            name="roleName"
            label="角色名称"
            rules={[{ required: true, message: "角色名称不能为空" }]}>
            <Input placeholder="请输入角色名称" />
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}
