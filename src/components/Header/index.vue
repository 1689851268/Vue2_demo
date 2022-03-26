<!--
 * @Description: 网页的头部
 * @Author: superman
 * @Date: 2022-03-26 10:12:24
 * @LastEditors: superman
 * @LastEditTime: 2022-03-26 10:44:55
-->

<template>
    <header class="header">
        <!-- 头部的第一行 -->
        <div class="top">
            <div class="container">
                <div class="loginList">
                    <p>尚品汇欢迎您！</p>
                    <!-- 用户登录了，显示用户信息与退出登录 ||用户没有登录，显示的是登录与注册-->
                    <!-- <p v-if="!userInfo.name"> -->
                    <p>
                        <span>请</span>
                        <!-- 声明式导航，要设置 to 属性 -->
                        <router-link :to="{ name: 'Login' }">登录</router-link>
                        <router-link class="register" :to="{ name: 'Register' }">免费注册</router-link>
                    </p>
                    <!-- <p v-else>
                        <a>{{ userInfo.name }}</a>
                        <a class="register" @click="logout">退出登录</a>
                    </p>-->
                </div>
                <div class="typeList">
                    <!-- <router-link to="/center/myorder">我的订单</router-link>
                    <router-link to="/shopcart">我的购物车</router-link>-->
                    <a href="###">我的尚品汇</a>
                    <a href="###">尚品汇会员</a>
                    <a href="###">企业采购</a>
                    <a href="###">关注尚品汇</a>
                    <a href="###">合作招商</a>
                    <a href="###">商家后台</a>
                </div>
            </div>
        </div>

        <!--头部第二行 搜索区域-->
        <div class="bottom">
            <h1 class="logoArea">
                <router-link class="logo" title="尚品汇" :to="{ name: 'Home' }">
                    <img src="./images/logo.png" alt />
                </router-link>
            </h1>
            <div class="searchArea">
                <!-- 搜索框 -->
                <form action="###" class="searchForm">
                    <input
                        type="text"
                        id="autocomplete"
                        class="input-error input-xxlarge"
                        v-model="keyword"
                    />
                    <!-- 编程式导航 -->
                    <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">搜索</button>
                </form>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name: "Header",
    data() {
        return {
            keyword: "" // 获取搜索内容
        };
    },
    methods: {
        // 搜索按钮的回调函数，点击的时候，home 跳转到 search
        goSearch() {
            // 对象写法：跳转、传 params、query 参数
            let location = {
                name: "Search",
                params: { keyword: this.keyword || null }
            };

            // 点击搜索，只带 params 参数
            // 但是，组件可能原本就带有 query 参数；所以，需要判断是否带有 query 参数，如果有则带上
            if (this.$route.query) {
                location.query = this.$route.query;
            }

            this.$router.push(location);
        },

        //退出登录
        logout() {
            //退出登录的请求
            this.$store.dispatch("userLogout");
        }
    },
    mounted() {
        // 通过全局事件总线请求关键字
        this.$bus.$on("clear", () => {
            this.keyword = "";
        });
    }
};
</script>

<style scoped lang="less">
.header {
    & > .top {
        background-color: #eaeaea;
        height: 30px;
        line-height: 30px;

        .container {
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;

            .loginList {
                float: left;

                p {
                    float: left;
                    margin-right: 10px;

                    .register {
                        border-left: 1px solid #b3aeae;
                        padding: 0 5px;
                        margin-left: 5px;
                    }
                }
            }

            .typeList {
                float: right;

                a {
                    padding: 0 10px;

                    & + a {
                        border-left: 1px solid #b3aeae;
                    }
                }
            }
        }
    }

    & > .bottom {
        width: 1200px;
        margin: 0 auto;
        overflow: hidden;

        .logoArea {
            float: left;

            .logo {
                img {
                    width: 175px;
                    margin: 25px 45px;
                }
            }
        }

        .searchArea {
            float: right;
            margin-top: 35px;

            .searchForm {
                overflow: hidden;

                input {
                    box-sizing: border-box;
                    width: 490px;
                    height: 32px;
                    padding: 0px 4px;
                    border: 2px solid #ea4a36;
                    float: left;

                    &:focus {
                        outline: none;
                    }
                }

                button {
                    height: 32px;
                    width: 68px;
                    background-color: #ea4a36;
                    border: none;
                    color: #fff;
                    float: left;
                    cursor: pointer;

                    &:focus {
                        outline: none;
                    }
                }
            }
        }
    }
}
</style>
