import React, { Component } from "react"
import "./css/index.less"
import { Form, Input, Button, message } from "antd"
import { UserOutlined, LockOutlined } from "@ant-design/icons"
import { encrypt } from "../../utils/js-crypto"
import { login } from "../../api/get_data/login"
import { storage } from "../../utils/storage"
import { Redirect } from "react-router-dom"

// const
/* .catch(err=>{
    console.log(err.response)
  }) 
}*/

/* const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo)
} */
export default class Login extends Component {
  onFinish = (values) => {
    login({
      username: values.username,
      password: encrypt(values.password),
    }).then((res) => {
      message.success("登录成功")
      storage.setMemoryPmt("token", res.token)
      storage.setMemoryPmt("userInfo", res.userInfo)
      this.props.history.push("/")
    })
  }
  render() {
    const token = storage.getMemoryPmt("token") || ""
    if (token) {
      return <Redirect to="/" />
    }
    return (
      <div className="login_container">
        <div className="wrapper">
          <div className="header">后台管理</div>
          <div className="form">
            <Form
              name="basic"
              labelCol={{
                span: 0,
              }}
              wrapperCol={{
                span: 24,
              }}
              /* initialValues={{
                remember: true,
              }} */
              onFinish={this.onFinish}
              autoComplete="off">
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "请输入用户名！",
                  },
                ]}>
                <Input
                  placeholder="用户名"
                  maxLength="12"
                  prefix={<UserOutlined />}
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "请输入密码！",
                  },
                  {
                    min: 6,
                    message: "最少6位字符！",
                  },
                  {
                    max: 16,
                    message: "最大16位字符！",
                  },
                ]}>
                <Input.Password
                  maxLength="16"
                  placeholder="密码"
                  prefix={<LockOutlined />}
                />
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  span: 24,
                }}>
                <Button type="primary" htmlType="submit" block>
                  登录
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    )
  }
}
