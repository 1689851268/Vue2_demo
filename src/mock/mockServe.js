/*
 * @Description: 模拟数据
 * @Author: superman
 * @Date: 2022-03-19 11:36:48
 * @LastEditors: superman
 * @LastEditTime: 2022-03-19 11:41:56
 */

// 引入 mockjs
import Mock from 'mockjs';

// 引入 JSON 数据 （ JSON 文件默认对外暴露 ）
// webpack 默认对外暴露的数据：图片、JSON 文件，不需要 export
import banner from './banner.json';
import floor from './floor.json';


// mock 数据：Mock.mock(请求地址, 请求数据)
// 模拟首页轮播图数据
Mock.mock('/mock/banner', {
    code: 200,
    data: banner
});
// 模拟 floor 数据
Mock.mock('/mock/floor', {
    code: 200,
    data: floor
});