import React, { Component } from "react"
import { Modal } from "antd"
export default class AddRole extends Component {
  handleOk = () => {
    this.setState({
      isModalVisible: false,
    })
  }
  handleCancel = () => {
    this.props.hiddenModel()
  }
  render() {
    const { showModel } = this.props
    return (
      <Modal
        title="Basic Modal"
        visible={showModel}
        onOk={this.handleOk}
        onCancel={this.handleCancel}></Modal>
    )
  }
}
