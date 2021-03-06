/*
 * @Description: 统一管理 api 接口
 * @Author: superman
 * @Date: 2022-03-16 20:29:39
 * @LastEditors: superman
 * @LastEditTime: 2022-04-08 21:10:13
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


// 获取验证码  URL：/api/user/passport/sendCode/{phone}    GET
export const reqGetCode = phone => requests({
    url: `/user/passport/sendCode/${phone}`,
    method: "GET"
});


// 用户注册  URL：/api/user/passport/register    POST    phone、password、code
export const reqUserRegister = (data) => requests({
    url: `/user/passport/register`,
    method: "POST",
    data
});


// 用户登陆  URL：/api/user/passport/login    POST    phone、password
export const reqUserLogin = data => requests({
    url: "/user/passport/login",
    data,
    method: "POST"
});


// 获取用户信息  URL：/api/user/passport/auth/getUserInfo    GET
export const reqUserInfo = () => requests({
    url: "/user/passport/auth/getUserInfo",
    method: "GET"
});


// 退出登陆  URL：/api/user/passport/logout    GET
export const reqLogout = () => requests({
    url: "/user/passport/logout",
    method: "GET"
});


// 获取用户地址信息  URL: /api/user/userAddress/auth/findUserAddressList    GET
export const reqAddressInfo = () => requests({
    url: "/user/userAddress/auth/findUserAddressList",
    method: "GET"
});


// 获取商品清单  URL: /api/order/auth/trade    GET
export const reqOrderInfo = () => requests({
    url: "/order/auth/trade",
    method: "GET"
});


// 提交订单  URL: /api/order/auth/submitOrder?tradeNo={tradeNo}    POST
export const reqSubmitOrder = (tradeNo, data) => requests({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data,
    method: "POST"
});


// 支付信息  URL: /api/payment/weixin/createNative/{orderId}    GET
export const reqPayInfo = (orderId) => requests({
    url: `/payment/weixin/createNative/${orderId}`,
    method: "GET"
});


// 获取订单支付状态  URL: /api/payment/weixin/queryPayStatus/{orderId}    GET
export const reqPayStatus = (orderId) => requests({
    url: `/payment/weixin/queryPayStatus/${orderId}`,
    method: "GET"
});


// 获取 个人中心-我的订单 的数据  URL：/api/order/auth/{page}/{limit}    GET
export const reqMyOrderList = (page, limit) => requests({
    url: `/order/auth/${page}/${limit}`,
    method: "GET"
});