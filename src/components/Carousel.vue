<!--
 * @Description: 轮播图（使用 swiper）
 * @Author: superman
 * @Date: 2022-03-19 19:32:35
 * @LastEditors: superman
 * @LastEditTime: 2022-03-26 10:44:03
-->

<template>
    <div class="swiper-container" ref="cur">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="carousel in list" :key="carousel.id">
                <img :src="carousel.imgUrl" />
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>

<script>
import Swiper from "swiper";

export default {
    name: "Carousel",
    props: ["list"],
    watch: {
        list: {
            handler() {
                this.$nextTick(() => {
                    // 创建 swiper 实例
                    new Swiper(this.$refs.cur, {
                        loop: true, // 循环模式选项（默认不循环）

                        // 如果需要分页器
                        pagination: {
                            el: ".swiper-pagination",
                            clickable: true // 分页器点击效果
                        },

                        // 如果需要前进后退按钮
                        navigation: {
                            nextEl: ".swiper-button-next",
                            prevEl: ".swiper-button-prev"
                        }
                    });
                });
            },
            immediate: true // 立即监听：不管数据有没有变化，watch 一上来就监听
        }
    }
};
</script>

<style>
</style>