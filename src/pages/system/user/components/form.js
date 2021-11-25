import React, { Component } from "react"
import { Modal, Form, Input, message, Select } from "antd"
import { add, getUser, edit } from "@/api/request/user"

const { Option } = Select
export default class AddRole extends Component {
  formRef = React.createRef()
  handleOk = () => {
    let demo = this.formRef //通过refs属性可以获得对话框内form对象
    demo.current.validateFields().then((values) => {
      if (this.state.isAdd) {
        add(values).then((res) => {
          message.success("添加成功")
          demo.current.resetFields()
          this.setState({
            isShowModel: false,
          })
          this.props.resetData()
        })
      } else {
        let detail = this.state.formDetail
        let params = {
          id: detail.id,
          ...values,
        }
        edit(params).then((res) => {
          message.success("修改成功")
          demo.current.resetFields()
          this.setState({
            isShowModel: false,
            formDetail: {},
          })
          this.props.resetData()
        })
      }
    })
  }
  state = {
    isShowModel: false,
    isAdd: true,
    formDetail: {},
    layout: {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    },
  }
  onChange = (e) => {
    console.log("radio checked", e.target.value)
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
    getUser(id).then((res) => {
      let data = res.data
      this.setState({
        formDetail: data,
        selectedIcon: data.icon || "",
      })
      this.formRef.current.setFieldsValue({
        menuName: data.menuName,
        path: data.path,
        icon: data.icon,
        isShow: data.isShow,
        parentId: data.parentId,
        description: data.description,
      })
    })
  }
  afterClosed = () => {
    this.setState({
      selecteditem: "ExclamationOutlined",
      selectedIcon: "",
    })
    this.formRef.current.resetFields()
  }
  handleChange = (value) => {
    console.log(`selected ${value}`)
  }
  render() {
    const { layout, isShowModel, isAdd } = this.state
    return (
      <Modal
        afterClose={this.afterClosed}
        width={600}
        title={isAdd ? "新增菜单" : "编辑菜单"}
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
            name="username"
            label="用户名"
            rules={[{ required: true, message: "用户名不能为空" }]}>
            <Input placeholder="请输入菜单名称" />
          </Form.Item>
          <Form.Item name="phone" label="手机号">
            <Input placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item
            name="sort"
            label="排序"
            initialValue={0}
            rules={[
              {
                min: 6,
                message: "最少6位字符！",
              },
              {
                max: 16,
                message: "最大16位字符！",
              },
              { required: true, message: "请输入6-16位密码" },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="isShow"
            label="是否显示"
            initialValue={true}
            rules={[{ required: true, message: "路径不能为空" }]}
            valuePropName="checked">
            <Select
              defaultValue="lucy"
              style={{ width: 120 }}
              onChange={this.handleChange}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="disabled" disabled>
                Disabled
              </Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}
