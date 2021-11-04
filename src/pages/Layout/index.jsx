import React, { Component } from "react"
import { Redirect } from "react-router-dom"
import { storage } from "../../utils/storage"
import './less/index.less'
export default class Layout extends Component {
  render() {
    const token = storage.getMemoryPmt("token") || ""
    if (!token) {
      return <Redirect to="/login" />
    }
    return <div>我是Layout</div>
  }
}
