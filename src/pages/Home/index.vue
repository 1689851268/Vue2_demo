<!--
 * @Description: 主页面
 * @Author: superman
 * @Date: 2022-03-14 19:32:12
 * @LastEditors: superman
 * @LastEditTime: 2022-03-26 10:46:37
-->
<template>
    <div>
        <!-- 使用全局组件：三级联动；因为已经是全局组件了，所以不需要引入，可以直接使用 -->
        <TypeNav />
        <!-- 使用局部组件，轮播图；局部组件，需要引入并注册 -->
        <ListContainer />
        <!-- 今日推荐 -->
        <TodayRecommend />
        <!-- 排行 -->
        <Rank />
        <!-- 猜你喜欢 -->
        <Like />
        <!-- 排俩榜单 -->
        <!-- v-for 也可以在自定义组件上使用 -->
        <Floor v-for="floor in floorList" :key="floor.id" :list="floor" />
        <!-- 商标 -->
        <Brand />
    </div>
</template>

<script>
import ListContainer from "@/pages/Home/ListContainer";
import TodayRecommend from "@/pages/Home/TodayRecommend";
import Rank from "@/pages/Home/Rank";
import Like from "@/pages/Home/Like";
import Floor from "@/pages/Home/Floor";
import Brand from "@/pages/Home/Brand";

import { mapState } from "vuex";

export default {
    name: "Home",
    components: {
        ListContainer,
        TodayRecommend,
        Rank,
        Like,
        Floor,
        Brand,
    },
    mounted() {
        // 获取 floor 组件的数据
        this.$store.dispatch("home/getFloorList");
    },
    computed: {
        ...mapState({
            floorList: (state) => state.home.floorList,
        }),
    },
};
</script>