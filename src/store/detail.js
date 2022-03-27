/*
 * @Description: 商品详情页的数据
 * @Author: superman
 * @Date: 2022-03-25 22:53:53
 * @LastEditors: superman
 * @LastEditTime: 2022-03-27 19:48:29
 */

import { reGoodsInfo, reqAddOrUpdateShopCart } from "@/api";

const state = {
    goodInfo: {}
};

const mutations = {
    GETGOODSINFO(state, goodInfo) {
        state.goodInfo = goodInfo;
    },
};

const actions = {
    async getGoodsInfo(context, skuId) {
        let res = await reGoodsInfo(skuId);
        if (res.code == 200) {
            context.commit("GETGOODSINFO", res.data);
        }
    },
    // 添加购物车 || 修改某产品个数
    async addOrUpdateShopCart(context, { skuId, skuNum }) {
        let res = await reqAddOrUpdateShopCart(skuId, skuNum);
        // 服务器写入数据成功，并没有返回其他数据，只是返回 code == 200，表示操作成功
        // 因为服务器没有返回其余数据，因此不需要存储数据到 state 中

        // async 修饰的函数，返回值一定是 Promise 实例
        // 如果操作成功，则 Promise 实例的值为 "ok"，否则为 "购物车添加失败"
        if (res.code == 200) {
            return "ok";
        }
        return Promise.reject("购物车添加失败");
    }
};

const getters = {
    // 简化路径面包屑的数据
    categoryView(state) {
        return state.goodInfo.categoryView || {};
        // 一开始 数据尚未返回时，goodInfo 是空对象，categoryView 为 undefined
        // 所以要设置 {} 默认值，否则会报错
        // 因为后面需要获取 categoryView[category${i}Name] 属性值，undefined[category${i}Name]，你说报不报错嘛
    },
    // 简化产品信息的数据
    skuInfo(state) {
        return state.goodInfo.skuInfo || {};
    },
    // 简化商品售卖属性的数据
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || [];
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}