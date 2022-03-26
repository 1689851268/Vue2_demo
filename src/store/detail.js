/*
 * @Description: 商品详情页的数据
 * @Author: superman
 * @Date: 2022-03-25 22:53:53
 * @LastEditors: superman
 * @LastEditTime: 2022-03-26 18:03:07
 */

import { reGoodsInfo } from "@/api";

const state = {
    goodInfo: {}
};

const mutations = {
    GETGOODSINFO(state, goodInfo) {
        state.goodInfo = goodInfo;
    }
};

const actions = {
    async getGoodsInfo(context, skuId) {
        let res = await reGoodsInfo(skuId);
        if (res.code == 200) {
            context.commit("GETGOODSINFO", res.data);
        }
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
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}