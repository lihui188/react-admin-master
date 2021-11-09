import { createBrowserHistory } from 'history'


const env = process.env.NODE_ENV  // 环境参数
console.log()
let options = {env}
if (env === 'production') {
    options.basename = '/'
}


export default createBrowserHistory(options)