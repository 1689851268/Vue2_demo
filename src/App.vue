<!--
 * @Description: 根组件
 * @Author: superman
 * @Date: 2022-03-14 13:58:09
 * @LastEditors: superman
 * @LastEditTime: 2022-03-31 14:59:38
-->

<template>
    <div id="app">
        <Header />
        <!-- <router-link :to="{ name: 'Home' }">Home</router-link> -->
        <!-- 添加路由占位符 -->
        <router-view></router-view>
        <!-- 通过 meta 元信息控制 Footer 的显示 -->
        <Footer v-show="$route.meta.show" />
    </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
    name: "App",
    components: {
        Header,
        Footer,
    },
    mounted() {
        // 获取商品的三级列表数据
        this.$store.dispatch("home/categoryList");
    },
};
</script>

<style>
</style>
