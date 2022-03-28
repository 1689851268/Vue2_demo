/*
 * @Description: shopCart 购物车
 * @Author: superman
 * @Date: 2022-03-28 14:52:42
 * @LastEditors: superman
 * @LastEditTime: 2022-03-28 20:03:55
 */

import { reqCartList, reqDeleteCartById, reqUpdateCheckById } from "@/api";

const state = {
    cartList: []
};

const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList;
    }
};

const actions = {
    // 获取购物车列表数据
    async getCartList(context) {
        let res = await reqCartList();
        if (res.code == 200) {
            context.commit("GETCARTLIST", res.data);
        }
    },
    // 删除购物车某商品
    async deleteCartListBySkuId(context, skuId) {
        let res = await reqDeleteCartById(skuId);
        if (res.code == 200) {
            return "ok";
        }
        return Promise.reject("delete error");
    },
    // 修改购物车商品的选中状态
    async updateCheckedById(context, { skuId, isChecked }) {
        let res = await reqUpdateCheckById(skuId, isChecked);
        if (res.code == 200) {
            return "ok";
        }
        return Promise.reject("checked error");
    }
};

const getters = {
    cartList(state) {
        return state.cartList[0] || {};
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}