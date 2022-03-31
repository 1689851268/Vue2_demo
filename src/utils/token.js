/*
 * @Description: 操作 localStorage 的 token
 * @Author: superman
 * @Date: 2022-03-31 14:06:18
 * @LastEditors: superman
 * @LastEditTime: 2022-03-31 14:34:49
 */

// 存储 token
export const setToken = (token) => {
    localStorage.setItem("TOKEN", token);
}


// 获取 token
export const getToken = () => {
    return localStorage.getItem("TOKEN");
}


// 删除 token
export const removeToken = () => {
    localStorage.removeItem("TOKEN");
}