/*
 * @Description: trade store
 * @Author: superman
 * @Date: 2022-03-31 19:42:23
 * @LastEditors: superman
 * @LastEditTime: 2022-03-31 20:01:07
 */

import { reqAddressInfo, reqOrderInfo } from "@/api";

const state = {
    addressList: [],
    orderInfo: {}
};

const mutations = {
    // 获取用户地址信息
    GETADDRESSINFO(state, addressList) {
        state.addressList = addressList;
    },
    // 获取商品信息
    GETORDERINFO(state, orderInfo) {
        state.orderInfo = orderInfo;
    }
};

const actions = {
    // 获取用户地址信息
    async getAddressInfo(context) {
        let res = await reqAddressInfo()
        if (res.code == 200) {
            context.commit("GETADDRESSINFO", res.data);
        }
    },
    // 获取商品信息
    async getOrderInfo(context) {
        let res = await reqOrderInfo();
        if (res.code == 200) {
            context.commit("GETORDERINFO", res.data);
        }
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