/*
 * @Description: 
 * @Author: superman
 * @Date: 2022-03-14 13:58:09
 * @LastEditors: superman
 * @LastEditTime: 2022-04-10 23:46:41
 */

const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
    lintOnSave: false,
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/api': {
                target: "http://39.98.123.211",
                // URL 路径上原本就有 /api，所以不需要重写 URL 路径
                // pathRewrite: { 
                //     '^/api': ''
                // }
            }
        }
    }
});