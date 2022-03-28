/*
 * @Description: 统一管理 api 接口
 * @Author: superman
 * @Date: 2022-03-16 20:29:39
 * @LastEditors: superman
 * @LastEditTime: 2022-03-28 19:55:22
 */

import requests from "./request";


// 三级联动的接口 - /api/product/getBaseCategoryList
// get 无参数
export const reqCategoryList = () => requests.get("/product/getBaseCategoryList");


import mockRequest from "./mockAjax";
// 获取 banner  （ Home 页面的轮播图接口 ）
export const reqGetBannerList = () => mockRequest.get('/banner');
// 获取 floor
export const reqFloorList = () => mockRequest.get('/floor');


// Search 模块数据（地址 /api/list    POST
// 需要参数，至少是个空对象 {}
export const reqGetSearchInfo = (params = {}) => requests({
    url: "/list",
    method: "POST",
    data: params
});


// 商品详情信息的接口  URL: /api/item/{skuId}    GET
export const reGoodsInfo = (skuId => requests({
    url: `/item/${skuId}`,
    method: "GET"
}));


// 加入购物车  URL: /api/cart/addToCart/{skuId}/{skuNum}   POST
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: "POST"
});


// 购物车  URL: /api/cart/cartList   POST
export const reqCartList = () => requests({
    url: `/cart/cartList`,
    method: "GET"
});


// 删除购物车产品 URL: /api/cart/deleteCart/{skuId}    DELETE
export const reqDeleteCartById = skuId => requests({
    url: `/cart/deleteCart/${skuId}`,
    method: "DELETE"
});


// 修改商品的选中状态 URL: /api/cart/checkCart/{skuId}/{isChecked}    GET
export const reqUpdateCheckById = (skuId, isChecked) => requests({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: "GET"
});