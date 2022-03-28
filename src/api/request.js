/*
 * @Description: 二次封装 axios
 * @Author: superman
 * @Date: 2022-03-16 19:58:02
 * @LastEditors: superman
 * @LastEditTime: 2022-03-28 15:31:39
 */

import axios from "axios";
import store from '@/store'

// 引入进度条样式
import "nprogress/nprogress.css";
// 引入进度条
import nprogress from "nprogress";
// start - 进度条开始、、done - 进度条结束


// 创建 axios 实例，并做一些基础配置
const requests = axios.create({
    baseURL: "/api",
    timeout: 5000
});


// 请求拦截器
requests.interceptors.request.use(config => {
    // 进度条开始
    nprogress.start();

    // 将游客用户的 id 存入请求头
    if (store.state.detail.uuid_token) {
        // 给请求头添加字段 userTempId
        config.headers.userTempId = store.state.detail.uuid_token;
    }

    return config; // 配置对象 config 的 headers 属性非常重要
}, error => {
    // 对请求错误做点什么
    throw Promise.reject(error);
});


// 响应拦截器 (响应成功回调函数, 响应失败回调函数)
requests.interceptors.response.use(res => {
    // 对响应数据做点什么

    // 进度条结束
    nprogress.done();

    return res.data;
}, error => {
    // 对响应错误做点什么
    throw Promise.reject(error);
});


export default requests;