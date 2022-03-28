/*
 * @Description: 封装游客身份模块 uuid，生成一个随机字符串（后续不能改变）
 * @Author: superman
 * @Date: 2022-03-28 15:16:27
 * @LastEditors: superman
 * @LastEditTime: 2022-03-28 15:24:45
 */

import { v4 as uuidV4 } from "uuid";

// 生成一个随机字符串，且每次执行不能发生变化，游客身份持久存储
export const getUUID = () => {
    // 先查看 [本地存储] 中是否存有游客 id
    let uuid_token = localStorage.getItem("UUIDTOKEN");

    // 没有，则生成一个，并存储到 [本地存储]
    if (!uuid_token) {
        uuid_token = uuidV4();
        localStorage.setItem("UUIDTOKEN", uuid_token);
    }

    return uuid_token;
}
