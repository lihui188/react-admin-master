import React, { PureComponent } from "react"
import { Modal, Tabs, Tooltip } from "antd"
import classnames from "classnames"
import * as Icon from "@ant-design/icons"
import "./less/index.less"
import icons from "./js/icon"
const { TabPane } = Tabs

export default class IconModal extends PureComponent {
  state = {}
  createdIcon = (item) => React.createElement(Icon[item])
  render() {
    // form
    const { visible, handleOk, handleCancel, selectIcon, selecteditem } =
      this.props
    return (
      <Modal
        title="图标选择"
        visible={visible}
        width="800px"
        onOk={handleOk}
        okText="确认"
        cancelText="取消"
        onCancel={handleCancel}>
        <Tabs defaultActiveKey="0">
          {Object.keys(icons).map((v, i) => {
            return (
              <TabPane
                tab={
                  i === 0
                    ? "方向性图标"
                    : i === 1
                    ? "指示性图标"
                    : i === 2
                    ? "编辑类图标"
                    : i === 3
                    ? "数据类图标"
                    : i === 4
                    ? "网站通用图标"
                    : i === 5
                    ? "品牌和标识"
                    : ""
                }
                key={i}>
                {icons[v].map((item) => {
                  return (
                    <Tooltip title={item} text key={item}>
                      <div
                        onClick={() => {
                          selectIcon(item)
                        }}
                        className={classnames({
                          icon: true,
                          selectedicon: item === selecteditem,
                        })}>
                        {this.createdIcon(item)}
                      </div>
                    </Tooltip>
                  )
                })}
              </TabPane>
            )
          })}
          {/* <TabPane tab="指示性图标" key="2">
            {suggestionIcons.map((item) => {
              return (
                <Tooltip title={item} text key={item}>
                  <Icon
                    type={item}
                    className={classnames({
                      icon: true,
                      [styles.selectedicon]: item === selecteditem,
                    })}
                    onClick={() => {
                      selectIcon(item)
                    }}
                  />
                </Tooltip>
              )
            })}
          </TabPane> */}
        </Tabs>
      </Modal>
    )
  }
}
