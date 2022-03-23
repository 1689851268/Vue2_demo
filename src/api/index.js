/*
 * @Description: 统一管理 api 接口
 * @Author: superman
 * @Date: 2022-03-16 20:29:39
 * @LastEditors: superman
 * @LastEditTime: 2022-03-20 01:13:34
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
})