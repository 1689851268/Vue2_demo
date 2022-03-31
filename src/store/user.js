/*
 * @Description: 登陆 & 注册
 * @Author: superman
 * @Date: 2022-03-30 18:45:40
 * @LastEditors: superman
 * @LastEditTime: 2022-03-31 14:37:59
 */

import {
    reqGetCode, reqUserLogin,
    reqUserRegister, reqUserInfo, reqLogout
} from "@/api/index";
import { setToken, getToken, removeToken } from "@/utils/token";

const state = {
    code: "",
    token: getToken(), // 直接使用本地存储的 token
    userInfo: {}
};

const mutations = {
    // 获取验证码
    GETCODE(state, code) {
        state.code = code;
    },
    // 用户登陆
    USERLOGIN(state, token) {
        state.token = token;
    },
    // 获取用户信息
    USERINFO(state, userInfo) {
        state.userInfo = userInfo;
    },
    // 退出登陆（清除用户数据）
    CLEAR(state) {
        state.token = "";
        state.userInfo = {};
        removeToken();
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
    },
    // 用户登陆（token）
    async userLogin(context, user) {
        let res = await reqUserLogin(user);
        if (res.code == 200) {
            context.commit("USERLOGIN", res.data.token);
            // 持久化存储 token
            setToken(res.data.token);
            return "ok";
        } else if (res.code == 202) {
            return res.message;
        }
        return Promise.reject("login error");
    },
    // 获取用户信息
    async userInfo(context) {
        let res = await reqUserInfo();
        if (res.code == 200) {
            context.commit("USERINFO", res.data);
            return "ok";
        }
        return Promise.reject("not log in");
    },
    // 退出登陆
    async userLogout(context) {
        let res = await reqLogout();
        if (res.code == 200) {
            context.commit("CLEAR");
            return "ok";
        }
        return Promise.reject("logout error");
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