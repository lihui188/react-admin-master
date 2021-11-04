## 使用react脚手架创建项目
+ create-react-app 文件夹名称
+ cd 文件夹名称
+ 运行项目 yarn start
### 可能会出现报错 Uncaught TypeError: Cannot read properties of undefined (reading 'forEach')
+ 解决办法：将node_modules\@pmmmwh\react-refresh-webpack-plugin\client\ReactRefreshEntry.js中的RefreshRuntime.injectIntoGlobalHook(safeThis);注释掉
+ 在后面每次装一个新的包都会出现这个问题，不知道为什么出现，网上说是版本问题再 注释掉上面的一行代码
### 在public中创建css共用样式，将body,#root设为宽高100%
## yarn add react-app-rewired customize-cra babel-plugin-import 用于按需导入
+ 将App.css改为less
