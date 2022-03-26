<!--
 * @Description: 轮播图
 * @Author: superman
 * @Date: 2022-03-26 10:12:24
 * @LastEditors: superman
 * @LastEditTime: 2022-03-26 18:54:55
-->
<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(slide, index) in skuImageList" :key="slide.id">
                <!-- class="active" 表示选中，高亮显示 -->
                <img
                    :src="slide.imgUrl"
                    :class="{active: currentIndex == index}"
                    @click="changeCurrentIndex(index)"
                />
            </div>
        </div>

        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
    </div>
</template>

<script>
import Swiper from "swiper";
export default {
    name: "ImageList",
    data() {
        return {
            currentIndex: 0
        };
    },
    props: ["skuImageList"],
    watch: {
        skuImageList(newVal, oldVal) {
            this.$nextTick(() => {
                new Swiper(".swiper-container", {
                    // 如果需要 [前进]、[后退] 按钮
                    navigation: {
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev"
                    },

                    slidesPerView: 3, // 显示几张图片
                    slidesPerGroup: 1 // 翻一页换几张图
                });
            });
        }
    },
    methods: {
        changeCurrentIndex(index) {
            // 修改当前索引
            this.currentIndex = index;
            // 通过 [全局事件总线] 传递当前图片序号，修改大图
            this.$bus.$emit("getIndex", this.currentIndex);
        }
    }
};
</script>

<style lang="less" scoped>
.swiper-container {
    height: 56px;
    width: 412px;
    box-sizing: border-box;
    padding: 0 12px;

    .swiper-slide {
        width: 56px;
        height: 56px;

        img {
            width: 100%;
            height: 100%;
            border: 1px solid #ccc;
            padding: 2px;
            width: 50px;
            height: 50px;
            display: block;

            &.active {
                border: 2px solid #f60;
                padding: 1px;
            }
        }
    }

    .swiper-button-next {
        left: auto;
        right: 0;
    }

    .swiper-button-prev {
        left: 0;
        right: auto;
    }

    .swiper-button-next,
    .swiper-button-prev {
        box-sizing: border-box;
        width: 12px;
        height: 56px;
        background: rgb(235, 235, 235);
        border: 1px solid rgb(204, 204, 204);
        top: 0;
        margin-top: 0;
        &::after {
            font-size: 12px;
        }
    }
}
</style>