import React, { Component } from "react"
import { Modal, Form, Input, message } from "antd"

import { add } from "@/api/request/role"

export default class AddRole extends Component {
  formRef = React.createRef()
  handleOk = () => {
    let demo = this.formRef //通过refs属性可以获得对话框内form对象
    demo.current.validateFields().then((values) => {
      add(values).then((res) => {
        message.success('添加成功')
        demo.current.resetFields()
        this.props.hiddenModel()
      })
    })
  }
  state = {
    layout: {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    },
  }
  handleCancel = () => {
    this.props.hiddenModel()
  }
  render() {
    const { showModel } = this.props
    const { layout } = this.state
    return (
      <Modal
        width={400}
        title="新增角色"
        visible={showModel}
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
