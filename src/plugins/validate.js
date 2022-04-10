/*
 * @Description: 表单验证
 * @Author: superman
 * @Date: 2022-04-10 19:22:03
 * @LastEditors: superman
 * @LastEditTime: 2022-04-10 20:03:18
 */
import Vue from "vue";
import VeeValidate from "vee-validate";
Vue.use(VeeValidate);

// 表单验证
import zh_CN from "vee-validate/dist/locale/zh_CN"; // 引入中文的提示信息
VeeValidate.Validator.localize('zh_cn', {
    messages: {
        ...zh_CN.messages, // 应用中文提示
        is: field => `${field}必须与密码相同` // 设置自定义错误提示规则
    },
    /* 设置对应字段的中文表示 */
    attributes: {
        phone: "手机号", code: "验证码",
        password: "密码", checkPassword: "确认密码",
        isCheck: "协议"
    }
});

// 自定义校验规则
VeeValidate.Validator.extend("agreement", {
    validate: value => value,
    getMessage: field => field + "必须同意"
});