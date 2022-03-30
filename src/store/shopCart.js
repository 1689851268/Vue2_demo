/*
 * @Description: shopCart 购物车
 * @Author: superman
 * @Date: 2022-03-28 14:52:42
 * @LastEditors: superman
 * @LastEditTime: 2022-03-30 15:13:53
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
    },
    // 删除所有勾选的产品
    deleteAllCheckedCart(context) {
        /* context 是小仓库，包含 commit (提交 mutations 修改 state)、
        getters (计算属性)、dispatch (派发 action)、state (当前仓库) */

        // 获取购物车中全部产品
        let cartInfoList = context.getters.cartList.cartInfoList;
        let promiseArr = [];

        // 遍历购物车中的商品
        cartInfoList.forEach(ele => {
            // 如果是选中的
            if (ele.isChecked) {
                // 在 shopCart store 里面不需要使用命名空间限制
                // shopCart/deleteCartListBySkuId ×     deleteCartListBySkuId √
                let res = context.dispatch("deleteCartListBySkuId", ele.skuId)
                promiseArr.push(res);
            }
        });

        // 等所有的 Promise 操作都完成后
        return Promise.all(promiseArr);
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