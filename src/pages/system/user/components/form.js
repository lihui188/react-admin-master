import React, { Component } from "react"
import { Modal, Form, Input, message, Select } from "antd"
import { add, getUser, edit } from "@/api/request/user"
import { list } from "@/api/request/role"
import { encrypt } from "@/utils/js-crypto"

const { Option } = Select
export default class AddRole extends Component {
  formRef = React.createRef()
  handleOk = () => {
    let demo = this.formRef //通过refs属性可以获得对话框内form对象
    demo.current.validateFields().then((values) => {
      if (this.state.isAdd) {
        add({ ...values, password: encrypt(values.password) }).then((res) => {
          message.success("添加成功")
          this.setState({
            isShowModel: false,
          })
          this.props.resetData()
        })
      } else {
        let detail = this.state.formDetail
        let params = null
        values.password
          ? (params = {
              id: detail.id,
              ...values,
              password: encrypt(values.password),
            })
          : (params = {
              id: detail.id,
              roleId: values.roleId,
              username: values.username,
            })
        edit(params).then((res) => {
          message.success("修改成功")
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
    roleList: [],
  }
  componentDidMount = () => {
    this.getRoleList()
  }
  // 获取角色列表
  getRoleList = () => {
    list().then((res) => {
      this.setState({
        roleList: res.data,
      })
    })
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
        username: data.username,
        roleId: data.roleId,
      })
    })
  }
  afterClosed = () => {
    this.formRef.current.resetFields()
  }
  handleChange = (value) => {
    console.log(`selected ${value}`)
  }
  render() {
    const { layout, isShowModel, isAdd, roleList } = this.state
    return (
      <Modal
        afterClose={this.afterClosed}
        width={500}
        title={isAdd ? "新增用户" : "编辑用户"}
        visible={isShowModel}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        cancelText="取消"
        maskClosable={false}
        okText="确认">
        <Form {...layout} name="nest-messages" ref={this.formRef}>
          <Form.Item
            name="username"
            label="用户名"
            rules={[{ required: true, message: "用户名不能为空" }]}>
            <Input placeholder="请输入菜单名称" />
          </Form.Item>
          {/* <Form.Item
            name="phone"
            label="手机号"
            rules={[
              {
                pattern:
                  /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
                message: "请输入正确的手机号码",
              },
              {
                max: 11,
                message: "最大11位字符！",
              },
            ]}
            validateTrigger="onChange">
            <Input placeholder="请输入手机号" maxLength="11" />
          </Form.Item> */}
          <Form.Item
            name="password"
            label="密码"
            rules={[
              {
                min: 6,
                message: "最少6位字符！",
              },
              {
                max: 16,
                message: "最大16位字符！",
              },
              { required: isAdd ? true : false, message: "请输入6-16位密码" },
            ]}>
            <Input.Password maxLength="16" placeholder="请输入6-16位密码" />
          </Form.Item>
          <Form.Item
            name="roleId"
            label="角色"
            rules={[{ required: true, message: "请选择角色" }]}>
            <Select
              // style={{ width: 120 }}
              placeholder="请选择角色"
              onChange={this.handleChange}
              // 解决下拉框偏移
              getPopupContainer={(triggerNode) => {
                triggerNode.parentNode.parentNode.style.overflow = "visible"
                return triggerNode.parentNode || document.body
              }}>
              {roleList.map((v) => (
                <Option key={v.id} value={v.id}>
                  {v.roleName}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}
