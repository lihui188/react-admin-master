const { override, fixBabelImports, addLessLoader,addWebpackAlias } = require("customize-cra")
const path = require("path")
module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true,
  }),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      //   modifyVars: { "@primary-color": "#1DA57A" }, //改变主题颜色
      modifyVars: { "@primary-color": "#1890ff" }, //改变主题颜色
    },
  }),
  addWebpackAlias({
    "@": path.resolve(__dirname, "src"),
    "@@": path.resolve(__dirname, "src/components"),
  })
)
