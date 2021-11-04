/*
* @Description: 请求分离
* @Author: lihui
* @Date: 2021-11-04
* @LastEditTime: 2021-11-04
* @LastEditors: Please set LastEditors
*/
import http from '../http';

/**
 * 获取首页列表
 */
function login(data){
  return new Promise((resolve, reject) => {
    http("post",'/api/user/login',data).then(res => {
      resolve (res);
    },error => {
      reject(error)
    })
  }) 
}

export {
  login
}

