/*
 * @Description: 登陆 & 注册
 * @Author: superman
 * @Date: 2022-03-30 18:45:40
 * @LastEditors: superman
 * @LastEditTime: 2022-03-30 19:46:24
 */

import { reqGetCode, reqUserRegister } from "@/api/index";

const state = { code: "" };

const mutations = {
    GETCODE(state, code) {
        state.code = code;
    }
};

const actions = {
    // 获取验证码
    async getCode(context, phone) {
        // 获取验证码（真实开发中，验证码是直接发送到用户手机的）
        // 这里方便起见，就直接填写到 code 输入框中了
        let res = await reqGetCode(phone);
        if (res.code == 200) {
            context.commit("GETCODE", res.data);
            return "ok";
        }
        return Promise.reject("code error");
    },
    // 用户注册
    async userRegister(context, user) {
        let res = await reqUserRegister(user);
        console.log("res", res);
        // 没有需要返回的数据，即没有 res.data 存储到 state 中
        // 所以，我们只需返回指定的状态即可
        if (res.code == 200) { // 成功注册
            return "ok";
        } else if (res.code == 223) { // 账号已被注册
            return Promise.reject(res.message);
        }
        return Promise.reject("register error");
    }
};

const getters = {};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}