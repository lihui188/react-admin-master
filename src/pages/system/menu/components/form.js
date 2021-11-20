import React, { Component } from "react"
import {
  Modal,
  Form,
  Input,
  message,
  Switch,
  TreeSelect,
  InputNumber,
} from "antd"
import SelectIcon from "@/components/SelectIcon"
import * as Icon from "@ant-design/icons"
import { SettingOutlined, ExclamationOutlined } from "@ant-design/icons"
import { add, getRole, edit } from "@/api/request/role"
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
        if (detail.roleName !== values.roleName) {
          let params = {
            id: detail.id,
            roleName: values.roleName,
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
        } else {
          message.warning("角色名称未修改")
        }
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
    visible: false,
    selecteditem: "",
    selectedIcon: "",
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
    getRole(id).then((res) => {
      let data = res.data
      console.log(data)
      this.setState({
        formDetail: data,
      })
      this.formRef.current.setFieldsValue({
        roleName: data.roleName,
      })
    })
  }
  // 图标选择
  selectIconOk = () => {
    this.setState({
      visible: false,
      selectedIcon: this.state.selecteditem,
    })
    this.formRef.current.setFieldsValue({
      icon: this.state.selecteditem,
    })
  }
  selectIconCancel = () => {
    this.setState({
      visible: false,
    })
  }
  selectIcon = (item) => {
    this.setState({
      selecteditem: item,
    })
  }
  showSelectIcon = () => {
    this.setState({
      visible: true,
    })
  }
  changeNumber = (value) => {}
  iconElement = () => {
    if (this.state.selectedIcon) {
      return React.createElement(Icon[this.state.selectedIcon])
    } else {
      return <ExclamationOutlined />
    }
  }

  render() {
    const { layout, isShowModel, isAdd, visible, selecteditem } = this.state
    return (
      <Modal
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
            name="roleName"
            label="菜单名称"
            rules={[{ required: true, message: "菜单名称不能为空" }]}>
            <Input placeholder="请输入菜单名称" />
          </Form.Item>
          <Form.Item
            name="path"
            label="路径"
            rules={[{ required: true, message: "路径不能为空" }]}>
            <Input placeholder="例如：/xxx/xxx" />
          </Form.Item>
          <Form.Item
            name="sort"
            label="排序"
            initialValue="0"
            rules={[
              { type: "number", min: 0, max: 999 },
              { required: true, message: "请输入0-999" },
            ]}>
            <InputNumber value="0" onChange={this.changeNumber} />
          </Form.Item>
          <Form.Item
            name="isShow"
            label="是否显示"
            rules={[{ required: true, message: "路径不能为空" }]}
            valuePropName="checked">
            <Switch checkedChildren="是" unCheckedChildren="否" />
          </Form.Item>
          <Form.Item name="parentId" label="父级菜单">
            <TreeSelect
              placeholder="请选择"
              dropdownStyle={{ maxHeight: 500, overflow: "auto" }}
              treeData={[
                {
                  title: "Light",
                  value: "light",
                  children: [
                    {
                      title: "Bamboo",
                      value: "bamboo",
                    },
                  ],
                },
              ]}
            />
          </Form.Item>
          <Form.Item name="icon" label="图标选择">
            {/* <Input placeholder="请选择图标" />
            <Button type="primary" icon={<SettingOutlined />} ></Button> */}
            {/* {this.state.selectIcon && this.iconElement()} */}
            <Input
              prefix={this.iconElement()}
              addonAfter={<SettingOutlined onClick={this.showSelectIcon} />}
              placeholder="请选择图标"
            />
          </Form.Item>
        </Form>
        <SelectIcon
          visible={visible}
          handleOk={this.selectIconOk}
          handleCancel={this.selectIconCancel}
          selecteditem={selecteditem}
          selectIcon={this.selectIcon}
        />
      </Modal>
    )
  }
}
